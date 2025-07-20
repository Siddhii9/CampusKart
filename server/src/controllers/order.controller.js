import OrderModel from "../models/OrderModel.js";
import CartItemModel from "../models/CartItemModel.js";
import Product from "../models/Product.js";
import sendEmail from "../../config/sendEmail.js";
import UserModel from "../models/user.model.js";
import { v4 as uuidv4 } from "uuid";

export const markAsPaid = async (req, res) => {
  const userId = req.userId;
  const { cartItemId } = req.params;

  try {
    const cartItem = await CartItemModel.findOne({
      _id: cartItemId,
      userId,
    }).populate({
      path: "productId",
      populate: {
        path: "seller",
        select: "email name upi_id mobile",
      },
    });

    console.log("cartItem:", cartItem);
    console.log("productId:", cartItem?.productId);

    if (!cartItem || !cartItem.productId || !cartItem.productId._id)
      return res.status(404).json({
        message: "cart item not found",
        success: false,
        error: true,
      });
    const orderId = uuidv4();
    const newOrder = await OrderModel.create({
      userId,
      orderId,
      products: [
        {
          productId: cartItem.productId._id,
          product_details: {
            name: cartItem.productId.name,
            image: [cartItem.productId.image],
          },
          quantity: cartItem.quantity,
          price: cartItem.price,
          sellerId: cartItem.productId.seller._id,
        },
      ],
      subTotalAmt: cartItem.productId.price * cartItem.quantity,
      totalAmt: cartItem.productId.price * cartItem.quantity,
    });

    console.log("Seller email:", cartItem?.productId?.seller?.email);
    console.log("Order ID (uuid):", newOrder.orderId);
    console.log("Mongo _id:", newOrder._id);

    await sendEmail({
      sendTo: cartItem.productId.seller.email,
      subject: "Payment Received - Awaiting Your Confirmation",
      html: `
        <h3>Hello ${cartItem.productId.seller.name},</h3>
        <p>A buyer has marked a payment for the product: <strong>${cartItem.productId.name}</strong></p>
        <p>Please confirm if you have received the payment via UPI: <strong>${cartItem.productId.seller.upi_id}</strong></p>
        <p>
          <a href="${process.env.FRONTEND_URL}/seller/confirm/${newOrder.orderId}">
            Click here to confirm payment
          </a>
        </p>
        <p>If you did not receive any payment, please ignore this email.</p>
      `,
    });

    res.json({
      message: "Marked as paid. Seller will be notified.",
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

export const confirmPaymentBySeller = async (req, res) => {
  const { orderId } = req.params;
  const sellerId = req.userId;

  try {
    const order = await OrderModel.findOne({ orderId });

    if (!order) return res.status(404).json({ message: "Order not found" });

    console.log("confirmPaymentBySeller invoked with:", orderId);

    // Check if the seller owns the product in this order
    const product = order.products.find(
      (p) => p.sellerId.toString() === sellerId
    );
    if (!product)
      return res
        .status(403)
        .json({ message: "You are not authorized to confirm this order" });

    // Mark confirmation
    order.isConfirmedBySeller = true;
    await order.save();

    // Delete product from marketplace
    await Product.findByIdAndDelete(product.productId);

    return res.json({
      message: "Payment confirmed and product removed from marketplace",
      success: true,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

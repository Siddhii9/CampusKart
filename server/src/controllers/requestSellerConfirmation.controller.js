import CartItemModel from "../models/CartItemModel.js";
import User from "../models/UserModel.js";
import sendEmail from "../../config/sendEmail.js"; // we'll define this

export const requestSellerConfirmation = async (req, res) => {
  try {
    const userId = req.userId;
    const { cartItemId } = req.params;

    const cartItem = await CartItemModel.findOne({
      _id: cartItemId,
      userId,
    }).populate({
      path: "productId",
      populate: { path: "seller", select: "name email upi_id mobile" },
    });

    if (!cartItem) {
      return res
        .status(404)
        .json({ message: "Cart item not found", success: false });
    }

    const buyer = await User.findById(userId);

    const seller = cartItem.productId.seller;
    const subject = "New Payment Confirmation Request – CampusKart";
    const html = `
      <h3>Hi ${seller.name},</h3>
      <p><strong>${buyer.name}</strong> has marked their payment as completed for the product <strong>${cartItem.productId.name}</strong>.</p>
      <ul>
        <li><strong>Product:</strong> ${cartItem.productId.name}</li>
        <li><strong>Amount:</strong> ₹${cartItem.productId.price * cartItem.quantity}</li>
        <li><strong>Quantity:</strong> ${cartItem.quantity}</li>
        <li><strong>Buyer Name:</strong> ${buyer.name}</li>
        <li><strong>Buyer Email:</strong> ${buyer.email}</li>
        <li><strong>Buyer Phone:</strong> ${buyer.mobile || "Not provided"}</li>
      </ul>
      <p>Please verify the payment on your UPI app and confirm this sale in your <b>Seller Dashboard</b>.</p>
    `;

    await sendEmail({
      sendTo: seller.email,
      subject: "Payment Marked as Done – Please Confirm | CampusKart",
      html,
    });

    return res.json({ message: "Seller has been notified", success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message, success: false });
  }
};

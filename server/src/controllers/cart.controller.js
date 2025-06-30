import CartItemModel from "../models/CartItemModel.js";
import Product from "../models/Product.js";
export const addToCart = async (req, res) => {
  try {
    const userId = req.userId;
    let { productId, quantity = 1 } = req.body;
    quantity = parseInt(quantity);
    if (!productId || isNaN(quantity) || quantity < 1) {
      return res
        .status(400)
        .json({ message: "Valid productId and quantity are required" });
    }

    const existing = await CartItemModel.findOne({ userId, productId });
    if (existing) {
      existing.quantity += quantity;
      await existing.save();
      return res.json({
        message: "Quantity updated",
        success: true,
        data: existing,
      });
    } else {
      const newItem = await CartItemModel.create({
        userId,
        productId,
        quantity,
      });
      return res.json({
        message: "Added to cart",
        success: true,
        data: newItem,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.userId;

    const cartItems = await CartItemModel.find({ userId }).populate(
      "productId"
    );
    return res.json({ data: cartItems, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.params;

    await CartItemModel.findOneAndDelete({ userId, productId });
    return res.json({ message: "Removed from cart", success: true });
  } catch (err) {
    res.status(500).json({ message: err.message, success: false });
  }
};

export const updateCartQuantity = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        message: "invalid quantity",
        success: false,
        error: true,
      });
    }

    const cartItem = await CartItemModel.findOneAndUpdate(
      { userId, productId },
      { quantity },
      { new: true }
    );

    if (!cartItem) {
      return res.status(400).json({
        message: "item not found in cart",
        success: false,
        error: true,
      });
    }

    return res.json({
      message: "Quantity updated",
      success: true,
      data: cartItem,
    });
  } catch (err) {
    res.status(500).json({ message: err.message, success: false });
  }
};

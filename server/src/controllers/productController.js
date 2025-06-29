import Product from "../models/Product.js";
import auth from "../middleware/auth.js";
// Add a new product
export const addProduct = async (req, res) => {
  try {
    console.log("Received product data:", req.body);
    const userId = req.userId;
    const { name, price, category, description, image } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newProduct = new Product({
      name,
      price,
      category,
      description,
      image,
      seller: userId,
    });

    const savedProduct = await newProduct.save();
    console.log("saved product", savedProduct);

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Failed to add product" });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

export const getFilteredProducts = async (req, res) => {
  const { search, category } = req.query;
  let filter = {};

  if (search) {
    const regex = new RegExp(search, "i");
    filter.$or = [{ name: regex }, { description: regex }, { category: regex }];
  }

  if (category) {
    // Use a flexible contains match instead of exact match
    filter.category = { $regex: category, $options: "i" };
  }

  console.log("Filtering with:", filter);

  try {
    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (err) {
    console.error("DB fetch error:", err);
    res.status(500).json({ error: "Failed to filter products" });
  }
};

export const getProductsByUser = async (req, res) => {
  try {
    console.log("userid from auth middleware:", req.userId);
    const userId = req.userId;
    const products = await Product.find({ seller: userId });
    res.status(200).json({ success: true, data: products });
  } catch (err) {
    console.error("error in getproductsbyuser: ", err);
    res
      .status(500)
      .json({ success: false, message: "Error fetching user products" });
  }
};

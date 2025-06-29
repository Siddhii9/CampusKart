import express from "express";
import {
  addProduct,
  getAllProducts,
  getFilteredProducts,
  getProductsByUser,
} from "../controllers/productController.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.post("/add", auth, addProduct);
router.get("/all", getAllProducts);
router.get("/filter", getFilteredProducts);
router.get("/user", auth, getProductsByUser);
export default router;

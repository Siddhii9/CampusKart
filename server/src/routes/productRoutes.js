import express from "express";
import {
  addProduct,
  getAllProducts,
  getFilteredProducts,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/add", addProduct);
router.get("/all", getAllProducts);
router.get("/filter", getFilteredProducts);

export default router;

import { Router } from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
  updateCartQuantity,
} from "../controllers/cart.controller.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/", auth, getCart);
router.post("/", auth, addToCart);
router.delete("/:productId", auth, removeFromCart);
router.patch("/:productId", auth, updateCartQuantity);
export default router;

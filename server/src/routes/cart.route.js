import { Router } from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
  getCartItemDetails,
} from "../controllers/cart.controller.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/", auth, getCart);
router.post("/", auth, addToCart);
router.delete("/:productId", auth, removeFromCart);
router.get("/item/:cartItemId", auth, getCartItemDetails);
export default router;

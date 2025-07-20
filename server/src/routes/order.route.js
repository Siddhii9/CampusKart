import express from "express";
import {
  markAsPaid,
  confirmPaymentBySeller,
} from "../controllers/order.controller.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/mark-paid/:cartItemId", auth, markAsPaid);

router.post("/seller/confirm/:orderId", auth, confirmPaymentBySeller);

export default router;

import { Router } from "express";
import {
  forgotPasswordController,
  loginController,
  logoutController,
  refreshToken,
  registerUserController,
  resetpassword,
  updateUserDetails,
  uploadAvatar,
  userDetails,
  verifyEmailController,
  verifyForgotPasswordOtp,
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../controllers/user.controller.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const userRouter = Router();

// User registration and email verification
userRouter.post("/register", registerUserController);
userRouter.post("/verify-email", verifyEmailController);

// User login and logout
userRouter.post("/login", loginController);
userRouter.get("/logout", auth, logoutController);

// Profile updates and avatar upload
userRouter.put("/upload-avatar", auth, upload.single("avatar"), uploadAvatar);
userRouter.put("/update-user", auth, updateUserDetails);

// Password reset flow
userRouter.post("/forgot-password", forgotPasswordController); // changed PUT to POST
userRouter.post("/verify-forgot-password-otp", verifyForgotPasswordOtp); // changed PUT to POST
userRouter.post("/reset-password", resetpassword); // changed PUT to POST

// Token refresh
userRouter.post("/refresh-token", refreshToken);

// Get user details (protected route)
userRouter.get("/user-details", auth, userDetails);

//whislist
userRouter.post("/wishlist", auth, addToWishlist);
userRouter.get("/wishlist", auth, getWishlist);
userRouter.delete("/wishlist/:productId", auth, removeFromWishlist);

export default userRouter;

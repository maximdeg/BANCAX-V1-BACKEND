import express from "express";
import {
  loginController,
  createUserController,
  resetPasswordController,
  forgotPasswordController,
  verifyMailValidationTokenController,
} from "../controllers/auth.controller.js";
import { verifyApiKeyMiddleware } from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.use(verifyApiKeyMiddleware);

authRouter.get(
  "/verify/:verification_token",
  verifyMailValidationTokenController
);
authRouter.post("/login", loginController);
authRouter.post("/signup", createUserController);
authRouter.put("/reset-password/:token", resetPasswordController);
authRouter.put("/forgot-password", forgotPasswordController);

export default authRouter;

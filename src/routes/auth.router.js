import express from "express";
import {
  loginController,
  createUserController,
  forgotPasswordController,
  verifyMailValidationTokenController,
} from "../controllers/auth.controller.js";
import { verifyApiKeyMiddleware } from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.get(
  "/verify/:verification_token",
  verifyMailValidationTokenController
);

authRouter.use(verifyApiKeyMiddleware);
authRouter.post("/login", loginController);
authRouter.post("/signup", createUserController);
authRouter.post("/forgot-password", forgotPasswordController);

export default authRouter;

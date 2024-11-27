import express from "express";
import {
  createUserController,
  loginController,
  verifyMailValidationTokenController,
} from "../controllers/auth.controller.js";
import { verifyApiKeyMiddleware } from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.get(
  "/verify/:verification_token",
  verifyMailValidationTokenController
);
authRouter.use(verifyApiKeyMiddleware);
authRouter.post("/signup", createUserController);
authRouter.post("/login", loginController);

export default authRouter;

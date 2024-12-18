import express from "express";
import {
    loginController,
    createUserController,
    resetPasswordController,
    forgotPasswordController,
    changePasswordController,
    verifyMailValidationTokenController,
} from "../controllers/auth.controller.js";
import { verifyApiKeyMiddleware, verifyTokenMiddleware } from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.use(verifyApiKeyMiddleware);

authRouter.get("/verify/:verification_token", verifyMailValidationTokenController);
authRouter.post("/login", loginController);
authRouter.post("/signup", createUserController);
authRouter.put("/forgot-password", forgotPasswordController);
authRouter.put("/reset-password/:token", resetPasswordController);

authRouter.use(verifyTokenMiddleware("user"));
authRouter.put("/reset-password/user/:user_id", changePasswordController);

export default authRouter;

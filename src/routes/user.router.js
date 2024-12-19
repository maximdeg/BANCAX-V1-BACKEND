import express from "express";
import { getAllUsersController, getUserByIdController, saveImageController, updateUserByIdController } from "../controllers/user.controller.js";
import { verifyApiKeyMiddleware, verifyTokenMiddleware } from "../middlewares/auth.middleware.js";
import { get } from "mongoose";

const userRouter = express.Router();

userRouter.use(verifyApiKeyMiddleware);
userRouter.use(verifyTokenMiddleware("user"));

userRouter.get("/", getAllUsersController);
userRouter.get("/:user_id", getUserByIdController);
userRouter.put("/:user_id", updateUserByIdController);
userRouter.put("/upload-photo/:user_id", saveImageController);

export default userRouter;

import express from "express";
import {
  addSourceController,
  getAllUsersController,
  updateUserByIdController,
} from "../controllers/user.controller.js";
import {
  verifyApiKeyMiddleware,
  verifyTokenMiddleware,
} from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.use(verifyApiKeyMiddleware);
userRouter.use(verifyTokenMiddleware("user"));

userRouter.get("/", getAllUsersController);
userRouter.put("/:user_id", addSourceController);

export default userRouter;

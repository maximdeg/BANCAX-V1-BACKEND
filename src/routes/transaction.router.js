import express from "express";
import {
  createTransactionController,
  getAllTransactionsController,
} from "../controllers/transaction.controller.js";
import {
  verifyApiKeyMiddleware,
  verifyTokenMiddleware,
} from "../middlewares/auth.middleware.js";

const transactionRouter = express.Router();

transactionRouter.use(verifyApiKeyMiddleware);
transactionRouter.use(verifyTokenMiddleware("user"));

transactionRouter.post("/:user_id", createTransactionController);
transactionRouter.get("/:user_id", getAllTransactionsController);

export default transactionRouter;

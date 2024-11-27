import TransactionRepository from "../repositories/transaction.repository.js";
import { responseBuilder } from "../utils/builders/responseBuilder.js";

export const getAllTransactionsController = async (req, res) => {
  try {
    const { user_id } = req.params;
    const transactions = await TransactionRepository.getAllTransactionsByUserId(
      user_id
    );
    return res
      .status(200)
      .json(responseBuilder(true, 200, "Transactions", { transactions }));
  } catch (err) {
    res.status(500).json(
      responseBuilder(false, 500, "SERVER_ERROR", {
        location: "getAllTransactionController",
        message: err.message,
      })
    );
  }
};

export const createTransactionController = async (req, res) => {
  try {
    const { user_id, amount, source, category, description } = req.body;

    const transaction = await TransactionRepository.saveTransaction({
      user_id,
      amount,
      source,
      category,
      description,
    });

    res.status(200).json(
      responseBuilder(true, 200, "Transaction created successfully", {
        detail: transaction,
      })
    );
  } catch (err) {
    res.status(500).json(
      responseBuilder(false, 500, "SERVER_ERROR", {
        location: "createTransactionController",
        message: err.message,
      })
    );
  }
};

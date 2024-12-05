import TransactionRepository from "../repositories/transaction.repository.js";
import UserRepository from "../repositories/user.repository.js";
import { responseBuilder } from "../utils/builders/responseBuilder.js";

export const getAllTransactionsController = async (req, res) => {
    try {
        const { user_id } = req.params;

        if (!user_id) {
            return res.status(400).json(
                responseBuilder(false, 400, "BAD_REQUEST", {
                    detail: "User id is needed for this operation",
                })
            );
        }

        const user = await UserRepository.getById(user_id);

        if (!user) {
            return res.status(404).json(
                responseBuilder(false, 404, "NOT_FOUND", {
                    detail: "User not found",
                })
            );
        }

        const transactions = await TransactionRepository.getAllTransactionsByUserId(user_id);

        console.log("TRANSACTIONS", transactions);

        if (!transactions) {
            return res.status(404).json(
                responseBuilder(false, 404, "NOT_FOUND", {
                    detail: "Transactions not found",
                })
            );
        }

        return res.status(200).json(responseBuilder(true, 200, "Transactions", { transactions }));
    } catch (err) {
        if (err.kind === "ObjectId") {
            return res.status(401).json(
                responseBuilder(false, 401, "UNAUTHORIZED", {
                    location: "getAllTransactionController",
                    message: "Id not valid",
                })
            );
        } else {
            return res.status(500).json(
                responseBuilder(false, 500, "SERVER_ERROR", {
                    location: "getAllTransactionController",
                    message: err.message,
                })
            );
        }
    }
};

export const createTransactionController = async (req, res) => {
    try {
        const { user_id } = req.params;
        const { amount, source, category, description, date } = req.body;

        const transaction = await TransactionRepository.saveTransaction({
            user_id,
            amount,
            date,
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

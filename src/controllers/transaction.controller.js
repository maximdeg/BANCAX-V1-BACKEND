import UserRepository from "../repositories/user.repository.js";
import TransactionRepository from "../repositories/transaction.repository.js";
import { responseBuilder } from "../utils/builders/responseBuilder.js";
import { userIdNotFound, userNotFound, serverError } from "../utils/serverResponses.js";

export const getAllTransactionsController = async (req, res) => {
    try {
        const { user_id } = req.params;

        if (!user_id) {
            return userIdNotFound(res, "getAllTransactionsController");
        }

        const user = await UserRepository.getById(user_id);

        if (!user) {
            return userNotFound(res, "getAllTransactionsController");
        }

        const transactions = await TransactionRepository.getAllTransactionsByUserId(user_id);

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
                    detail: "Id not valid",
                })
            );
        } else {
            return serverError(res, "getAllTransactionsController", err.message);
        }
    }
};

export const createTransactionController = async (req, res) => {
    try {
        const { user_id } = req.params;
        const { amount, source, category, description, date } = req.body;

        if (!user_id) {
            return userIdNotFound(res, "createTransactionController");
        }

        if (!amount || !source || !category || !description || !date) {
            return res.status(400).json(
                responseBuilder(false, 400, "BAD_REQUEST", {
                    location: "createTransactionController",
                    detail: "Transaction data is required",
                })
            );
        }

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
        return serverError(res, "createTransactionController", err.message);
    }
};

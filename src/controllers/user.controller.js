import UserRepository from "../repositories/user.repository.js";
import { responseBuilder } from "../utils/builders/responseBuilder.js";

export const getAllUsersController = async (req, res) => {
    try {
        const users = await UserRepository.getAll();

        return res.status(200).json(responseBuilder(true, 200, "ALL ACTIVE USERS", { detail: users }));
    } catch (err) {
        return res.status(500).json(
            responseBuilder(false, 500, "SERVER_ERROR", {
                location: "getAllUsersController",
                detail: err.message,
            })
        );
    }
};

export const updateUserByIdController = async (req, res) => {
    try {
        const user_id = req.params.user_id;

        if (!user_id) {
            return res.status(400).json(
                responseBuilder(false, 400, "BAD_REQUEST", {
                    location: "updateUserByIdController",
                    detail: "User id is required",
                })
            );
        }

        if (!req.body) {
            return res.status(400).json(
                responseBuilder(false, 400, "BAD_REQUEST", {
                    location: "updateUserByIdController",
                    detail: "User data is required",
                })
            );
        }

        const user = await UserRepository.updateUser(user_id, req.body);

        if (!user) {
            return res.status(404).json(
                responseBuilder(false, 404, "NOT_FOUND", {
                    location: "updateUserByIdController",
                    detail: "User not found",
                })
            );
        }

        user.updated_at = Date.now();

        return res.status(200).json(
            responseBuilder(true, 200, "User updated successfully", {
                detail: {
                    user: {
                        id: user._id,
                        fullname: user.fullname,
                        email: user.email,
                        photo: user.photo,
                        categories: user.categories,
                        sources: user.sources,
                        role: user.role,
                    },
                },
            })
        );
    } catch (err) {
        res.status(500).json(
            responseBuilder(false, 500, "SERVER_ERROR", {
                location: "updateUserByIdController",
                detail: err.message,
            })
        );
    }
};

export const getUserByIdController = async (req, res) => {
    try {
        const { user_id } = req.params;

        if (!user_id) {
            return res.status(400).json(
                responseBuilder(false, 400, "BAD_REQUEST", {
                    location: "getUserByIdController",
                    detail: "User id is required",
                })
            );
        }

        const user = await UserRepository.getById(user_id);

        if (!user) {
            return res.status(404).json(
                responseBuilder(false, 404, "NOT_FOUND", {
                    location: "getUserByIdController",
                    detail: "User not found",
                })
            );
        }

        return res.status(200).json(
            responseBuilder(true, 200, "User found successfully", {
                detail: {
                    user: {
                        id: user._id,
                        fullname: user.fullname,
                        email: user.email,
                        photo: user.photo,
                        categories: user.categories,
                        sources: user.sources,
                        role: user.role,
                    },
                },
            })
        );
    } catch (err) {
        res.status(500).json(
            responseBuilder(false, 500, "SERVER_ERROR", {
                location: "getUserByIdController",
                detail: err.message,
            })
        );
    }
};

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

        const user = await UserRepository.updateUser(user_id, req.body);

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

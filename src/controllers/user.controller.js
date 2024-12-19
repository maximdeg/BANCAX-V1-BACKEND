import { v2 as cloudinary } from "cloudinary";
import ENV from "../config/enviroment.config.js";
import UserRepository from "../repositories/user.repository.js";
import { responseBuilder } from "../utils/builders/responseBuilder.js";
import { userIdNotFound, userNotFound, serverError } from "../utils/serverResponses.js";

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
            return userIdNotFound(res, "updateUserByIdController");
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
            return userNotFound(res, "updateUserByIdController");
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
        return serverError(res, "updateUserByIdController", err.message);
    }
};

export const getUserByIdController = async (req, res) => {
    try {
        const { user_id } = req.params;

        if (!user_id) {
            return userIdNotFound(res, "getUserByIdController");
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
        return serverError(res, "getUserByIdController", err.message);
    }
};

export const saveImageController = async (req, res) => {
    cloudinary.config({
        cloud_name: ENV.CLOUD_NAME,
        api_key: ENV.CLOUD_API_KEY,
        api_secret: ENV.CLOUD_API_SECRET,
    });

    try {
        const { user_id } = req.params;
        const { photo } = req.body;

        if (!user_id) {
            return userIdNotFound(res, "saveImageController");
        }

        if (!photo) {
            return res.status(400).json(
                responseBuilder(false, 400, "BAD_REQUEST", {
                    location: "savePictureController",
                    detail: "Photo is required",
                })
            );
        }

        const response = await cloudinary.uploader.upload(photo, { public_id: `users/${user_id}/${Date.now()}` });

        const photo_url = cloudinary.url(response.public_id, {
            transformation: [
                {
                    quality: "auto",
                    fetch_format: "auto",
                },
                {
                    width: 1200,
                    height: 1200,
                    crop: "fill",
                    gravity: "auto",
                },
            ],
        });

        const user = await UserRepository.updateUser(user_id, { photo: photo_url });

        if (!user) {
            return userNotFound(res, "saveImageController");
        }

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
        return serverError(res, "saveImageController", err.message);
    }
};

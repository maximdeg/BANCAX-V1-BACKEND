import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Email from "../utils/email.js";
import ENV from "../config/enviroment.config.js";
import { validateCreateUser } from "../utils/errors.handler.js";
import UserRepository from "../repositories/user.repository.js";
import { responseBuilder } from "../utils/builders/responseBuilder.js";
import { userNotFound, serverError } from "../utils/serverResponses.js";

const signToken = (id) => {
    return jwt.sign(id, ENV.JWT_SECRET, {
        expiresIn: ENV.JWT_EXPIRES_IN,
    });
};

// SIGNUP CONTROLLER
export const createUserController = async (req, res, next) => {
    try {
        const { fullname, email, password, password_confirm } = req.body;

        const { status_code, response_errors } = validateCreateUser({ fullname, email, password, password_confirm });

        if (status_code > 300) {
            return res.status(status_code).json(response_errors);
        }

        const hashed_password = await bcrypt.hash(password, 10);

        const verificationToken = signToken({ email });

        const newUser = {
            fullname,
            email,
            password: hashed_password,
            password_confirm: hashed_password,
            verification_token: verificationToken,
        };

        const user = await UserRepository.saveUser(newUser);

        if (!user) {
            return res.status(500).json(
                responseBuilder(false, 500, "SERVER_ERROR", {
                    location: "createUserController",
                    detail: "Failed to save user",
                })
            );
        }

        const url = `${ENV.URL_FRONTEND}/in/verify/${verificationToken}`;

        await new Email(fullname, email, url).sendVerificationToken();

        return res.status(200).json(
            responseBuilder(true, 200, "User created successfully", {
                detail: user,
            })
        );
    } catch (err) {
        if (err.code === 11000) {
            res.status(409).json(
                responseBuilder(false, 409, "DATABASE_ERROR", {
                    location: "createUserController",
                    detail: "This email already registered",
                })
            );
        } else {
            serverError(res, "createUserController", err.message);
        }
        return next(err);
    }
};

// LOGIN CONTROLLER
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return res.status(400).json(responseBuilder(false, 400, "BAD_REQUEST", { detail: "Email and password are required" }));

        const user = await UserRepository.getByEmail(email);

        if (!user) {
            return res.status(404).json(
                responseBuilder(false, 404, "NOT_FOUND", {
                    detail: "User or password are incorrect.",
                })
            );
        }

        console.log(user.password, password);
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword || !user) {
            return res.status(401).json(
                responseBuilder(false, 401, "INVALID_PASSWORD", {
                    detail: "User not found or password is incorrect",
                })
            );
        }

        if (!user.email_verified) {
            return res.status(401).json(
                responseBuilder(false, 401, "UNAUTHORIZED", {
                    detail: "User not verified",
                })
            );
        }

        const token = signToken({
            email: user.email,
            id: user._id,
            role: user.role,
        });

        return res.status(200).json(
            responseBuilder(true, 200, "Login successful", {
                token,
                user: {
                    id: user._id,
                    fullname: user.fullname,
                    email: user.email,
                    photo: user.photo,
                    categories: user.categories,
                    sources: user.sources,
                    role: user.role,
                },
            })
        );
    } catch (err) {
        return serverError(res, "loginController", err.message);
    }
};

// VERIFY MAIL CONTROLLER
export const verifyMailValidationTokenController = async (req, res) => {
    try {
        const { verification_token } = req.params;

        if (!verification_token) {
            return res.status(400).json(
                responseBuilder(false, 400, "BAD_REQUEST", {
                    detail: "Invalid verification token",
                })
            );
        }

        const decodedUser = jwt.verify(verification_token, ENV.JWT_SECRET);

        const user = await UserRepository.getByEmail(decodedUser.email);

        if (!user) return userNotFound(res, "verifyMailValidationTokenController");

        if (user.email_verified) {
            return res.status(200).json(
                responseBuilder(false, 400, "BAD_REQUEST", {
                    detail: "User already verified",
                })
            );
        }

        user.email_verified = true;

        await user.save();

        return res.status(200).json(
            responseBuilder(true, 200, "SUCCESS", {
                message: "Email verified successfully",
                detail: user,
            })
        );
    } catch (err) {
        return serverError(res, "verifyMailValidationTokenController", err.message);
    }
};

// FORGOT PASSWORD CONTROLLER
export const forgotPasswordController = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(401).json(
                responseBuilder(false, 400, "BAD_REQUEST", {
                    detail: "Email is required",
                })
            );
        }

        const user = await UserRepository.getByEmail(email);
        console.dir(user);

        if (!user) {
            return userNotFound(res, "forgotPasswordController");
        }

        const token = signToken({
            email: user.email,
            id: user._id,
        });

        const url = `${ENV.URL_FRONTEND}/in/reset-password/${token}`;

        const response = await new Email(user.fullname, user.email, url).sendResetPasswordToken();

        if (!response.response.split(" ")[2] === "OK")
            return res.status(500).json(responseBuilder(false, 500, "SERVER_ERROR", { detail: "Error to send email" }));

        return res.status(200).json(
            responseBuilder(true, 200, "SUCCESS", {
                detail: "Recovery password email sent successfully",
            })
        );
    } catch (err) {
        return serverError(res, "forgotPasswordController", err.message);
    }
};

// RESET PASSWORD CONTROLLER
export const resetPasswordController = async (req, res) => {
    try {
        const { password, password_confirm } = req.body.data;
        const { token } = req.params;

        if (!password || !password_confirm) {
            return res.status(401).json(
                responseBuilder(false, 400, "BAD_REQUEST", {
                    detail: "Password and password confirm are required",
                })
            );
        }

        if (password !== password_confirm) {
            return res.status(401).json(
                responseBuilder(false, 400, "BAD_REQUEST", {
                    detail: "Passwords do not match",
                })
            );
        }

        const decodedUser = jwt.verify(token, ENV.JWT_SECRET);

        const user = await UserRepository.getByEmail(decodedUser.email);

        if (!user) {
            return userNotFound(res, "resetPasswordController");
        }

        const hashed_password = await bcrypt.hash(password, 10);

        user.password = hashed_password;
        user.password_confirm = hashed_password;
        user.updated_at = Date.now();
        user.password_changed_at = Date.now();

        await user.save();

        return res.status(200).json(
            responseBuilder(true, 200, "SUCCESS", {
                message: "Password updated successfully",
                detail: user,
            })
        );
    } catch (err) {
        return serverError(res, "resetPasswordController", err.message);
    }
};

export const changePasswordController = async (req, res) => {
    try {
        const { user_id } = req.params;
        const { password, password_confirm } = req.body;

        if (!user_id) {
            return res.status(400).json(
                responseBuilder(false, 400, "BAD_REQUEST", {
                    location: "changePasswordController",
                    detail: "User id is required",
                })
            );
        }

        const user = await UserRepository.getById(user_id);

        if (!user) {
            return userNotFound(res, "changePasswordController");
        }

        if (!password || !password_confirm) {
            return res.status(400).json(
                responseBuilder(false, 400, "BAD_REQUEST", {
                    location: "changePasswordController",
                    detail: "Password and password confirm are required",
                })
            );
        }

        if (password !== password_confirm) {
            return res.status(400).json(
                responseBuilder(false, 400, "BAD_REQUEST", {
                    location: "changePasswordController",
                    detail: "Passwords do not match",
                })
            );
        }

        const hashed_new_password = await bcrypt.hash(password, 10);

        user.password = hashed_new_password;
        user.password_confirm = hashed_new_password;
        user.updated_at = Date.now();
        user.password_changed_at = Date.now();

        await user.save();

        return res.status(200).json(
            responseBuilder(true, 200, "SUCCESS", {
                message: "Password updated successfully",
                detail: user,
            })
        );
    } catch (err) {
        return serverError(res, "changePasswordController", err.message);
    }
};

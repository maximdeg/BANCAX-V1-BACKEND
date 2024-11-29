import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ENV from "../config/enviroment.config.js";
import Email from "../utils/email.js";
import { responseBuilder } from "../utils/builders/responseBuilder.js";
import UserRepository from "../repositories/user.repository.js";

const signToken = id => {
  return jwt.sign(id, ENV.JWT_SECRET, {
    expiresIn: ENV.JWT_EXPIRES_IN,
  });
};

// SIGNUP CONTROLLER
export const createUserController = async (req, res, next) => {
  try {
    const { fullname, email, password, password_confirm } = req.body;
    // TODO: Validations

    if (password !== password_confirm) {
      return res.status(400).json(
        responseBuilder(false, 400, "BAD_REQUEST", {
          message: "Passwords do not match",
        })
      );
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

    const url = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/auth/verify/${verificationToken}`;

    await new Email(fullname, email, url).sendVerificationToken();

    const user = await UserRepository.saveUser(newUser);

    return res.status(200).json(
      responseBuilder(true, 200, "User created successfully", {
        detail: user,
      })
    );
  } catch (err) {
    if (err.code === 11000) {
      err.message = "Email is already taken.";
      res.statusCode = 409;
      res.status(409).json(
        responseBuilder(true, 409, "DATABASE_ERROR", {
          location: "createUserController",
          message: err.message,
        })
      );
    } else {
      res.status(500).json(
        responseBuilder(true, 500, "SERVER_ERROR", {
          location: "createUserController",
          message: err.message,
        })
      );
    }
    return next(err);
  }
};

// LOGIN CONTROLLER
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserRepository.getByEmail(email);

    if (!user) {
      return res.status(401).json(
        responseBuilder(false, 401, "UNAUTHORIZED", {
          detail: "User does not exist. Please register to continue.",
        })
      );
    }

    if (!user.email_verified) {
      return res.status(401).json(
        responseBuilder(false, 401, "UNAUTHORIZED", {
          detail:
            "User is not verified. Please check your email, including the spam folder, to verify your email.",
        })
      );
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json(
        responseBuilder(false, 401, "INVALID_PASSWORD", {
          detail: "The password is not correct",
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
    res.status(500).json(
      responseBuilder(false, 500, "SERVER_ERROR", {
        location: "loginController",
        message: err.message,
      })
    );
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

    console.log(decodedUser.email);
    const user = await UserRepository.getByEmail(decodedUser.email);

    if (!user) throw new Error("USER NOT FOUND");

    // if (user.emailVerified) {
    //   // verification logic
    // }

    user.email_verified = true;

    await user.save();

    return res.status(200).json(
      responseBuilder(true, 200, "SUCCESS", {
        message: "Email verified successfully",
        detail: user,
      })
    );
  } catch (err) {
    res.status(500).json(
      responseBuilder(false, 500, "SERVER_ERROR", {
        location: "verifyMailValidationTokenController",
        message: err.message,
      })
    );
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

    if (!user) {
      return res.status(401).json(
        responseBuilder(false, 404, "UNAUTHORIZED", {
          detail: "User not found",
        })
      );
    }

    const token = signToken({
      email: user.email,
      id: user._id,
    });

    const url = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/auth/reset-password/${token}`;

    const response = await new Email(
      user.fullname,
      user.email,
      url
    ).sendResetPasswordToken();

    console.log(response);

    return res.status(200).json(
      responseBuilder(true, 200, "SUCCESS", {
        message: "Recovery password email sent successfully",
      })
    );
  } catch (err) {
    res.status(500).json(
      responseBuilder(false, 500, "SERVER_ERROR", {
        location: "forgotPasswordController",
        message: err.message,
      })
    );
  }
};

// RESET PASSWORD CONTROLLER

// UPDATE PASSWORD CONTROLLER

// LOGOUT CONTROLLER

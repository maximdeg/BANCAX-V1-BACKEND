import UserRepository from "../repositories/user.repository.js";
import { responseBuilder } from "../utils/builders/responseBuilder.js";

export const getAllUsersController = async (req, res) => {
  try {
    const users = await UserRepository.getAll();

    return res
      .status(200)
      .json(responseBuilder(true, 200, "ALL ACTIVE USERS", { message: users }));
  } catch (err) {
    return res.status(500).json(
      responseBuilder(false, 500, "SERVER_ERROR", {
        location: "getAllUsersController",
        message: err.message,
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
        detail: user,
      })
    );
  } catch (err) {
    res.status(500).json(
      responseBuilder(false, 500, "SERVER_ERROR", {
        location: "updateUserByIdController",
        message: err.message,
      })
    );
  }
};

export const addSourceController = async (req, res) => {
  try {
    const user_id = req.params.user_id;

    const user = await UserRepository.updateUser(user_id, req.body);

    return res.status(200).json(
      responseBuilder(true, 200, "User updated successfully", {
        detail: user,
      })
    );
  } catch (err) {
    res.status(500).json(
      responseBuilder(false, 500, "SERVER_ERROR", {
        location: "updateUserByIdController",
        message: err.message,
      })
    );
  }
};

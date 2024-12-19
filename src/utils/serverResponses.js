import { responseBuilder } from "./builders/responseBuilder.js";

export const userIdNotFound = (res, from) => {
    return res.status(404).json(
        responseBuilder(false, 404, "NOT_FOUND", {
            location: from,
            detail: "User ID not found",
        })
    );
};

export const userNotFound = (res, from) => {
    return res.status(404).json(
        responseBuilder(false, 404, "NOT_FOUND", {
            location: from,
            detail: "User not found",
        })
    );
};

export const serverError = (res, from, detail) => {
    return res.status(500).json(
        responseBuilder(false, 500, "SERVER_ERROR", {
            location: from,
            detail,
        })
    );
};

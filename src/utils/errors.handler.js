import { responseBuilder } from "./builders/responseBuilder.js";

export const validateCreateUser = (fields) => {
    const { fullname, email, password, password_confirm } = fields;

    if (!fullname) {
        return {
            status_code: 400,
            response_errors: responseBuilder(false, 400, "BAD_REQUEST", {
                message: "Fullname is required",
            }),
        };
    }

    if (fullname.split(" ").length < 2) {
        return {
            status_code: 400,
            response_errors: responseBuilder(false, 400, "BAD_REQUEST", {
                message: "Please provide first name and last name.",
            }),
        };
    }

    if (!/^[a-zA-Z\s]*$/.test(fullname)) {
        return {
            status_code: 400,
            response_errors: responseBuilder(false, 400, "BAD_REQUEST", {
                message: "No numbers allowed in fullname",
            }),
        };
    }

    if (!email) {
        return {
            status_code: 400,
            response_errors: responseBuilder(false, 400, "BAD_REQUEST", {
                message: "Email is required",
            }),
        };
    }

    if (password.length < 8) {
        return {
            status_code: 400,
            response_errors: responseBuilder(false, 400, "BAD_REQUEST", {
                message: "Password must be at least 8 characters long",
            }),
        };
    }

    if (password !== password_confirm) {
        return {
            status_code: 400,
            response_errors: responseBuilder(false, 400, "BAD_REQUEST", {
                message: "Passwords do not match",
            }),
        };
    }

    return {
        status_code: 200,
        response_errors: null,
    };
};

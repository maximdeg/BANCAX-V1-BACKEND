import jwt from "jsonwebtoken";
import ENV from "../config/enviroment.config.js";
import { responseBuilder } from "../utils/builders/responseBuilder.js";

export const verifyTokenMiddleware = (permited_roles = []) => {
  return (req, res, next) => {
    try {
      const auth_header = req.headers["authorization"];

      if (!auth_header) {
        return res.status(401).json(
          responseBuilder(false, 401, "Authorization missing", {
            detail: "Waiting for the authorization token",
          })
        );
      }
      const access_token = auth_header;

      if (!access_token) {
        return res.status(401).json(
          responseBuilder(false, 401, "Authorization token malformed", {
            detail: "Waiting for a valid authorization token",
          })
        );
      }

      const decoded = jwt.verify(access_token, ENV.JWT_SECRET);
      req.user = decoded;

      if (permited_roles.length && !permited_roles.includes(req.user.role)) {
        return res.status(403).json(
          responseBuilder(false, 401, "RESTRICTED_ACCESS", {
            detail:
              "You do not have the right permissions to realize this operation",
          })
        );
      }
      return next();
    } catch (err) {
      return res.status(500).json(
        responseBuilder(false, 500, "SERVER_ERROR", {
          detail: "Error on verification token function",
        })
      );
    }
  };
};

export const verifyApiKeyMiddleware = (req, res, next) => {
  try {
    const apikey_header = req.header("x-api-key");

    if (!apikey_header) {
      return res.status(401).json(
        responseBuilder(false, 401, "Missing API KEY", {
          detail: "Waiting for an api-key",
        })
      );
    }

    if (apikey_header !== ENV.INTERNAL_API_KEY) {
      return res.status(401).json(
        responseBuilder(false, 401, "Unauthorized", {
          detail: "Waiting for a valid API KEY",
        })
      );
    }

    return next();
  } catch (err) {
    return res.status(500).json(
      responseBuilder(false, 500, "INTERNAL_SERVER_ERROR", {
        detail: "Couldn't get the API KEY",
      })
    );
  }
};

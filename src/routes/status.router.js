import express from "express";
import { getStatusPing } from "../controllers/status.controller.js";

const statusRouter = express.Router();

statusRouter.get("/ping", getStatusPing);

export default statusRouter;

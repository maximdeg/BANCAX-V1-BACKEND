import nodemailer from "nodemailer";
import ENV from "./enviroment.config.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: ENV.GMAIL_USER,
    pass: ENV.GMAIL_PASS,
  },
});

export default transporter;

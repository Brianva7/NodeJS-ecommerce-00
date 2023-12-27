import nodemailer from "nodemailer";
import dotenvConfig from "./dotenv.config.js";

const transport = nodemailer.createTransport({
  service: "Gmail",
  port: 587,
  auth: {
    user: dotenvConfig.nodemailerUser,
    pass: dotenvConfig.nodemailerPass,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export default transport;

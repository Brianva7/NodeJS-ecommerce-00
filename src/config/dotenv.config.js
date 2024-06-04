import dotenv from "dotenv";

dotenv.config();

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mogoUrl: process.env.MONGO_URL,
  secret: process.env.SECRET,
  adminEmail: process.env.ADMIN_EMAIL,
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL,
  persistence: process.env.PERSISTENCE,
  nodemailerUser: process.env.NODEMAILER_USER,
  nodemailerPass: process.env.NODEMAILER_PASS,
  publicNetwork: process.env.PUBLIC_NETWORK,
  origin: process.env.ORIGIN,
};

import passport from "passport";
import usersServices from "../services/users.service.js";
import jwt from "jsonwebtoken";
import transport from "../config/mail.config.js";
import dotenvConfig from "../config/dotenv.config.js";
import bcrypt from "bcrypt";

export default class sessionsController {
  static login = async (req, res) => {
    const { email, password } = req.body;

    passport.authenticate("login", (err, user) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (!user) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        usersServices.updateLastConnection(user._id);

        req.session.user = {
          id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          age: user.age,
          email: user.email,
          role: user.role,
          cart: user.cart,
          last_connection: user.last_connection,
        };

        res.redirect("/products");
      });
    })(req, res);
  };

  static register = async (req, res) => {
    const { email, password } = req.body;
    const user = await passport.authenticate("register", {
      successRedirect: "/login",
      failureRedirect: "/register",
    })(req, res);
  };

  static github = async (req, res) => {
    passport.authenticate("github", { scope: ["user:email"] })(req, res);
  };

  static githubCallback = async (req, res) => {
    passport.authenticate("github", { failureRedirect: "/login" })(
      req,
      res,
      () => {
        req.session.user = req.user;
        res.redirect("/");
      }
    );
  };

  static forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await usersServices.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign({ userId: user._id }, dotenvConfig.secret, {
      expiresIn: "1h",
    });

    const resetUrl = `http://localhost:8080/api/sessions/resetpassword/${token}`;

    transport.sendMail({
      from: dotenvConfig.nodemailerUser,
      to: email,
      subject: "Reset Password",
      html: `<p>Click on the following link to reset your password:</p><p><a href="${resetUrl}">${resetUrl}</a></p>`,
    });

    res.render("forgotPassword");
  };

  static resetPasswordToken = async (req, res) => {
    const { token } = req.params;

    try {
      const tokenData = jwt.verify(token, dotenvConfig.secret);

      const uid = tokenData.userId;

      req.session.userId = uid;
      res.render("resetPassword");
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Invalid or expired token" });
    }
  };

  static resetPassword = async (req, res) => {
    const { newPassword } = req.body;
    const uid = req.session.userId;

    const user = await usersServices.getUserById(uid);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await usersServices.changePassword(uid, hashedPassword);

    req.session.destroy();

    res.redirect("/login");
  };
}

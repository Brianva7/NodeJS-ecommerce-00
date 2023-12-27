import usersService from "../services/users.service.js";
import transport from "../config/mail.config.js";

export default class userController {
  static getUsers = async (req, res) => {
    try {
      const users = await usersService.getUsers();
      res.json({ status: "success", payload: users });
    } catch (err) {
      console.error(err);
      res.json({ status: "error", message: "Internal Server Error" });
    }
  };

  static getUserById = async (req, res) => {
    try {
      const { uid } = req.params;
      const user = await usersService.getUserById(uid);
      res.json({ status: "success", payload: user });
    } catch (err) {
      console.error(err);
      res.json({ status: "error", message: "Internal Server Error" });
    }
  };

  static createUser = async (req, res) => {
    try {
      const user = await usersService.createUser(req.body);
      res.json({ status: "success", payload: user });
    } catch (err) {
      console.error(err);
      res.json({ status: "error", message: "Internal Server Error" });
    }
  };

  static deleteUser = async (req, res) => {
    try {
      const { uid } = req.params;
      const deletedUser = await usersService.deleteUser(uid);
      res.json({ status: "success", payload: deletedUser });
    } catch (err) {
      console.error(err);
      res.json({ status: "error", message: "Internal Server Error" });
    }
  };

  static upgradeDegradeUser = async (req, res) => {
    try {
      const { uid } = req.params;
      const updatedUser = await usersService.upgradeDegradeUser(uid);
      res.json({ status: "success", payload: updatedUser });
    } catch (err) {
      console.error(err);
      res.json({ status: "error", message: "Internal Server Error" });
    }
  };

  static getUserByEmail = async (req, res) => {
    try {
      const { email } = req.params;
      const user = await usersService.getUserByEmail(email);
      res.json({ status: "success", payload: user });
    } catch (err) {
      console.error(err);
      res.json({ status: "error", message: "Internal Server Error" });
    }
  };

  static changePassword = async (req, res) => {
    try {
      const { uid } = req.params;
      const { password } = req.body;
      const updatedUser = await usersService.changePassword(uid, password);
      res.json({ status: "success", payload: updatedUser });
    } catch (err) {
      console.error(err);
      res.json({ status: "error", message: "Internal Server Error" });
    }
  };

  static uploadDocuments = async (req, res) => {
    try {
      const { uid } = req.params;
      const file = req.file;

      const documents = {
        name: file.originalname,
        reference: file.destination + "/" + file.filename,
      };

      await usersService.uploadDocuments(uid, documents);

      const user = req.session.user;

      res.render("profile", { user });
    } catch (err) {
      console.error(err);
      res.json({ status: "error", message: "Internal Server Error" });
    }
  };

  static deleteInactiveUsers = async (req, res) => {
    try {
      const inactiveUsers = await usersService.getInactiveUsers();

      if (inactiveUsers.length === 0) {
        res.json({ status: "success", payload: inactiveUsers });
        return;
      }

      const usersEmails = inactiveUsers.map((user) => user.email);

      await transport.sendMail({
        from: "Admin",
        to: usersEmails,
        subject: "Inactive User",
        text: "Inactive User",
        html: `<h1>Your account has been deleted for inactivity</h1>`,
      });

      const usersIds = inactiveUsers.map((user) => user._id);

      usersIds.forEach(async (id) => {
        await usersService.deleteUser(id);
      });

      res.json({ status: "success", payload: inactiveUsers });
    } catch (err) {
      console.error(err);
      res.json({ status: "error", message: "Internal Server Error" });
    }
  };
}

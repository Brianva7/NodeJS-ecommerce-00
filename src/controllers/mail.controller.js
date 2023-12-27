import transport from "../config/mail.config.js";

const mailingTemplate = `<div><h1>Gracias por tu compra</h1></div>`;
const mailOptions = {
  from: "market@example.com",
  to: "vazquesbrian7@gmail.com",
  subject: "Gracias por tu compra",
  html: mailingTemplate,
};

export default class mailController {
  static sendMail = async (req, res) => {
    try {
      await transport.sendMail(mailOptions);
      res.json({ status: "success" });
    } catch (err) {
      console.error(err);
      res.json({ status: "error", message: "Internal Server Error" });
    }
  };
}

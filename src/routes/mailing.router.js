import { Router } from "express";
import mailController from "../controllers/mail.controller.js";

const router = Router();

router.post("/purchasemail", mailController.sendMail);

export default router;

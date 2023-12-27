import { Router } from "express";
import sessionsController from "../controllers/sessions.controller.js";

const router = Router();

router.post("/register", sessionsController.register);

router.post("/login", sessionsController.login);

router.get("/github", sessionsController.github);

router.get("/githubcallback", sessionsController.githubCallback);

router.post("/forgotpassword", sessionsController.forgotPassword);

router.get("/resetpassword/:token", sessionsController.resetPasswordToken);

router.post("/resetpassword", sessionsController.resetPassword);

export default router;

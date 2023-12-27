import { Router } from "express";
import viewsController from "../controllers/view.controller.js";

const router = Router();

router.get("/products", viewsController.getProducts);

router.get("/carts/:cid", viewsController.getCartById);

router.get("/login", viewsController.login);

router.get("/register", viewsController.register);

router.get("/profile", viewsController.profile);

router.get("/logout", viewsController.logout);

router.get("/", viewsController.home);

router.get("/publish", viewsController.publish);

router.get("/admin", viewsController.adminPanel);

router.get("/forgotpassword", viewsController.forgotPassword);

router.get("/resetpassword", viewsController.resetPassword);

router.get("/upload", viewsController.upload);

export default router;

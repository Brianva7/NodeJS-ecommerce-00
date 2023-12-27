import usersController from "../controllers/user.controller.js";
import {
  checkUserAuthenticatedView,
  checkRoles,
  loadUser,
  checkDocuments,
} from "../middlewares/auth.middleware.js";
import { uploader } from "../middlewares/multer.middleware.js";
import { Router } from "express";

const router = Router();

router.get(
  "/",
  checkUserAuthenticatedView,
  checkRoles(["admin"]),
  usersController.getUsers
);

router.get(
  "/:uid",
  checkUserAuthenticatedView,
  checkRoles(["admin"]),
  usersController.getUserById
);

router.post(
  "/",
  checkUserAuthenticatedView,
  checkRoles(["admin"]),
  usersController.createUser
);

router.delete(
  "/:uid",
  checkUserAuthenticatedView,
  checkRoles(["admin"]),
  usersController.deleteUser
);

router.put(
  "/premium/:uid",
  checkUserAuthenticatedView,
  loadUser,
  checkDocuments,

  usersController.upgradeDegradeUser
);

router.post(
  "/upload/:uid/documents",
  uploader.single("file"),
  usersController.uploadDocuments
);

router.delete(
  "/inactive/delete",
  checkUserAuthenticatedView,
  checkRoles(["admin"]),
  usersController.deleteInactiveUsers
);

export default router;

import cartController from "../controllers/cart.controller.js";
import {
  checkUserAuthenticatedView,
  checkRoles,
  apidocsTestAuth,
  checkBuyer,
  loadProduct,
} from "../middlewares/auth.middleware.js";
import { Router } from "express";

const router = Router();

router.get(
  "/",
  apidocsTestAuth,
  checkUserAuthenticatedView,
  checkRoles(["admin"]),
  cartController.getCarts
);

router.post("/", cartController.createCart);

router.get(
  "/:cid",
  apidocsTestAuth,
  checkUserAuthenticatedView,
  checkRoles(["user", "premium", "admin"]),
  cartController.getCartById
);

router.put("/:cid", cartController.emptyCart);

router.delete(
  "/:cid",
  apidocsTestAuth,
  checkUserAuthenticatedView,
  checkRoles(["admin"]),
  cartController.deleteCart
);

router.put(
  "/:cid/products/:pid",
  apidocsTestAuth,
  checkUserAuthenticatedView,
  checkRoles(["premium", "user"]),
  loadProduct,
  checkBuyer,
  cartController.addProductToCart
);

router.delete(
  "/:cid/products/:pid",
  apidocsTestAuth,
  checkUserAuthenticatedView,
  checkRoles(["admin", "premium", "user"]),
  cartController.deleteCartProduct
);

router.post("/:cid/purchase", cartController.purchaseCart);

export default router;

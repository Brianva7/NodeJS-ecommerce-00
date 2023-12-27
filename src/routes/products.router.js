import productsController from "../controllers/product.controller.js";
import {
  checkUserAuthenticatedView,
  checkRoles,
  loadProduct,
  checkOwner,
  apidocsTestAuth,
} from "../middlewares/auth.middleware.js";
import { Router } from "express";

const router = Router();

router.get("/", productsController.getProducts);

router.get("/:pid", productsController.getProductById);

router.post(
  "/",
  apidocsTestAuth,
  checkUserAuthenticatedView,
  checkRoles(["admin", "premium"]),
  productsController.createProduct
);

router.put(
  "/:pid",
  apidocsTestAuth,
  checkUserAuthenticatedView,
  checkRoles(["admin", "premium"]),
  loadProduct,
  checkOwner,
  productsController.updateProduct
);

router.delete(
  "/:pid",
  apidocsTestAuth,
  checkUserAuthenticatedView,
  checkRoles(["admin", "premium"]),
  loadProduct,
  checkOwner,
  productsController.deleteProduct
);

export default router;

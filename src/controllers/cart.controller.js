import cartsServices from "../services/carts.service.js";
import { CustomError } from "../services/errors/customError.js";
import { EErrors } from "../services/errors/enums.js";

export default class cartsController {
  static getCarts = async (req, res) => {
    try {
      const carts = await cartsServices.getCarts();
      res.json({ status: "success", payload: carts });
    } catch (err) {
      console.error(err);
      res.json({ status: "error", message: "Internal Server Error" });
    }
  };

  static getCartById = async (req, res) => {
    const { cid } = req.params;

    if (!cid) {
      CustomError.createError({
        name: "Missing params",
        message: "Missing cart ID",
        code: EErrors.INTERNAL_SERVER_ERROR,
      });
      return;
    }

    try {
      const cart = await cartsServices.getCartById(cid);

      if (!cart) {
        CustomError.createError({
          name: "Cart not found",
          message: `Cart with ID: ${cid} not found`,
          code: EErrors.NOT_FOUND,
        });
      }

      res.json({ status: "success", payload: cart });
    } catch (err) {
      console.log(err);
      res.status(err.code).json({ status: "error", message: err.message });
    }
  };

  static createCart = async (req, res) => {
    try {
      const newCart = await cartsServices.createCart();
      res.json({ status: "success", payload: newCart });
    } catch (err) {
      console.error(err);
      res.json({ status: "error", message: "Internal Server Error" });
    }
  };

  static addProductToCart = async (req, res) => {
    const { cid, pid } = req.params;

    if (!cid || !pid) {
      CustomError.createError({
        name: "Missing params",
        message: "Missing cart ID or product ID",
        code: EErrors.INTERNAL_SERVER_ERROR,
      });
      return;
    }

    try {
      const updatedCart = await cartsServices.addProductToCart(cid, pid);

      if (!updatedCart) {
        CustomError.createError({
          name: "Cart not found",
          message: `Cart with ID: ${cid} not found`,
          code: EErrors.NOT_FOUND,
        });
        return;
      }

      res.json({ status: "success", payload: updatedCart });
    } catch (err) {
      console.error(err);
      res.status(err.code).json({ status: "error", message: err.message });
    }
  };

  static deleteCartProduct = async (req, res) => {
    const { cid, pid } = req.params;

    if (!cid || !pid) {
      CustomError.createError({
        name: "Missing params",
        message: "Missing cart ID or product ID",
        code: EErrors.INTERNAL_SERVER_ERROR,
      });
      return;
    }

    try {
      const deletedCart = await cartsServices.deleteCartProduct(cid, pid);

      if (!deletedCart) {
        CustomError.createError({
          name: "Cart not found",
          message: `Cart with ID: ${cid} not found`,
          code: EErrors.NOT_FOUND,
        });
        return;
      }

      res.json({ status: "success", payload: deletedCart });
    } catch (err) {
      console.error(err);
      res.status(err.code).json({ status: "error", message: err.message });
    }
  };

  static emptyCart = async (req, res) => {
    const { cid } = req.params;

    if (!cid) {
      CustomError.createError({
        name: "Missing params",
        message: "Missing cart ID",
        code: EErrors.INTERNAL_SERVER_ERROR,
      });
      return;
    }

    try {
      const deletedCart = await cartsServices.emptyCart(cid);

      if (!deletedCart) {
        CustomError.createError({
          name: "Cart not found",
          message: `Cart with ID: ${cid} not found`,
          code: EErrors.NOT_FOUND,
        });
        return;
      }

      res.json({ status: "success", payload: deletedCart });
    } catch (err) {
      console.error(err);
      res.status(err.code).json({ status: "error", message: err.message });
    }
  };

  static deleteCart = async (req, res) => {
    const { cid } = req.params;
    if (!cid) {
      CustomError.createError({
        name: "Missing params",
        message: "Missing cart ID",
        code: EErrors.INTERNAL_SERVER_ERROR,
      });
      return;
    }

    try {
      const deletedCart = await cartsServices.deleteCart(cid);

      if (!deletedCart) {
        CustomError.createError({
          name: "Cart not found",
          message: `Cart with ID: ${cid} not found`,
          code: EErrors.NOT_FOUND,
        });
        return;
      }

      res.json({ status: "success", payload: deletedCart });
    } catch (err) {
      console.error(err);
      res.status(err.code).json({ status: "error", message: err.message });
    }
  };

  static purchaseCart = async (req, res) => {
    const { cid } = req.params;
    const email = req.session.user.email;

    if (!cid || !email) {
      CustomError.createError({
        name: "Missing params",
        message: "Missing cart ID",
        code: EErrors.INTERNAL_SERVER_ERROR,
      });
      return;
    }

    try {
      const purchasedCart = await cartsServices.purchaseCart(cid, email);

      if (!purchasedCart) {
        CustomError.createError({
          name: "Cart not found",
          message: `Cart with ID: ${cid} not found`,
          code: EErrors.NOT_FOUND,
        });
        return;
      }

      res.json({ status: "success", payload: purchasedCart });
    } catch (err) {
      console.error(err);
      res.status(err.code).json({ status: "error", message: err.message });
    }
  };
}

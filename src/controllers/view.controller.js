import cartsServices from "../services/carts.service.js";
import productsServices from "../services/products.service.js";
import usersServices from "../services/users.service.js";
import { getUserDto } from "../DAO/dto/user.dto.js";

export default class viewsController {
  static getProducts = async (req, res) => {
    try {
      let user = req.session.user;

      let newCartId = user.cart[0]._id.toString();

      user.cartLink = newCartId;

      let products = await productsServices.getProducts();

      let result = {};

      if (user.role == "admin") {
        result.isAdmin = true;
      }

      products.isValid = true;

      if (!products) {
        products.isValid = false;
      }

      if (products.hasNextPage && products.hasPreviousPage) {
        products.nextLink = `/products?page=${products.nextPage}`;
        products.previousLink = `/products?page=${products.previousPage}`;
      } else if (products.hasNextPage) {
        products.nextLink = `/products?page=${products.nextPage}`;
      } else if (products.hasPreviousPage) {
        products.previousLink = `/products?page=${products.previousPage}`;
      }

      result.products = products;

      result.user = user;

      res.render("products", result);
    } catch (error) {
      res.render("products", { error });
    }
  };

  static getCartById = async (req, res) => {
    let { cid } = req.params;
    let user = req.session.user;
    try {
      let result = await cartsServices.getCartById(cid);
      result.user = user;
      res.render("cart", result);
    } catch (error) {
      res.render("products", { error });
    }
  };

  static login = async (req, res) => {
    let error = req.session.error;
    if (req.session.user) {
      res.redirect("/products");
    } else {
      req.session.error = false;
      res.render("login", { error });
    }
  };

  static register = async (req, res) => {
    let error = req.session.error;
    if (req.session.user) {
      res.redirect("/profile");
    } else {
      req.session.error = false;
      res.render("register", { error });
    }
  };

  static profile = async (req, res) => {
    if (!req.session.user) {
      res.render("login");
    } else {
      let user = req.session.user;
      let isAdmin = user.role === "admin";

      res.render("profile", { user, isAdmin });
    }
  };

  static logout = async (req, res) => {
    await usersServices.updateLastConnection(req.session.user.id);
    req.session.destroy();
    res.redirect("/login");
  };

  static home = async (req, res) => {
    if (!req.session.user) {
      res.redirect("/login");
    } else {
      res.redirect("/products");
    }
  };

  static publish = async (req, res) => {
    if (!req.session.user) {
      res.redirect("/login");
    } else {
      res.render("publish");
    }
  };

  static adminPanel = async (req, res) => {
    if (!req.session.user) {
      res.redirect("/login");
    } else {
      let user = req.session.user;
      let users = await usersServices.getUsers();
      let products = await productsServices.getProducts();

      let result = {};

      result.user = user;
      result.users = users;
      result.products = products;

      res.render("admin", result);
    }
  };

  static forgotPassword = async (req, res) => {
    if (!req.session.user) {
      res.render("forgotpassword");
    } else {
      let user = req.session.user;
      res.render("forgotpassword", user);
    }
  };

  static resetPassword = async (req, res) => {
    if (!req.session.uid) {
      res.render("login");
    } else {
      let user = req.session.user;
      res.render("resetpassword", user);
    }
  };

  static upload = async (req, res) => {
    if (!req.session.user) {
      res.redirect("/login");
    } else {
      const user = req.session.user;
      res.render("upload", { user });
    }
  };
}

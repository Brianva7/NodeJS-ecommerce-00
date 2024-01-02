import productsService from "../services/products.service.js";
import usersService from "../services/users.service.js";

const checkUserAuthenticatedView = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.send("Not authenticated");
  }
};

const showAuthView = (req, res, next) => {
  if (req.user) {
    res.redirect("/profile");
  } else {
    next();
  }
};

const checkRoles = (role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return res.send(`Not authorized`);
    } else {
      next();
    }
  };
};

const loadProduct = async (req, res, next) => {
  try {
    const productId = req.params.pid;

    const product = await productsService.getProductById(productId);

    if (product) {
      req.product = product;
      next();
    }
  } catch (error) {
    return res.send(`Product not found`);
  }
};

const checkOwner = (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else if (req.user.email !== req.product.owner) {
    return res.send(`Not authorized`);
  } else {
    next();
  }
};

const checkBuyer = (req, res, next) => {
  if (req.user.email === req.product.owner) {
    return res.send(`Not authorized`);
  } else {
    next();
  }
};

const apidocsTestAuth = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    req.user = {
      first_name: "test",
      last_name: "test",
      age: 0,
      email: "test@test",
      role: "admin",
      cart: [],
    };
    next();
  }
};

const loadUser = async (req, res, next) => {
  try {
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if (user) {
      req.user = user;
      next();
    }
  } catch (error) {
    return res.send(`User not found`);
  }
};

const checkDocuments = (req, res, next) => {
  if (req.user.documents.length > 0) {
    next();
  } else {
    res.json({ status: "error", message: "Documents not found" });
  }
};

export {
  checkUserAuthenticatedView,
  showAuthView,
  checkRoles,
  loadProduct,
  checkOwner,
  checkBuyer,
  apidocsTestAuth,
  checkDocuments,
  loadUser,
};

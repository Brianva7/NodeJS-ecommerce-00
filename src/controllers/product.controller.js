import productsServices from "../services/products.service.js";

export default class productsController {
  static getProducts = async (req, res) => {
    try {
      const products = await productsServices.getProducts();
      res.json({ status: "success", payload: products });
    } catch (err) {
      console.error(err);
      res.json({ status: "error", message: "Internal Server Error" });
    }
  };

  static getProductById = async (req, res) => {
    try {
      const { pid } = req.params;
      const product = await productsServices.getProductById(pid);
      res.json({ status: "success", payload: product });
    } catch (err) {
      console.error(err);
      res.json({ status: "error", message: "Internal Server Error" });
    }
  };

  static createProduct = async (req, res) => {
    try {
      const { name, category, price, stock, image } = req.body;

      const prodOwner = req.user.email;

      const prodData = {
        name,
        category,
        price: parseInt(price),
        stock: parseInt(stock),
        image,
        owner: prodOwner,
      };

      await productsServices.createProduct(prodData);

      res.redirect("/publish");
    } catch (err) {
      console.error(err);
      res.json({ status: "error", message: "Internal Server Error" });
    }
  };

  static updateProduct = async (req, res) => {
    try {
      const { pid } = req.params;
      const updatedProduct = await productsServices.updateProduct(
        pid,
        req.body
      );
      res.json({ status: "success", payload: updatedProduct });
    } catch (err) {
      console.error(err);
      res.json({ status: "error", message: "Internal Server Error" });
    }
  };

  static deleteProduct = async (req, res) => {
    try {
      const { pid } = req.params;
      const deletedProduct = await productsServices.deleteProduct(pid);
      res.json({ status: "success", payload: deletedProduct });
    } catch (err) {
      console.error(err);
      res.json({ status: "error", message: "Internal Server Error" });
    }
  };
}

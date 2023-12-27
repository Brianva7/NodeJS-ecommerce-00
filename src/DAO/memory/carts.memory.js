import fs from "fs";

export default class cartMemory {
  constructor() {
    this.products = "../files/carts.json";
    this.carts = "../files/carts.json";
  }

  getProducts = async () => {
    try {
      if (!fs.existsSync(this.products)) {
        return "There are no files";
      } else {
        let data = await fs.promises.readFile(this.products, "utf-8");
        let files = JSON.parse(data);
        return files;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  getCarts = async () => {
    try {
      if (!fs.existsSync(this.carts)) {
        return "There are no files";
      } else {
        let data = await fs.promises.readFile(this.carts, "utf-8");
        let files = JSON.parse(data);
        return files;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  getCartById = async (id) => {
    try {
      if (!fs.existsSync(this.carts)) {
        return "There are no files";
      } else {
        let data = await fs.promises.readFile(this.carts, "utf-8");
        let files = JSON.parse(data);
        let file = files.find((f) => f.id === id);
        if (!file) {
          return "File does not exist";
        } else {
          return file;
        }
      }
    } catch (err) {
      return err;
    }
  };

  createCart = async (cart) => {
    try {
      if (!fs.existsSync(this.carts)) {
        fs.writeFileSync(this.carts, JSON.stringify([], null, 2));
      }

      let data = fs.readFileSync(this.carts, "utf-8");
      let files = JSON.parse(data);

      if (files.length === 0) {
        cart.id = 1;
        cart.products = [];
      } else {
        const maxId = Math.max(...files.map((f) => f.id));
        cart.id = maxId + 1;
        cart.products = [];
      }

      files.push(cart);
      fs.writeFileSync(this.file, JSON.stringify(files, null, 2));
      return cart;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  addProductToCart = async (cid, pid) => {
    try {
      const cartsData = await fs.promises.readFile(this.carts, "utf-8");
      if (!cartsData) {
        return "Cart not found";
      }
      const productsData = await fs.promises.readFile(this.products, "utf-8");
      if (!productsData) {
        return "Product not found";
      }
      const carts = JSON.parse(cartsData);
      const products = JSON.parse(productsData);
      const cart = carts.find((c) => c.id === cid);
      const product = products.find((p) => p.id === pid);

      if (cart.products.find((p) => p.id === product.id)) {
        product.quantity++;
      } else {
        cart.products.push({ id: product.id, quantity: 1 });
      }

      const updatedCart = {
        ...cart,
        products: [...cart.products, product],
      };

      const updatedCarts = carts.map((c) => (c.id === cid ? updatedCart : c));

      fs.writeFileSync(this.carts, JSON.stringify(updatedCarts, null, 2));
      return updatedCarts;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  deleteCartProduct = async (cid, pid) => {
    try {
      const cartsData = await fs.promises.readFile(this.carts, "utf-8");
      if (!cartsData) {
        return "Cart not found";
      }

      const carts = JSON.parse(cartsData);
      const cart = carts.find((c) => c.id === cid);

      const updatedCart = {
        ...cart,
        products: cart.products.filter((p) => p.id !== pid),
      };

      const updatedCarts = carts.map((c) => (c.id === cid ? updatedCart : c));

      fs.writeFileSync(this.carts, JSON.stringify(updatedCarts, null, 2));
      return updatedCarts;
    } catch (error) {
      console.log(error);
      return error;
    }
  };
}

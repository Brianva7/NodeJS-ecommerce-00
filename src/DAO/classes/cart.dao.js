import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";
import ticketModel from "../models/ticket.model.js";
import userModel from "../models/user.model.js";
import crypto from "crypto";

export class cartDao {
  constructor() {
    this.model = cartModel;
  }
  async getCarts() {
    try {
      const carts = await this.model.paginate({}, { lean: true });
      return carts;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getCartById(cid) {
    try {
      const cart = await this.model.findOne({ _id: cid }).lean({ lean: true });
      return cart;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async createCart() {
    try {
      const newCart = await this.model.create({ products: [] });
      return newCart;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async addProductToCart(cid, pid) {
    try {
      const cart = await this.model.findById(cid);

      if (cart.products.find((p) => p.product._id.toString() == pid)) {
        cart.products.find((p) => p.product._id == pid).quantity++;
      } else {
        cart.products.push({ product: pid, quantity: 1 });
      }

      await cart.save();
      return cart;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async addProductToCart(cid, pid) {
    try {
      const cart = await this.model.findById(cid);

      cart.products.push({ product: pid, quantity: 1 });

      await cart.save();
      return cart;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteCartProduct(cid, pid) {
    try {
      const cart = await this.model.findById(cid);

      const productToDelete = cart.products.find(
        (p) => p.product._id.toString() == pid
      );

      if (productToDelete) {
        if (productToDelete.quantity > 1) {
          productToDelete.quantity--;
        } else {
          cart.products = cart.products.filter(
            (p) => p.product._id.toString() != pid
          );
        }
      }

      await cart.save();
      return cart;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteCart(cid) {
    try {
      const deletedCart = await this.model.deleteOne({ _id: cid });
      return deletedCart;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async emptyCart(cid) {
    try {
      const emptyCart = await this.model.updateOne(
        { _id: cid },
        { $set: { products: [] } }
      );
      return emptyCart;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async purchaseCart(cid, email) {
    try {
      const cart = await this.model.findById(cid);
      if (!cart) {
        return { status: "error", message: "Cart not found" };
      }

      if (cart.products.length === 0) {
        return { status: "error", message: "Cart is empty" };
      }

      const stockPromises = cart.products.map(async (product) => {
        const dbProduct = await productModel.findById(product.product);

        return {
          product: dbProduct._id,
          quantityInCart: product.quantity,
          availableStock: dbProduct.stock,
        };
      });

      const stockInfo = await Promise.all(stockPromises);

      const insufficientStockProduct = stockInfo.find(
        (product) => product.quantityInCart > product.availableStock
      );

      if (insufficientStockProduct) {
        return {
          status: "error",
          message: `Insufficient stock for product with ID ${insufficientStockProduct.product}`,
          insufficientStockProduct,
        };
      }

      const user = await userModel.findOne({ email });

      const purchase_datetime = new Date();
      const code = crypto.randomUUID();
      const prodQuantity = cart.products.reduce(
        (total, product) => total + product.quantity,
        0
      );
      const totalPrice = cart.products.reduce(
        (total, product) => total + product.quantity * product.product.price,
        0
      );

      const amount = {
        quantity: prodQuantity,
        total: totalPrice,
      };

      for (let i = 0; i < stockInfo.length; i++) {
        const product = stockInfo[i];
        const productDB = await productModel.findById(product.product);

        if (productDB.stock < product.quantityInCart) {
          return {
            status: "error",
            message: `Insufficient stock for product with ID ${product.product}`,
          };
        }

        const comparison = productDB.stock - product.quantityInCart;
        productDB.stock = comparison;
        await productModel.findByIdAndUpdate(product.product, {
          stock: comparison,
        });
      }

      const ticketData = {
        code,
        purchase_datetime,
        amount,
        purchaser: user.email,
      };

      const newTicket = await ticketModel.create(ticketData);

      console.log(newTicket);

      return {
        status: "success",
        message: "Purchase successful",
        ticket: newTicket,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

import productModel from "../models/product.model.js";

export class productDao {
  constructor() {
    this.model = productModel;
  }
  async getProducts() {
    try {
      const products = await this.model.paginate({}, { lean: true });
      return products;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getProductById(pid) {
    try {
      const product = await this.model.findById(pid);
      return product;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async createProduct(product) {
    try {
      const newProduct = await this.model.create(product);
      return newProduct;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteProduct(pid) {
    try {
      const deletedProduct = await this.model.findByIdAndDelete(pid);
      return deletedProduct;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateProduct(pid, product) {
    try {
      const updatedProduct = await this.model.findByIdAndUpdate(pid, product);
      return updatedProduct;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

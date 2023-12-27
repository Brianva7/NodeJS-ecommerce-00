import productsServices from "../services/products.service.js";
import Assert from "assert";

const { connectDB } = await import("../config/db.config.js");
const assert = Assert.strict;

connectDB();

describe("Testing products", () => {
  it("should get product by id", async () => {
    const productsData = await productsServices.getProducts();
    const products = productsData.docs;

    const product = await productsServices.getProductById(
      products[products.length - 1]._id
    );

    assert(product);
  }).timeout(5000);

  it("should create product", async () => {
    const product = await productsServices.createProduct({
      name: "test",
      description: "test",
      price: 1,
      stock: 1,
    });
    assert(product);
  });

  it("should delete product", async () => {
    const productsData = await productsServices.getProducts();
    const products = productsData.docs;

    const product = await productsServices.deleteProduct(
      products[products.length - 1]._id
    );

    assert(product);
  });
});

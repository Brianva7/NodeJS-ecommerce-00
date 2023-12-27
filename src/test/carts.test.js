import cartsServices from "../services/carts.service.js";
import Assert from "assert";

const { connectDB } = await import("../config/db.config.js");
const assert = Assert.strict;

connectDB();

describe("Testing carts", () => {
  it("should get cart by id", async () => {
    const cartsData = await cartsServices.getCarts();
    const carts = cartsData.docs;

    const cart = await cartsServices.getCartById(carts[carts.length - 1]._id);

    assert(cart);
  }).timeout(5000);

  it("should create cart", async () => {
    const cart = await cartsServices.createCart();

    assert(cart);
  });

  it("should delete cart", async () => {
    const cartsData = await cartsServices.getCarts();
    const carts = cartsData.docs;

    const cart = await cartsServices.deleteCart(carts[carts.length - 1]._id);

    assert(cart);
  });
});

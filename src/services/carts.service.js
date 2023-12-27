import { cartsDao } from "../DAO/factory.js";

async function getCarts() {
  return cartsDao.getCarts();
}

async function createCart() {
  return cartsDao.createCart();
}

async function getCartById(cid) {
  return cartsDao.getCartById(cid);
}

async function addProductToCart(cid, pid) {
  return cartsDao.addProductToCart(cid, pid);
}

async function deleteCartProduct(cid, pid) {
  return cartsDao.deleteCartProduct(cid, pid);
}

async function emptyCart(cid) {
  return cartsDao.emptyCart(cid);
}

async function deleteCart(cid) {
  return cartsDao.deleteCart(cid);
}

async function purchaseCart(cid, email) {
  return cartsDao.purchaseCart(cid, email);
}

export default {
  getCarts,
  createCart,
  getCartById,
  addProductToCart,
  deleteCartProduct,
  emptyCart,
  deleteCart,
  purchaseCart,
};

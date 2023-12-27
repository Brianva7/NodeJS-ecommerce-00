import { faker } from "@faker-js/faker";
import crypto from "crypto";

const { commerce, image } = faker;

const generateProduct = () => {
  return {
    id: crypto.randomUUID(),
    name: commerce.productName(),
    price: commerce.price({ symbol: "$" }),
    stock: Math.floor(Math.random() * 100) + 1,
    image: image.urlPicsumPhotos(),
  };
};

export const totalProducts = () => {
  const numberOfProducts = 100;
  let products = [];
  for (let i = 0; i < numberOfProducts; i++) {
    const nexProduct = generateProduct();
    products.push(nexProduct);
  }
  return products;
};

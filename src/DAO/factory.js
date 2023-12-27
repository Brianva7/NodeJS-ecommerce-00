import dotenvConfig from "../config/dotenv.config.js";

let productsDao;
let cartsDao;
let usersDao;

const PERSISTENCE = dotenvConfig.persistence;

switch (PERSISTENCE) {
  case "mongo":
    const { connectDB } = await import("../config/db.config.js");
    connectDB();
    const { cartDao } = await import("./classes/cart.dao.js");
    const { productDao } = await import("./classes/product.dao.js");
    const { userDao } = await import("./classes/user.dao.js");

    cartsDao = new cartDao();
    productsDao = new productDao();
    usersDao = new userDao();

    break;

  case "memory":
    const { cartMemory } = await import("./memory/carts.memory.js");
    const { productMemory } = await import("./memory/products.memory.js");
    cartsDao = new cartMemory();
    productsDao = new productMemory();
    break;
}

export { productsDao, cartsDao, usersDao };

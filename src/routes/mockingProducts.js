import { Router } from "express";
import { totalProducts } from "../faker.js";

const router = Router();

router.get("/", (req, res) => {
  let products = totalProducts();

  res.send(products);
});

export default router;

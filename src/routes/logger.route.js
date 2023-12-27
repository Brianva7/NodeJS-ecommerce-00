import express from "express";
import { logger } from "../middlewares/logger.middleware.js";
const router = express.Router();

router.get("/", (req, res) => {
  logger.error("¡Algo salió mal!");
  res.send("¡Error!");
});

router.get("/loggertest", (req, res) => {
  logger.debug("debug ");
  logger.http("http");
  logger.info("info");
  logger.warn("warn");
  logger.error("error");
  logger.fatal("fatal");

  res.send("Logs created, check console.");
});

export default router;

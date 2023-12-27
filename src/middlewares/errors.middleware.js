import { EErrors } from "../services/errors/enums.js";

export const errorHandler = (error, req, res, next) => {
  switch (error.code) {
    case EErrors.NOT_FOUND:
      res.json({ status: "Error", message: error.message, cause: error.cause });
      break;

    case EErrors.INTERNAL_SERVER_ERROR:
      res.json({ status: "Error", message: error.message, cause: error.cause });
      break;

    default:
      break;
  }
};

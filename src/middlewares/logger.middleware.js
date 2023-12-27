import winston from "winston";
import { createLogger, format, transports } from "winston";
import dotenv from "dotenv";

dotenv.config();

const customLevelsOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: "white",
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "blue",
  },
};

// dev logger
const devLogger = createLogger({
  levels: customLevelsOptions.levels,
  transports: [
    new transports.Console({
      level: "debug",
      format: format.combine(
        format.colorize({ colors: customLevelsOptions.colors }),
        format.simple({ prettyPrint: true })
      ),
    }),
  ],
});

// prod logger
const prodLogger = createLogger({
  levels: customLevelsOptions.levels,
  transports: [
    new transports.Console({
      level: "info",
      format: format.combine(
        format.colorize({ colors: customLevelsOptions.colors }),
        format.simple()
      ),
    }),
    new transports.File({
      level: "error",
      filename: "errors.log",
      format: format.simple(),
    }),
  ],
});

let logger;

if (process.env.NODE_ENV === `production`) {
  logger = prodLogger;
} else {
  logger = devLogger;
}

const loggerMiddleware = (req, res, next) => {
  next();
};

export { loggerMiddleware, logger };

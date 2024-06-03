import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import handlebars from "express-handlebars";
import bodyParser from "body-parser";
import passport from "passport";
import cors from "cors";
import path from "path";
import initializePassport from "./config/passport.config.js";
import { __dirname } from "./utils.js";
import viewsRouter from "./routes/views.router.js";
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/carts.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import usersRouter from "./routes/users.router.js";
import mailingRouter from "./routes/mailing.router.js";
import mockingProductsRouter from "./routes/mockingProducts.js";
import loggerRouter from "./routes/logger.route.js";
import dotnvConfig from "./config/dotenv.config.js";
import { loggerMiddleware } from "./middlewares/logger.middleware.js";
import { errorHandler } from "./middlewares/errors.middleware.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
import { swaggerOptions } from "./config/swagger.config.js";

const specs = swaggerJSDoc(swaggerOptions);
const port = dotnvConfig.port || 3000;
const app = express();

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "handlebars");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
app.use(cors());

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: dotnvConfig.mogoUrl,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      ttl: 10000,
    }),
    secret: dotnvConfig.secret,
    resave: false,
    saveUninitialized: true,
  })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use(loggerMiddleware);
app.use("/", viewsRouter);
app.use("/api/carts", cartRouter);
app.use("/api/products", productRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/users", usersRouter);
app.use("/api/mail", mailingRouter);
app.use("/api/mockingproducts", mockingProductsRouter);
app.use("/api/logger", loggerRouter);
app.use(errorHandler);
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

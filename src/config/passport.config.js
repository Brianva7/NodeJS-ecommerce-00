import passport from "passport";
import local from "passport-local";
import GitHubStrategy from "passport-github2";
import userModel from "../DAO/models/user.model.js";
import cartModel from "../DAO/models/cart.model.js";
import { createHash, isValidatePassword } from "../utils.js";
import dotenvConfig from "./dotenv.config.js";

const LocalStrategy = local.Strategy;
const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        let { first_name, last_name, email, age } = req.body;
        try {
          let user = await userModel.findOne({ email: username });
          if (user) {
            req.session.error = true;
            return done(null, false);
          }

          let newEmptyCart = {
            products: [],
          };
          let newCart = await cartModel.create(newEmptyCart);
          if (!newCart) {
            return done(null, false);
          }

          const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
            cart: newCart,
            role: "user",
          };
          let result = await userModel.create(newUser);
          return done(null, result);
        } catch (error) {
          console.log(error);
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await userModel.findById(id);
    done(null, user);
  });

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await userModel.findOne({
            email: username,
          });
          if (!user) {
            console.log("Invalid email");
            return done(null, false);
          }
          if (!isValidatePassword(user, password)) {
            console.log("Invalid password");
            return done(null, false);
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: dotenvConfig.clientID,
        clientSecret: dotenvConfig.clientSecret,
        callbackURL: `http://localhost:8080/api/sessions/githubcallback`,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await userModel.findOne({ email: profile._json.email });
          if (!user) {
            let newUser = {
              first_name: profile._json.name,
              last_name: "GithubLink",
              age: 30,
              email: profile._json.email,
              password: "123456",
              role: "user",
            };
            let newCart = await cartModel.create({});
            if (!newCart) {
              return done(null, false);
            }
            newUser.cart = newCart;
            let result = await userModel.create(newUser);
            done(null, result);
          } else {
            done(null, user);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

export default initializePassport;

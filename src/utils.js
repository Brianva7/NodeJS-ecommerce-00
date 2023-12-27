import bcrypt from "bcrypt";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export { __dirname };

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidatePassword = (user, password) =>
  bcrypt.compareSync(password, user.password);

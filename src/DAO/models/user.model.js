import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const usersCollection = "users";

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  age: Number,
  password: String,
  role: String || "User",
  last_connection: Date || null,
  cart: {
    type: [
      {
        cart: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "carts",
        },
      },
    ],
    default: [],
  },
  documents: [Object] || [],
});

userSchema.pre("find", function () {
  this.populate("cart");
});

userSchema.pre("findOne", function () {
  this.populate("cart");
});

userSchema.plugin(mongoosePaginate);

const userModel = mongoose.model(usersCollection, userSchema);

export default userModel;

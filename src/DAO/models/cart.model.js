import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const cartsCollection = "carts";

const cartSchema = new mongoose.Schema({
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: Number,
      },
    ],
    default: [],
  },
});

cartSchema.pre("findOne", function () {
  this.populate("products.product");
});

cartSchema.pre("find", function () {
  this.populate("products.product");
});

cartSchema.plugin(mongoosePaginate);

const cartModel = mongoose.model(cartsCollection, cartSchema);

export default cartModel;

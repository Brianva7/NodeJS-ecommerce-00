import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const productsCollection = "products";

const productSchema = new mongoose.Schema({
  name: { type: String, index: true },
  category: String,
  price: Number,
  stock: Number,
  image: String,
  owner: String,
});

productSchema.plugin(mongoosePaginate);

const productModel = mongoose.model(productsCollection, productSchema);

export default productModel;

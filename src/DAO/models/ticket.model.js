import mongoose from "mongoose";
const ticketCollection = "tickets";

const ticketSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  code: String,
  purchase_datetime: Date,
  amount: [],
  purchaser: String,
});

const ticketModel = mongoose.model(ticketCollection, ticketSchema);

export default ticketModel;

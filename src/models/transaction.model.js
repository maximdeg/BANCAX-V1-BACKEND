import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "The transaction has to have a user."],
  },
  amount: {
    type: Number,
    required: [true, "The transaction has to have an amount."],
    // min: [0, "The amount has to be greater than 0.00"],
  },
  source: {
    type: mongoose.Schema.Types.String,
    ref: "Source",
    required: [true, "The transaction has to have a source."],
  },
  category: {
    type: mongoose.Schema.Types.String,
    ref: "Category",
    required: [true, "The transaction has to have a category."],
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  is_active: {
    type: Boolean,
    default: true,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;

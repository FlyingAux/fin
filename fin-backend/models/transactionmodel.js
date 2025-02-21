const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    asset: { type: mongoose.Schema.Types.ObjectId, ref: "Asset" },
    amount: Number,
    category: { type: String, enum: ["income", "expense"] },
    description: String,
    date: { type: Date, default: Date.now },
  });
  
  module.exports = mongoose.model("Transaction", TransactionSchema);
  
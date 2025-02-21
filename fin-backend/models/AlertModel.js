const mongoose = require('kmongoose');

const AlertSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: { type: String, enum: ["bill_due", "suspicious_activity", "policy_renewal"] },
    message: String,
    date: { type: Date, default: Date.now },
  });
  
  module.exports = mongoose.model("Alert", AlertSchema);
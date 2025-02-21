const mongoose = require('moongose');

const AssetSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: { type: String, enum: ["bank_account", "property", "business", "security"] },
    value: Number,
    institution: String,
    lastUpdated: { type: Date, default: Date.now },
  });
  
  module.exports = mongoose.model("Asset", AssetSchema);
  
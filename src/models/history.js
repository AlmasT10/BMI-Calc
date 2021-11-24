const mongoose = require("mongoose");

const historySchema = mongoose.Schema({
  name: String,
  bmiHistory: [{ bmi: Number, message: String }],
});

exports.History = mongoose.model("History", historySchema);
exports.historySchema = historySchema;

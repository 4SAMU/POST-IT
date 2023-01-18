/** @format */

const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  contentType: { type: String },
  data: { type: Buffer },
});

module.exports = mongoose.model("File", fileSchema);

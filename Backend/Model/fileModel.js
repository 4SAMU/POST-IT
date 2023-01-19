/** @format */

const mongoose = require("mongoose");

const File = new mongoose.Schema({
  contentType: { type: String },
  data: { type: Buffer },
});

module.exports = mongoose.model("File", File);

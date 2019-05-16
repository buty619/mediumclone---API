const mongoose = require("mongoose");

var storieSchema = mongoose.Schema({
  title: String,
  firstP: String,
  text: String,
  img: String,
  userId: String,
  publish: Boolean
});

module.exports = mongoose.model("Storie", storieSchema);
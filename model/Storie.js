const mongoose = require("mongoose");

var storieSchema = mongoose.Schema({
  title: String,
  firstP: String,
  text: String,
  img: String
});

module.exports = mongoose.model("Storie", storieSchema);
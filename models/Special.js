const mongoose = require("mongoose");
const { v4 } = require("uuid");

const SpecialSchema = mongoose.Schema({
  uuid: { type: String, default: v4() },
  ingredientId: { type: String, default: v4() },
  type: { type: String, required: true },
  title: { type: String, required: true },
  code: { type: String, required: false },
  geo: { type: String, required: false },
  text: { type: String, required: false },
});

module.exports = mongoose.model("Special", SpecialSchema);

const mongoose = require("mongoose");
const { v4 } = require("uuid");

const IngredientSchema = mongoose.Schema({
  uuid: {
    type: String,
    default: v4(),
  },
  amount: Number,
  measurement: String,
  name: String,
});

module.exports = mongoose.model("Ingredient", IngredientSchema);

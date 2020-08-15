const mongoose = require("mongoose");
const Ingredient = require("./Ingredient");

const RecipeSchema = mongoose.Schema({
  uuid: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  isPublic: {
    type: Boolean,
    default: true,
  },
  images: {
    full: {
      type: String,
    },
    medium: {
      type: String,
    },
    small: {
      type: String,
    },
  },
  servings: {
    type: Number,
  },
  prepTime: {
    type: Number,
  },
  cookTime: {
    type: Number,
  },
  postDate: {
    type: String,
    required: true,
  },
  editDate: {
    type: String,
    default: null,
  },
  ingredients: [
    {
      uuid: { type: mongoose.Schema.Types.ObjectId, ref: Ingredient },
    },
  ],
  directions: [
    {
      instructions: String,
      optional: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

module.exports = mongoose.model("Recipe", RecipeSchema);

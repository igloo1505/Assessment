const mongoose = require("mongoose");
const Recipe = require("../models/Recipe");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: Recipe }],
  location: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipCode: {
      type: Number,
      required: true,
    },
    geo: {
      type: Object,
    },
  },
  date_created: {
    type: String,
  },
});

module.exports = mongoose.model("User", UserSchema);

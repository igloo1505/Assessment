const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Recipe = require("../models/Recipe");
const Ingredient = require("../models/Ingredient");
const { v4 } = require("uuid");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const moment = require("moment");

router.get("/details/:id", (req, res) => {
  console.log("made it to route getByID");
  return res.send(req.params.id);
});

router.get("/", (req, res) => {
  return res.send("made it to route getByAll");
});

router.post("/", async (req, res) => {
  let {
    uuid,
    title,
    description,
    submittedBy,
    isPublic,
    images: { full, medium, small },
    servings,
    prepTime,
    cookTime,
    ingredients,
    directions,
  } = req.body;
  try {
    let recipe;
    if (uuid) {
      recipe = await Recipe.findOne({ uuid });
    }
    if (!uuid) {
      uuid = uuid();
    }
    if (recipe) {
      return console.log("Recipe PUT method here");
    }
    let postDate = moment(Date.now()).format("MM/DD/YYYY hh:mm:ss A");
    let uuidDataHolder = [];
    for (var i = 0; i < ingredients.length; i++) {
      let { uuid, amount, measurement, name } = ingredients[i];
      let newIngredient;
      if (!uuid) {
        let id = v4();
        newIngredient = new Ingredient({ uuid: id, amount, measurement, name });
        await newIngredient.save();
        uuidDataHolder.push(newIngredient._id);
      } else {
        let ifIsIngredient = await Ingredient.findOne({ uuid });
        if (ifIsIngredient) {
          console.log("add PUT method here");
        } else {
          newIngredient = new Ingredient({ uuid, amount, measurement, name });
          await newIngredient.save();
          uuidDataHolder.push(newIngredient._id);
        }
      }
    }
    if (!postDate) {
      postDate = moment(Date.now()).format("MM/DD/YYYY hh:mm:ss A");
    }
    recipe = {
      uuid,
      title,
      description,
      images: { full, medium, small },
      servings,
      prepTime,
      cookTime,
      postDate,
      ingredients: uuidDataHolder,
      directions,
    };
    let newRecipe = new Recipe(recipe);
    await newRecipe.save();
    return res.json(newRecipe);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Sever error at POST recipe" });
  }
});

module.exports = router;

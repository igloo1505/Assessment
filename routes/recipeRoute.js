const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Recipe = require("../models/Recipe");
const Ingredient = require("../models/Ingredient");
const Special = require("../models/Special");
const { v4 } = require("uuid");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const moment = require("moment");

router.post("/favorites", async (req, res) => {
  console.log("body", req.body);
  try {
    let FavoritesArray = [];
    for (var i = 0; i < req.body.length; i++) {
      let f = await Recipe.findById(req.body[i]);
      FavoritesArray.push(f);
    }
    return res.json(FavoritesArray);
  } catch (error) {
    return res.status(500).json({ msg: "Error retrieving favorites" });
  }
});

router.get("/paginate/:page", async (req, res) => {
  const returnLimit = 10;
  let pageOffset = 0;
  let specialsArray = [];
  let specialsKeyCheck = {};
  if (req.params.page) {
    pageOffset = req.params.page;
  }
  let offSet = pageOffset * returnLimit;
  try {
    let recipesReturned = await Recipe.find()
      .limit(returnLimit)
      .skip(offSet)
      .populate({ path: "ingredients", model: "Ingredient" })
      .exec(async (err, docs) => {
        for (let i = 0; i < docs.length; i++) {
          for (let j = 0; j < docs[i].ingredients.length; j++) {
            let isSpecial = await Special.findOne({
              ingredientId: docs[i].ingredients[j].uuid,
            });

            if (isSpecial) {
              let id = isSpecial._id;
              if (!(id in specialsKeyCheck)) {
                specialsArray.push(isSpecial);
                specialsKeyCheck[isSpecial._id] = 1;
              }
            }
          }
        }
        return res.json({ docs, specialsArray });
      });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Server error while retrieving all recipes" });
  }
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

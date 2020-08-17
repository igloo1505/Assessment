const express = require("express");
const router = express.Router();
const config = require("config");
const connectDB = require("../config/db");
const data = require("../data.json");
const Recipe = require("../models/Recipe");
const Ingredient = require("../models/Ingredient");
const Special = require("../models/Special");

const app = express();

connectDB();
app.use(express.json({ extended: false }));
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log("Planting some seeds..."));
(seedByKey = async () => {
  //!! loop through each data type
  let keys = Object.keys(data);
  let totalSaved = {
    Ingredients: 0,
    Specials: 0,
    Recipes: 0,
  };
  for (var y = 0; y < keys.length; y++) {
    let key = keys[y];
    //!! loop through array of objects in each object.key
    for (var i = 0; i < data[key].length; i++) {
      if (key === "recipes") {
        //! Get first full model in each data type
        let ingredientUuidArray = [];
        let singleRecipe = data[key][i];
        let ifExists = await Recipe.findOne({ uuid: singleRecipe.uuid });
        if (!ifExists) {
          console.log("saving...");
          const { ingredients } = singleRecipe;
          //! loop through array of ingredients as sub-model
          for (var x = 0; x < ingredients.length; x++) {
            let newIngredient = new Ingredient(ingredients[x]);
            await newIngredient.save();
            totalSaved.Ingredients = totalSaved.Ingredients + 1;
            ingredientUuidArray.push(newIngredient._id);
          }
          singleRecipe.ingredients = ingredientUuidArray;
          let newRecipe = new Recipe(singleRecipe);
          await newRecipe.save();
          totalSaved.Recipes = totalSaved.Recipes + 1;
        }
      }
    }
    if (key === "specials") {
      for (var index = 0; index < data[key].length; index++) {
        let avoidDuplicates = await Special.findOne({
          uuid: data[key][index].uuid,
        });
        if (!avoidDuplicates) {
          console.log("saving...");
          let newSpecial = new Special(data[key][index]);
          await newSpecial.save();
          totalSaved.Specials = totalSaved.Specials + 1;
        }
      }
    }
  }
  console.log("All Done.");
  console.log(
    `\r\n\r\n Saved: \r\n       Recipes: ${totalSaved.Recipes} \r\n       Ingredients: ${totalSaved.Ingredients} \r\n       Specials: ${totalSaved.Specials} \r\n`
  );
  if (
    totalSaved.Recipes === 0 &&
    totalSaved.Ingredients === 0 &&
    totalSaved.Specials === 0
  ) {
    console.log(
      "It looks like this data has already been submitted to the database currently connected \r\n\r\n"
    );
  }
  process.exit();
})();

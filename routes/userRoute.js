const express = require("express");
const router = express.Router();
const auth = require("../utils/authorize");
const User = require("../models/User");
const Recipe = require("../models/Recipe");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const getGeo = require("../utils/getGeo.js");
const moment = require("moment");

// PUBLIC
router.post("/", async (req, res) => {
  const {
    name,
    email,
    password,
    location: { street, city, state, zipCode },
  } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (user) {
      return res.send(
        "I'm sorry. There is already an account associated with that email."
      );
    }
    let date_created = moment(Date.now()).format("MM/DD/YYYY hh:mm:ss A");
    user = new User({
      name,
      email: email.toLowerCase().trim(),
      password,
      location: { street, city, state, zipCode },
      date_created,
    });
    user.location.geo = await getGeo({ street, city, state, zipCode });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    let newUser = await user.save();

    newUser.password = "Shh this is classified";

    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      config.get("jwtSecret"),
      {
        expiresIn: 10800,
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user: newUser });
      }
    );
  } catch (error) {
    res.send("Error at POST user");
  }
});

router.put("/setFavorite", auth, async (req, res) => {
  const { method, id, userId } = req.body;
  try {
    let favoriteRecipe = await Recipe.findById(id);
    let user = await User.findByIdAndUpdate(userId);
    if (!user || !favoriteRecipe) {
      console.log("user", user, userId);
      console.log("favoriteRecipe", favoriteRecipe, id);
      return res
        .status(404)
        .json({ msg: "There was an error finding the data requested." });
    }
    let usersFavorites = user.favorites;
    console.log(usersFavorites.indexOf(favoriteRecipe._id));
    if (usersFavorites.indexOf(favoriteRecipe._id) === -1) {
      usersFavorites = [...usersFavorites, favoriteRecipe];
    } else {
      user.favorites.remove(favoriteRecipe._id);
    }
    user.favorites = usersFavorites;
    await user.save();
    res.json({ user });
  } catch (error) {
    res.status(500).json({ msg: "Server error at setFavorite" });
  }
});

router.get("/byFavorites", auth, (req, res) => {
  console.log(req.body);
  let body = req.body;
  res.json({ body });
});

module.exports = router;

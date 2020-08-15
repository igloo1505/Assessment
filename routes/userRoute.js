const express = require("express");
const router = express.Router();
const User = require("../models/User");
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

module.exports = router;

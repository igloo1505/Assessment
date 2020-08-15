const express = require("express");
const router = express.Router();
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const auth = require("../utils/authorize.js");
const User = require("../models/User.js");

// PUBLIC - get JWT and user data
router.post("/", async (req, res) => {
  let { email, password } = req.body;
  email = email.toLowerCase();
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Incorrect Password" });
    }
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
        res.json({ token, user });
      }
    );
  } catch (error) {
    res.json({ msg: "Error at authenticate user" });
  }
});

module.exports = router;

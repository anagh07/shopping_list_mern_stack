const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../../models/Users");

// @route   POST api/users
// @desc    Register new users
// @access  public
router.post("/", (req, res) => {
  const { name, email, password } = req.body;

  // Validate all fields present
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields!" });
  }

  // Checking existing user
  User.findOne({ email }).then(user => {
    if (user) return res.status(400).json({ msg: "User already exists!" });

    // Create new user obj
    const newUser = new User({
      name,
      email,
      password
    });

    // Encrypt using bcypt
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        newUser.password = hash;
        newUser.save().then(user => {
          jwt.sign(
            { id: user.id },
            config.get("jwtSecret"),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email
                }
              });
            }
          );
        });
      });
    });
  });
});

module.exports = router;

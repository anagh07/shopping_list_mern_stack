const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../../models/Users");
const auth = require("../../middleware/auth");

// @route   POST api/auth
// @desc    Authinticate/login existing users
// @access  public
router.post("/", (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  User.findOne({ email }).then(user => {
    if (!user) res.status(400).json({ msg: "User does not exist" });
    bcrypt.compare(password, user.password).then(userExists => {
      if (userExists === false)
        res.status(400).json({ msg: "Invalid credentials" });
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

// @route   GET api/auth/user
// @desc    Find which user and their data
// @access  Protected
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user));
});

module.exports = router;

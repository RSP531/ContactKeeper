const express = require("express");
const router = express.Router();
const user = require("./models/User");
const { check, validationResult } = require("express-validator");

// @route   POST api/users
// @desc    Register a user
// @access  Public

router.post(
  "/",
  [
    check("firstName", "First Name is required")
      .not()
      .isEmpty(),
    check("lastName", "Last Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password, Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  (req, res) => {
    res.send(req.body);
  }
);

module.exports = router;

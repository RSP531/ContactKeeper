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
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { firstName, lastName, email, password } = req.body;

    try {
      let user = await user.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }
      user = new user({
        firstName,
        lastName,
        email,
        password
      });
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      res.send("User saved");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;

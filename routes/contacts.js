const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const User = require("./models/User");
const Contact = require("./models/Contact");

// @route   GET api/contacts
// @desc    Get all users contacts
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/contacts
// @desc    Add new contact
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("firstName", "firstName is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, phone, type } = req.body;

    try {
      let contactCheck = await Contact.findOne({ email });
      if (contactCheck) {
        return res.status(400).json({ msg: "Contact email already exists" });
      }

      const newContact = new Contact({
        firstName,
        lastName,
        email,
        phone,
        type,
        user: req.user.id
      });

      const contact = await newContact.save();

      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   PUT api/contacts/:id
// @desc    Change existing contact
// @access  Private
router.put("/:id", (req, res) => {
  res.send(`Change a contact with number ${req.params.id}`);
});

// @route   DELETE api/contacts/:id
// @desc    DELETE existing contact
// @access  Private
router.delete("/:id", (req, res) => {
  res.send("Delete a contact");
});

module.exports = router;

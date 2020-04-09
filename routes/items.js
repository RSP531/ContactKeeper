const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const Item = require("./models/Item");
const Contact = require("./models/Contact");

// @route   GET api/items
// @desc    Get all items
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const items = await Item.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/items
// @desc    Add a new item
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("item", "item is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { item, list } = req.body;

    try {
      const newItem = new Item({
        item,
        list,
        user: req.user.id
      });

      const item = await newItem.save();

      res.json(item);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   PUT api/contacts/:id
// @desc    Change existing contact
// @access  Private
router.put("/:id", auth, async (req, res) => {
  const { firstName, lastName, email, phone, type } = req.body;

  //  Build a contact object to see if submitted
  const contactFields = {};
  if (firstName) contactFields.firstName = firstName;
  if (lastName) contactFields.lastName = lastName;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ msg: "Contact does not exist" });
    }

    //Make sure the current user owns the contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not Authorized" });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/contacts/:id
// @desc    DELETE existing contact
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ msg: "Contact not found" });
    }
    //Make sure the current user owns the contact

    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not Authorized" });
    }

    await Contact.findByIdAndRemove(req.params.id);
    res.json({ msg: `${contact.firstName} was removed` });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

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
      check("listItem", "item is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { list, listItem } = req.body;

    try {
      const newItem = new Item({
        listItem,
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
  const { list, listItem } = req.body;

  //  Build a contact object to see if submitted
  const itemFields = {};
  if (list) itemFields.list = list;
  if (listItem) itemFields.listItem = listItem;

  try {
    let item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ msg: "Item does not exist" });
    }

    //Make sure the current user owns the item
    if (item.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not Authorized" });
    }

    item = await Item.findByIdAndUpdate(
      req.params.id,
      { $set: itemFields },
      { new: true }
    );
    res.json(item);
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
    let item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ msg: "Item not found" });
    }

    //Make sure the current user owns the item
    if (item.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not Authorized" });
    }

    await Item.findByIdAndRemove(req.params.id);
    res.json({ msg: `${item.listItem} was removed` });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

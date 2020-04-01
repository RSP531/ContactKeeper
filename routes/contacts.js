const express = require("express");
const router = express.Router();

// @route   GET api/contacts
// @desc    Get all users contacts
// @access  Private
router.get("/", (req, res) => {
  res.send("Get all contacts");
});

// @route   POST api/contacts
// @desc    Add new contact
// @access  Private
router.post("/", (req, res) => {
  res.send("Add a contact");
});

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

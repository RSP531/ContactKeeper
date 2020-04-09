const mongoose = require("mongoose");

const ItemSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  item: {
    type: String,
    required: true,
    default: "Grocery Item"
  },
  list: {
    type: String,
    required: true,
    default: "1"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("item", ItemSchema);

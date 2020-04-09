const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  item: {
    type: String,
    required: true
  },
  list: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("item", UserSchema);

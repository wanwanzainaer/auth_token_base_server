const mongoose = require("mongoose");
const Shcmea = mongoose.Schema;

const User = new Shcmea({
  email: {
    type: String,
    require: true,
    unique: true,
    lowercase: true
  },
  password: { type: String, require: true }
});

module.exports = mongoose.model("User", User);

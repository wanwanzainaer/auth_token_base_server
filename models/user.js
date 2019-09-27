const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Shcmea = mongoose.Schema;

const userSchema = new Shcmea({
  email: {
    type: String,
    require: true,
    unique: true,
    lowercase: true
  },
  password: { type: String, require: true }
});

userSchema.pre("save", async function(next) {
  const user = this;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, salt);
    user.password = hashPassword;
    next();
  } catch (e) {
    next(e);
  }
});

userSchema.methods.comparePassword = function(
  candidatePassword,
  callback
) {
  bcrypt
    .compare(candidatePassword, this.password)
    .then(isMatch => {
      callback(null, isMatch);
    })
    .catch(err => callback(err));
};

module.exports = mongoose.model("User", userSchema);

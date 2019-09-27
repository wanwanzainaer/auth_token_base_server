const User = require("../models/user");
const jwt = require("jsonwebtoken");
const key = require("../config/key").jwtkey;
function tokenCreater(user) {
  return jwt.sign({ id: user.id }, key, { expiresIn: 360000 });
}

module.exports = async function createUser({ email, password }, res) {
  try {
    const existUser = await User.findOne({ email });
    if (!email || !password) {
      return res
        .status(422)
        .send({ error: "you must provide email and password" });
    }
    if (existUser)
      return res.status(422).send({ error: "Email is already used" });
    const user = new User({
      email,
      password
    });

    await user.save();
    const token = tokenCreater(user);
    return res.json({ success: true, token: `Bearer ${token}` });
  } catch (e) {
    console.log(e);
    return res.send(e);
  }
};

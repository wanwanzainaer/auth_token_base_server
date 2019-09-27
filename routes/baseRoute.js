const router = require("express").Router();
const createUser = require("../queries/createUser");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const key = require("../config/key").jwtkey;

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user);
    return res.send("Hello world");
  }
);
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    const token = jwt.sign({ id: req.user.id }, key, {
      expiresIn: 360000
    });
    return res.json({ success: true, token: `bearer ${token}` });
  }
);

router.post("/signup", async (req, res) => {
  return await createUser(req.body, res);
});

module.exports = router;

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");

const baseRoute = require("./routes/baseRoute");
const app = express();

mongoose.connect("mongodb://localhost:27017/auth", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

app.use(passport.initialize());
app.use(morgan("combined"));
app.use(bodyParser.json({ type: "*/*" }));
// app.use(bodyParser.urlencoded({ extended: false }));
require("./services/passport")(passport);

app.use("/", baseRoute);
const port = process.env.PORT || 3090;

app.listen(port, () => {
  console.log("Server is listening on port 3090");
});

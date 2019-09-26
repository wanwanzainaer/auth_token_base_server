const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const baseRoute = require("./routes/baseRoute");
const app = express();
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", baseRoute);
const port = process.env.PORT || 3090;

app.listen(port, () => {
  console.log("Server is listening on port 3090");
});

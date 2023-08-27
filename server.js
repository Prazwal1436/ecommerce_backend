const express = require("express");
require("dotenv").config(); // to .env files
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json()); // read the body content of our request
// handle cross origin resource sharing

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const DB_URI = "mongodb://127.0.0.1:27017/mydatabase"; // Update with your MongoDB URI
const Joi = require("joi");

const loginScheme = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required().length(10),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).length(10),
});

mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.get("/", function (req, res, next) {
  res.send("Hello World");
});

app.post("/login", function (req, res, next) {
  let loginVal = loginScheme.validate(req.body);
  if (loginVal.error) {
    res.json(loginVal.error.details);
    res.end()
  }

  res.json(loginVal.error);
});

app.use("*", (req, res) => {
  return res.status(404).send({
    message: "the requested resource doesnot exist.",
  });
});
app.listen(process.env.PORT, (data, err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`server started at ${process.env.PORT}`);
  }
});

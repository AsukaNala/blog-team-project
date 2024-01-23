require("dotenv").config(); //to use .env file
const express = require("express");

const db = require("./db"); //database config file
const models = require("./models");
models.init(); //sync models (defined relationships in models/index.js)

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port} !`);
});

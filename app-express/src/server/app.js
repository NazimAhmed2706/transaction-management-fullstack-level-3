// Set NPM Modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
console.log("app.js => NPM modules defined");

// Set Relative Local Modules
const api_endpoints = require("../api");
const transactions = require("../api/transactions");
const accounts = require("../api/accounts");
console.log("app.js => Relative local modules defined");

// Set Express
const app = express();
console.log("app.js => Express defined");

// Using CORS for cross-origin resource sharing
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
console.log("app.js => Used CORS for cross-origin resource sharing");

// Using other resources
app.use(bodyParser.json());
app.use("/", does_method_exist, api_endpoints);
app.use("/transactions", transactions);
app.use("/accounts", accounts);
console.log("app.js => Used other resources");

// Default GET if none satisfied from above resources
app.get("*", (req, res) => {
  console.log("app.js => 404 Not Found");
  res.status(404).send("404 Not Found");
});

// common function
function does_method_exist(req, res, next) {
  console.log("app.js => does_method_exist - function call");
  next();
}

// exported for external use
module.exports = app;
console.log("app.js => App exported");

// Set NPM Modules
const express = require("express");
console.log("index.js => NPM modules defined");

// Set Router
const router = express.Router();
console.log("index.js => Router defined");

// middleware that is specific to this router
router
  .use((req, res, next) => {
    next();
  })
  .get("/ping", (req, res) => {
    console.log("index.js => GET /ping");
    res.status(200).send("The service is up and running.");
  });

// exported for external use
module.exports = router;
console.log("index.js => Router Exported");

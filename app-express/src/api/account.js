const express = require("express");
const router = express.Router();

router
  .get("/transactions", (req, res) => {
    res.send("The service is up and running.");
    res.sendStatus(200);
  })
  .post("/transactions");

module.exports = router;

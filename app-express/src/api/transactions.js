const express = require("express");
const router = express.Router();

router.get("/ping", (req, res) => {
  res.send("The service is up and running.");
  res.sendStatus(200);
});

module.exports = router;

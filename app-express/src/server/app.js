const express = require("express");
const bodyParser = require("body-parser");
const api_endpoints = require("../api");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(bodyParser.json());

app.use("/", does_method_exist, api_endpoints);

const arrayOfTransaction = [];

app
  .route("/transactions")
  .post((req, res) => {
    const bodyContent = req.body;
    const account_id = bodyContent.account_id;
    const amount = bodyContent.amount;
    const randTxnId = uuid();
    const txnCreatedTime = new Date().toISOString();
    const currentTxn = {
      transaction_id: randTxnId,
      account_id: account_id,
      amount: amount,
      created_st: txnCreatedTime,
    };
    arrayOfTransaction.push(currentTxn);
    res.json(JSON.stringify(currentTxn));
    res.sendStatus(201);
  })
  .get((req, res) => {
    res.json(JSON.stringify(arrayOfTransaction));
    res.sendStatus(200);
  });

app.get("*", (req, res) => {
  res.status(404).send("404 Not Found");
});

function does_method_exist(req, res, next) {
  next();
}

function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

module.exports = app;

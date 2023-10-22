const express = require("express");

const bodyParser = require("body-parser");
const cors = require("cors");

const api_endpoints = require("../api");
const common_logic = require("../api/common_logic");
const transactions = require("../api/transactions");
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(bodyParser.json());

app.use("/", common_logic.does_method_exist, api_endpoints);
app.use("/transactions", transactions);

/*
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
*/

app.get("*", (req, res) => {
  res.status(404).send("404 Not Found");
});

function does_method_exist(req, res, next) {
  next();
}

module.exports = app;

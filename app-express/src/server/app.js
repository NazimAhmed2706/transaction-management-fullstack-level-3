const express = require("express");
const bodyParser = require("body-parser");
const api_endpoints = require("../api");
const app = express();

app.use(bodyParser.json());

app.use("/", does_method_exist, api_endpoints);

app
  .route("/transactions")
  .post((req, res) => {
    const bodyContent = req.body;
    const account_id = bodyContent.account_id;
    const amount = bodyContent.amount;
    res.json({
      transaction_id: uuid(),
      account_id: account_id,
      amount: amount,
      created_at: new Date().toISOString(),
    });
    res.sendStatus(201);
  })
  .get((req, res) => {
    res.json([
      {
        transaction_id: "4bcc3959-6fe1-406e-9f04-cad2637b47d5",
        account_id: "0afd02d3-6c59-46e7-b7bc-893c5e0b7ac2",
        amount: 7,
        created_at: "2021-05-12T18:29:40.206924+00:00",
      },
      {
        transaction_id: "050a75f6-8df1-4ad1-8f5b-54e821e98581",
        account_id: "5ae0ef78-e902-4c40-9f53-8cf910587312",
        amount: -4,
        created_at: "2021-05-18T21:33:47.203136+00:00",
      },
    ]);
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

const express = require("express");

const router = express.Router();

const common_logic = require("./common_logic");

const arrayOfTransaction = [];
// middleware that is specific to this router
router
  .use((req, res, next) => {
    console.log("Time: ", Date.now());
    next();
  })
  .post("/", (req, res) => {
    const bodyContent = req.body;
    const account_id = bodyContent.account_id;
    const amount = bodyContent.amount;
    const randTxnId = common_logic.uuid();
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
  .get("/", (req, res) => {
    res.json(JSON.stringify(arrayOfTransaction));
    res.sendStatus(200);
  })
  .get("/:txnId", (req, res) => {
    const id = req.params.txnId;

    var found = arrayOfTransaction.filter(function (item) {
      return item.transaction_id === id;
    });
    res.json(found);
    res.sendStatus(200);
  });

module.exports = router;

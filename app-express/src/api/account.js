const express = require("express");
const router = express.Router();

const arrayOfTransaction = [];
// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("Time: ");
  next();
});

router
  .get("/transactions", (req, res) => {
    res.json(JSON.stringify(arrayOfTransaction));
    res.sendStatus(200);
  })
  .post("/transactions", (req, res) => {
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
  });

module.exports = router;

// Set NPM Modules
const express = require("express");
console.log("accounts.js => NPM modules defined");

// Set Relative Local Modules
const memory = require("./memory");
console.log("accounts.js => Relative local modules defined");

// Set Router
const router = express.Router();
console.log("accounts.js => Router defined");

// middleware that is specific to this router
router
  .use((req, res, next) => {
    next();
  })
  .get("/:accId", (req, res) => {
    console.log("accounts.js => GET /accounts/{account_id}");

    // Read account id
    const acc_id = req.params.accId;
    console.log("accounts.js => account_id : ", acc_id);

    // Filter the array of accounts based on account id
    const account = memory.arrayOfAccounts.filter(function (item) {
      return item.account_id === acc_id;
    })[0];

    console.log("accounts.js => 200 : ", account);
    res.status(200).json({
      account_id: account.account_id,
      balance: account.balance,
    });
    //res.status(200).json(JSON.stringify(account));
  });

// exported for external use
module.exports = router;
console.log("accounts.js => Router Exported");

// Set NPM Modules
const express = require("express");
console.log("transactions.js => NPM modules defined");

// Set Relative Local Modules
const common_logic = require("./common_logics");
const memory = require("./memory");
console.log("transactions.js => Relative local modules defined");

// Set Router
const router = express.Router();
console.log("transactions.js => Router defined");

// middleware that is specific to this router
router
  .use((req, res, next) => {
    next();
  })
  .post("/", (req, res) => {
    console.log("transactions.js => POST /transactions");

    // Parse Body Content
    const bodyContent = req.body;
    const account_id = bodyContent.account_id;
    const amount = bodyContent.amount;

    // Set random transaction UUID
    const randTxnId = common_logic.uuid();

    // Set transaction time stamp
    const txnCreatedTime = new Date().toISOString();

    // Set transaction
    const currentTxn = {
      transaction_id: randTxnId,
      account_id: account_id,
      amount: amount,
      created_at: txnCreatedTime,
    };
    console.log("transactions.js => Transaction ", currentTxn);

    // Add Transaction to the array of transactions
    memory.arrayOfTransactions.push(currentTxn);
    console.log(
      "transactions.js => Transaction added to the array of transactions, Array Count:",
      memory.arrayOfTransactions.length
    );

    // Check if the account id already exist
    var account = memory.arrayOfAccounts.filter(function (item) {
      console.log(
        "transactions.js => Account ID at the current iter : ",
        item.account_id
      );
      return item.account_id === account_id;
    })[0];

    // If account not found, create a new account with zero balance and include it in the array of accounts
    if (account == null) {
      console.log(
        "transactions.js => Account not found, Create a new account."
      );
      account = {
        account_id: account_id,
        balance: 0,
      };
      console.log("transactions.js => New account created, ", account);
      memory.arrayOfAccounts.push(account);
      console.log(
        "transactions.js => New account added to the array of accounts, Array Count:",
        memory.arrayOfAccounts.length
      );
    }

    // Modify the account balance
    console.log(
      "transactions.js => Account Details before balance update : ",
      account
    );
    var currentBalance = +account.balance;
    var txnAmount = +currentTxn.amount;
    account.balance = currentBalance + txnAmount;
    console.log(
      "transactions.js => Account Details after balance update : ",
      account
    );

    console.log("transactions.js => 201 : ", currentTxn);
    res.status(201).json(JSON.stringify(currentTxn));
  })
  .get("/", (req, res) => {
    console.log("transactions.js => GET /transactions");
    console.log("transactions.js => 200 : ", memory.arrayOfTransactions);
    // Send array of transactions
    res.status(200).json(JSON.stringify(memory.arrayOfTransactions));
  })
  .get("/:txnId", (req, res) => {
    console.log("transactions.js => GET /transactions/{transaction_id}");

    // Read transaction id
    const txn_id = req.params.txnId;
    console.log("transactions.js => transaction_id : ", txn_id);

    // Filter the array of transactons based on transaction id
    const transaction = memory.arrayOfTransactions.filter(function (item) {
      return item.transaction_id === txn_id;
    })[0];

    console.log("transactions.js => 200 : ", transaction);
    res.status(200).json(transaction);
  });

// exported for external use
module.exports = router;
console.log("transactions.js => Router Exported");

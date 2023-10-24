// Import NPM Modules
import React, {useState, useEffect} from "react";
import Stack from 'react-bootstrap/Stack';
import axios from "axios";

console.log("TransactionHistory.jsx= => NPM modules imported");


function TransactionHistory() {
    const [transactionSummary , setTransactionSummary] = useState([]);
    
    useEffect(() => {
        console.log("TransactionHistory.jsx= => TransactionHistory - function call");
        const tempTransactionSummary = [];

        // Get All Transactions
        axios
            .get('http://localhost:5000/transactions')
            .then(async function (response) {
            // Response is the array of transactions
            console.log("TransactionHistory.jsx= => TransactionHistory => GET http://localhost:5000/transactions : ", response.data);
            const arrayOfTransactions = JSON.parse(response.data);
            console.log("TransactionHistory.jsx= => TransactionHistory => Array of Transactions Count : ", arrayOfTransactions.length);

            // Loop thru the array of transactions to make array of summary
            for (let index = 0; index < arrayOfTransactions.length; index++) {
                const transaction = arrayOfTransactions[index];
                console.log("TransactionHistory.jsx= => TransactionHistory => Transactions : ", index, transaction);
                
                
                let transactionJSON;
                if(index === 0){
                    // Add Balance Detail for latest transaction
                    let accBalance = 0;
                    await axios
                        .get('http://localhost:5000/accounts/'+transaction.account_id)
                        .then(function (response) {
                            // Response is the account details
                            console.log("TransactionHistory.jsx= => TransactionHistory => GET http://localhost:5000/accounts/" + transaction.account_id + " : ", response.data);
                            var accountDetails = response.data;
                            accBalance = +accountDetails.balance;
                            console.log("TransactionHistory.jsx= => TransactionHistory => Account Balance " + accBalance + "$");
                        });
                    transactionJSON = {
                        account_id:transaction.account_id,
                        transaction_id:transaction.transaction_id,
                        amount : transaction.amount,
                        balance: accBalance
                    };                   
                } else {
                    transactionJSON = {
                        account_id:transaction.account_id,
                        transaction_id:transaction.transaction_id,
                        amount : transaction.amount
                    }; 
                }
                // Add individual transaction summary as json
                tempTransactionSummary.push(transactionJSON)
                console.log("TransactionHistory.jsx= => TransactionHistory => ", transactionJSON);
            }
            setTransactionSummary(tempTransactionSummary);
            })
            .catch(err => console.error(err));
    },[]);

    if (transactionSummary.length === 0){
        return (
            <div className='mt-3'> 
                <p>No transaction history found</p>
            </div>
        );
    }

    return (
        <Stack direction="vertical" className='mt-3' gap={3} >
            {
                transactionSummary.map((transaction, index)=>{

                    // Assign Transaction Direction from/to
                    var transactionDirection = "to";
                    var transactionAmount = + transaction.amount; 
                    if ((transactionAmount) < 0) {
                        transactionDirection = "from";
                        transactionAmount = transactionAmount * -1;
                    }

                    // For latest transaction, display account balance as well.
                    if (index === 0 ){
                        return <div data-type="transaction" data-account-id={transaction.account_id} data-amount={+ transaction.amount} data-balance={transaction.balance} 
                                    className="border rounded p-3" key={transaction.transaction_id}>
                                    Transferred {transactionAmount}$ {transactionDirection} account {transaction.account_id}. <br />
                                    The current balance is {transaction.balance}$. 
                                </div>
                    }
                    else {
                        return <div data-type="transaction" data-account-id={transaction.account_id} data-amount={+ transaction.amount}
                                    className="border rounded p-3" key={transaction.transaction_id}>
                                    Transferred {transactionAmount}$ {transactionDirection} account {transaction.account_id}.
                                </div>
                    }
                    
                })
            }

        </Stack>
    );
}

export default TransactionHistory;
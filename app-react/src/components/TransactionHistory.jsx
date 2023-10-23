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
                var txnDir = "to";
                var txnAmt = + transaction.amount; 
                if ((transaction.amount) < 0) {
                    txnDir = "from";
                    txnAmt = txnAmt * -1;
                }
                
                let indexingTransactionSummary = "Transferred " + txnAmt + "$ " + txnDir + " account " + transaction.account_id + ".";

                // Add Balance Detail for latest transaction
                
                if(index === arrayOfTransactions.length - 1){
                    let accBalance = 0;
                    await axios
                        .get('http://localhost:5000/accounts/'+transaction.account_id)
                        .then(function (response) {
                            // Response is the account details
                            console.log("TransactionHistory.jsx= => TransactionHistory => GET http://localhost:5000/accounts/" + transaction.account_id + " : ", response.data);
                            const accountDetails = JSON.parse(response.data);
                            accBalance = +accountDetails.balance;
                            console.log("TransactionHistory.jsx= => TransactionHistory => Account Balance " + accBalance + "$");
                            indexingTransactionSummary = indexingTransactionSummary + "\nThe current account balance is " + accBalance + "$."
                        });
                    
                }
                tempTransactionSummary.push(indexingTransactionSummary)
                console.log("TransactionHistory.jsx= => TransactionHistory => ", indexingTransactionSummary);
            }
            tempTransactionSummary.reverse();
            setTransactionSummary(tempTransactionSummary);
            })
            .catch(err => console.error(err));
    },[]);

    return (
        <Stack direction="vertical" className='mt-3' gap={3}>
            {
                transactionSummary.map((transaction)=>{
                    return <div className="border rounded p-3" key={transaction} style={{whiteSpace: 'pre-line'}}>{transaction}</div>
                })
            }

        </Stack>
    );
}

export default TransactionHistory;
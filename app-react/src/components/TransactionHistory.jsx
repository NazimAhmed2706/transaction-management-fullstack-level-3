// Import NPM Modules
import React, {useEffect} from "react";
import Stack from 'react-bootstrap/Stack';

console.log("TransactionHistory.jsx= => NPM modules imported");

function TransactionHistory() {
    useEffect(() => {
        console.log("TransactionHistory.jsx= => TransactionHistory - function call");
    }, []);

    const getTransactions = (event) => {
        /*axios.get('http://localhost:5000/transactions')
      .then((res) => {
        console.log(res)
      })
      .catch(err => console.error(err));*/
    };

    return (
        <Stack direction="vertical" className='mt-3' gap={3}>
            <div className="border rounded p-3">Transaction 1</div>
            <div className="border rounded p-3">Transaction 2</div>
            <div className="border rounded p-3">Transaction 3</div>
        </Stack>
    );
}

export default TransactionHistory;
import React, {useEffect} from "react";
import Stack from 'react-bootstrap/Stack';

function TransactionHistory() {
    useEffect(() => {
        console.log("Page Reloaded, Get All Transactions");
    }, []);

    const getTransactions = (event) => {
        
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
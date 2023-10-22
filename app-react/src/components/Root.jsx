import React from "react";
import Stack from 'react-bootstrap/Stack';
import NewTransaction from "./NewTransaction";
import TransactionHistory from './TransactionHistory';

function Root() {
  return (
    <Stack direction="horizontal" gap={3}>
      <div className="p-3 align-self-start" style={{width: '30vw'}}>Submit New Transaction
        <NewTransaction />
      </div>
      <div className="vr" style={{height: '100vh'}}/>
      <div className="p-3 align-self-start" style={{width: '67vw'}}>Transactions History
        <TransactionHistory />
      </div>
    </Stack>
  );
}

export default Root;
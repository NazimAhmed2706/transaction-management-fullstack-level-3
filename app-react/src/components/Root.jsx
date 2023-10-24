// Import NPM Modules
import React from "react";
import Stack from 'react-bootstrap/Stack';

// Import Relative Local Modules
import NewTransaction from "./NewTransaction";
import TransactionHistory from './TransactionHistory';

console.log("Root.jsx= => NPM modules and Relative Local modules imported");

function Root() {
  console.log("index.js= => Root - function call");
  return (
    <Stack direction="horizontal" gap={1.5}>
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
// Import NPM Modules
import React, {useState} from "react";
import axios from 'axios';

console.log("NewTransaction.jsx= => NPM modules imported");

function NewTransaction() {
  console.log("NewTransaction.jsx= => NewTransaction - function call");

  const[accId, setAccId] = useState("");
  const[amt, setAmt] = useState("");
  console.log("NewTransaction.jsx= => NewTransaction => Default state assigned");

  const handleSubmit = (event) => {
    // Perform action on button click
    console.log("NewTransaction.jsx= => NewTransaction => handleSubmit - function call");

    console.log("NewTransaction.jsx= => NewTransaction => handleSubmit => Account Id is ", accId);
    console.log("NewTransaction.jsx= => NewTransaction => handleSubmit => Amount is ", amt);

    // Post the transaction request
    axios.post('http://localhost:5000/transactions', {
      "account_id" : accId,
      "amount": amt,
    })
    .then((res) => {
      // Response is the transaction
      console.log("NewTransaction.jsx= => NewTransaction => POST http://localhost:5000/transactions : ", res.data);
    })
    .catch(err => console.error(err));
  };

  return (
    <form className="border rounded mt-3 p-3" onSubmit={handleSubmit}>
      <div className="form-group mb-3">
        <label>Account ID:</label>
        <input type="string" className="form-control" placeholder="Enter Account ID" value={accId} onChange={(e)=> setAccId(e.target.value)} />
      </div>
      <div className="form-group mb-3">
        <label>Amount:</label>
        <input type="integer" className="form-control" placeholder="Enter Amount" value={amt} onChange={(e)=> setAmt(e.target.value)}/>
      </div>
      <div className='d-flex justify-content-center'>
        <button type="submit" className="btn btn-outline-primary">Submit</button>
      </div>
    </form>    
  );
}

export default NewTransaction;



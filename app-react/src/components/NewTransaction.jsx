// Import NPM Modules
import React, {useState} from "react";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';



console.log("NewTransaction.jsx= => NPM modules imported");

function NewTransaction() {
  console.log("NewTransaction.jsx= => NewTransaction - function call");

  const[accId, setAccId] = useState("");
  const[amt, setAmt] = useState("");
  const[validated, setValidation] = useState(false);
  console.log("NewTransaction.jsx= => NewTransaction => Default state assigned");

  const handleSubmit = (event) => {
    // Perform action on button click
    console.log("NewTransaction.jsx= => NewTransaction => handleSubmit - function call");

    console.log("NewTransaction.jsx= => NewTransaction => handleSubmit => Account Id is ", accId);
    console.log("NewTransaction.jsx= => NewTransaction => handleSubmit => Amount is ", amt);

    const accountIDRegExp = /^[a-f0-9]{8}\-[a-f0-9]{4}\-4[a-f0-9]{3}\-[a-f0-9]{4}\-[a-f0-9]{12}/;
    if(! accountIDRegExp.test(accId)){
      console.log("NewTransaction.jsx= => NewTransaction => Invalid Account Id: ", accId);
      return;
    }

    const form = event.currentTarget;
    if (form.checkValidity() === false){
      console.log("NewTransaction.jsx= => NewTransaction => handleSubmit => Error: Validation Failed!!");
      return;
    }

    setValidation(true);
    console.log("NewTransaction.jsx= => NewTransaction => handleSubmit => Validation Success.");

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
    <Form className="border rounded mt-3 p-1" noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group as={Row} className="m-1">
        <Form.Label>Account ID:</Form.Label>
        <Form.Control required type="string" data-type="account-id" placeholder="Enter Account ID" value={accId} onChange={(e)=> setAccId(e.target.value)} />
        <Form.Control.Feedback type="invalid">Please enter a valid Account ID</Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Row} className="m-1">
        <Form.Label>Amount:</Form.Label>
        <Form.Control required type="number" data-type="amount" placeholder="Enter Amount" value={amt} onChange={(e)=> setAmt(e.target.value)} />
        <Form.Control.Feedback type="invalid">Please enter a valid amount</Form.Control.Feedback>
      </Form.Group>
      <div className='d-flex justify-content-center mt-3'>
        <Button type="submit" data-type="transaction-submit" variant="primary">Submit</Button>
      </div>
      

    </Form>    
  );
}

export default NewTransaction;



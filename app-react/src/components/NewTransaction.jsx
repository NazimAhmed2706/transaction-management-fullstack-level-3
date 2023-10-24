// Import NPM Modules
import React, {useEffect, useState} from "react";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
console.log("NewTransaction.jsx= => NPM modules imported");

function NewTransaction() {
  console.log("NewTransaction.jsx= => NewTransaction - function call");

  const initialValues = {account_id: "", amount: ""};
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const [validated, setValidation] = useState(false);
  console.log("NewTransaction.jsx= => NewTransaction => Default state assigned");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name] : value });
    console.log(formValues);
  };

  const handleSubmit = (e) => {
    // Perform action on button click
    console.log("NewTransaction.jsx= => NewTransaction => handleSubmit - function call");

    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);

    /*console.log("NewTransaction.jsx= => NewTransaction => handleSubmit => Account Id is ", initialValues.account_id);
    console.log("NewTransaction.jsx= => NewTransaction => handleSubmit => Amount is ", initialValues.amount);

    const accountIDRegExp = /^[a-f0-9]{8}\-[a-f0-9]{4}\-4[a-f0-9]{3}\-[a-f0-9]{4}\-[a-f0-9]{12}/;
    if(! accountIDRegExp.test(initialValues.account_id)){
      console.log("NewTransaction.jsx= => NewTransaction => Invalid Account Id: ", initialValues.account_id);
      return;
    }

    const form = e.currentTarget;
    if (form.checkValidity() === false){
      console.log("NewTransaction.jsx= => NewTransaction => handleSubmit => Error: Validation Failed!!");
      return;
    }

    setValidation(true);
    console.log("NewTransaction.jsx= => NewTransaction => handleSubmit => Validation Success.");

    // Post the transaction request
    axios.post('http://localhost:5000/transactions', {
      "account_id" : initialValues.account_id,
      "amount": initialValues.amount,
    })
    .then((res) => {
      // Response is the transaction
      console.log("NewTransaction.jsx= => NewTransaction => POST http://localhost:5000/transactions : ", res.data);
    })
    .catch(err => console.error(err));*/
  };

  useEffect(() => {
    console.log(formErrors);
    if(Object.keys(formErrors).length === 0 && isSubmit){
      console.log(formValues);
    }
  },[formErrors])

  const validate = (values) => {
    const errors = {};
    const regex = /^[a-f0-9]{8}\-[a-f0-9]{4}\-4[a-f0-9]{3}\-[a-f0-9]{4}\-[a-f0-9]{12}/;
    if (! values.account_id){
      errors.account_id = "Account ID is required";
    }
    if (! values.amount){
      errors.amount = "Amount is required";
    }

    return errors;
  };

  return (
    // noValidate validated={validated} 
    <div>
      <pre>
        {
          JSON.stringify(formValues, undefined, 2)
        }
      </pre>
      <form className="border rounded mt-3 p-3" onSubmit={handleSubmit}>
        <div className="form-group m-1">
          <label>Account ID:</label>
          <input type="text" data-type="account-id" className="form-control" placeholder="Enter Account ID" name="account_id" value={formValues.account_id} onChange={handleChange} />
        </div>
        <div className="form-group m-1">
          <label>Amount:</label>
          <input type="number" data-type="amount" className="form-control" placeholder="Enter Amount" name="amount" value={formValues.amount} onChange={handleChange} />
        </div>
        <div className='d-flex justify-content-center mt-3'>
          <button type="submit" data-type="transaction-submit" className="btn btn-outline-primary">Submit</button>
        </div>
      </form>
    </div>
       
  );
}

export default NewTransaction;



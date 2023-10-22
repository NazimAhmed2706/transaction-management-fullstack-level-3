import React, {useState} from "react";
import axios from 'axios';


function NewTransaction() {

  const[accId, setAccId] = useState("");
  const[amt, setAmt] = useState("");

  const handleSubmit = (event) => {
    // Perform action on button click
    console.log('Submit Button clicked!');
    console.log('Account Id is ', accId);
    console.log('Amount is ', amt);


    axios.get('http://localhost:5000/ping');

    axios.post('http://localhost:5000/transactions', {
      "account_id" : accId,
      "amount": amt,
    })
    .then((res) => {
      console.log(res);
      axios.get('http://localhost:5000/transactions')
      .then((res) => console.log(res))
      .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
    
    event.preventDefault();
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



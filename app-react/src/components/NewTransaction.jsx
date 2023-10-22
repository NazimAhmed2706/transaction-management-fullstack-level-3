import Form from 'react-bootstrap/Form';

function NewTransaction() {
  return (
    <Form className="border rounded p-3">
      <Form.Group className="mb-3" controlId="formGroupAccountId">
        <Form.Label>Account ID</Form.Label>
        <Form.Control type="string" placeholder="Enter Account ID" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupAmount">
        <Form.Label>Amount</Form.Label>
        <Form.Control type="integer" placeholder="Enter Amount" />
      </Form.Group>
      <Form.Group className='d-flex justify-content-center'>
        <button type="button" class="btn btn-outline-primary">Submit</button>
      </Form.Group>
    </Form>
  );
}

export default NewTransaction;
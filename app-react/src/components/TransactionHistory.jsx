import Stack from 'react-bootstrap/Stack';

function TransactionHistory() {
    return (
        <Stack direction="vertical" gap={3}>
        <div className="border rounded p-3">Transaction 1</div>
        <div className="border rounded p-3">Transaction 2</div>
        <div className="border rounded p-3">Transaction 3</div>
        </Stack>
    );
}

export default TransactionHistory;
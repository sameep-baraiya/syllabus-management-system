import React, { useContext, useState } from 'react';
import { Button, Row, Col, Card, Form } from 'react-bootstrap';

// Context
import AccountRequestContext from '../../../context/account-request/accountRequestContext';

const AccountRequest = () => {
  const accountRequestContext = useContext(AccountRequestContext);
  const {
    getAccountRequests,
    accountRequests,
    updateAccountRequest,
  } = accountRequestContext;

  const [isRejected, setIsRejected] = useState(false);
  const [rejectedIndex, setRejectedIndex] = useState(-1);
  const [rejectedMsg, setRejectedMsg] = useState('');

  const userView = (it, index) => (
    <Card>
      <Card.Body>
        <Row>
          <Col>
            <strong>Name : </strong>
            {it.User.name.split('-').join(' ')} <br />
            <strong>Email : </strong>
            {it.User.email} <br />
            <strong>Contact Number : </strong>
            {it.User.contactNumber} <br />
            <strong>Department : </strong>
            {it.User.department} <br />
          </Col>
          <Col>
            <strong>Role : </strong>
            {it.User.role} <br />
            <strong>Is Approved : </strong>
            {it.User.isApproved ? 'Yes' : 'No'} <br />
            <strong>Created At : </strong>
            {new Date(it.User.createdAt).toLocaleString('en-BZ', {
              hour12: true,
            })}
            <br />
            <strong>Updated At : </strong>
            {new Date(it.User.updatedAt).toLocaleString('en-BZ', {
              hour12: true,
            })}
          </Col>
          {index !== -1 && (
            <Col md='auto'>
              <Button
                variant='success'
                block
                className='mb-2'
                onClick={() => {
                  console.log({
                    id: it.id,
                    isApproved: true,
                  });
                  updateAccountRequest({
                    id: it.id,
                    isApproved: true,
                  });
                }}
              >
                Approve
              </Button>
              <Button
                variant='danger'
                block
                onClick={() => {
                  setRejectedIndex(index);
                  setIsRejected(true);
                }}
              >
                Reject
              </Button>
            </Col>
          )}
        </Row>
      </Card.Body>
    </Card>
  );

  return (
    <div>
      <br />
      <div>
        <Button
          block
          onClick={() => {
            getAccountRequests();
          }}
        >
          Get Account Requests
        </Button>
      </div>
      {!isRejected &&
        accountRequests &&
        accountRequests.map((it, index) => (
          <div key={index} className='mt-3'>
            {userView(it, index)}
          </div>
        ))}
      {isRejected && (
        <div>
          <div className='mb-2 mt-3'>
            {userView(accountRequests[rejectedIndex], -1)}
          </div>
          <Form.Label>Rejection Message</Form.Label>
          <Form.Control
            className='mb-3'
            as='textarea'
            rows={4}
            placeholder='Enter Rejection Message Here'
            value={rejectedMsg}
            onChange={(e) => {
              setRejectedMsg(e.target.value);
            }}
          />
          <Button
            variant='primary'
            onClick={() => {
              updateAccountRequest({
                id: accountRequests[rejectedIndex].id,
                isApproved: false,
                message: rejectedMsg,
              });
              setIsRejected(false);
              setRejectedIndex(-1);
              setRejectedMsg('');
            }}
          >
            Submit
          </Button>{' '}
          <Button
            variant='secondary'
            onClick={() => {
              setIsRejected(false);
              setRejectedIndex(-1);
              setRejectedMsg('');
            }}
          >
            Reset
          </Button>
        </div>
      )}
    </div>
  );
};

export default AccountRequest;

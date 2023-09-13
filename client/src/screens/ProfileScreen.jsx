import React, { useState, useEffect } from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';
import axios from 'axios';

const ProfileScreen = () => {
  const [transactionHistory, setTransactionHistory] = useState([]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await axios.get('/api/profile/me');
        const profile = res.data;
        setTransactionHistory(profile.transactionHistory);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div>
      <h2>Profile Dashboard</h2>
      <h3>Transaction History</h3>
      <Accordion>
        {transactionHistory.map((transaction, index) => (
          <Card key={index}>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey={index.toString()}>
                Transaction {index + 1}
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={index.toString()}>
              <Card.Body>
                <p>Type: {transaction.type}</p>
                <p>Amount: {transaction.amount}</p>
                <p>Reason: {transaction.reason}</p>
                <p>Sender ID: {transaction.senderId}</p>
                <p>Receiver ID: {transaction.receiverId}</p>
                <p>Timestamp: {transaction.timestamp}</p>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        ))}
      </Accordion>
    </div>
  );
};

export default ProfileScreen;
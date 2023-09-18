import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Accordion, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../actions/profile';

const ProfileDashboard = ({ getCurrentProfile, auth, profile: { loading, profile } }) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  const { transactionHistory, user: { firstName, coinBalance, email } } = profile;

  return (
    <Container>
      <Row className="mt-4">
        <Col md={6} className="mx-auto">
          <Card className="text-center profile-card">
            <Card.Body>
              <Card.Title className="welcome-title">
                Welcome, {firstName}!
              </Card.Title>
              <Card.Text className="balance-text">Your Coin Balance</Card.Text>
              <h2 className="display-4 coin-balance">{coinBalance}</h2>
              <Card.Text className="email-text">Email: {email}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={8} className="mx-auto">
          <h3 className="transaction-heading">Transaction History</h3>
          <Accordion>
            {transactionHistory.map((transaction, index) => (
              <Accordion.Item key={index} eventKey={index.toString()}>
                <Accordion.Header>
                  <Button variant="outline-primary" className="transaction-button">
                    Transaction {index + 1}
                  </Button>
                </Accordion.Header>
                <Accordion.Body>
                  <div className="transaction-details">
                    <p className="transaction-info">Type: {transaction.type}</p>
                    <p className="transaction-info">Amount: {transaction.amount}</p>
                    <p className="transaction-info">Reason: {transaction.reason}</p>
                    <p className="transaction-info">Sender: {transaction.senderId}</p>
                    <p className="transaction-info">Receiver: {transaction.receiverId}</p>
                    <p className="transaction-info">Timestamp: {transaction.timestamp}</p>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};

ProfileDashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(ProfileDashboard);


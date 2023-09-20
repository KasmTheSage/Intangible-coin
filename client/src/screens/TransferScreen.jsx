import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { transferCoin } from '../actions/profile';
import { Form, Button } from 'react-bootstrap';

const TransferScreen = ({ transferCoin }) => {
  const [formData, setFormData] = useState({
    type: false,
    amount: '',
    reason: '',
    anonymous: false,
    id: '',
  });

  const { type, amount, reason, anonymous, id } = formData;

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    transferCoin( id, type, amount, reason, anonymous);
    navigate('/profile');
  };

  return (
    <div>
      <h2>Transfer Coins</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="type">
          <Form.Check
            type="checkbox"
            label="Is this a positive vibe?"
            name="type"
            checked={type}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="amount">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            name="amount"
            value={amount}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="reason">
          <Form.Label>Reason</Form.Label>
          <Form.Control
            as="textarea"
            name="reason"
            value={reason}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="anonymous">
          <Form.Check
            type="checkbox"
            label="Anonymous"
            name="anonymous"
            checked={anonymous}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="id">
          <Form.Label>User ID</Form.Label>
          <Form.Control
            type="text"
            name="id"
            value={id}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Transfer
        </Button>
      </Form>
    </div>
  );
};

TransferScreen.propTypes = {
  transferCoin: PropTypes.func.isRequired,
};

export default connect(null, { transferCoin })(TransferScreen);
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveContact } from '../actions/profile';
import { Form, Button } from 'react-bootstrap';

const NewContactScreen = ({ saveContact }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    type: '',
  });

  const { firstName, middleName, lastName, email, phoneNumber, type } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    saveContact(formData);
    navigate('/profile');
  };

  return (
    <div className="new-contact-container">
      <h2 className="new-contact-heading">New Contact</h2>
      <Form onSubmit={handleSubmit} className="new-contact-form">
        <Form.Group controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={firstName}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="middleName">
          <Form.Label>Middle Name</Form.Label>
          <Form.Control
            type="text"
            name="middleName"
            value={middleName}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={lastName}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="phoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="type">
          <Form.Label>Contact Type</Form.Label>
          <Form.Select className='type-select' name="type" value={type} onChange={handleChange} required>
            <option value="">Select Type</option>
            <option value="Significant Other">Significant Other</option>
            <option value="Intimate Other">Intimate Other</option>
            <option value="Family">Family</option>
            <option value="Friend">Friend</option>
            <option value="School">School</option>
            <option value="Work">Work</option>
            <option value="Active Acquaintance">Active Acquaintance</option>
            <option value="Passive Acquaintance">Passive Acquaintance</option>
            <option value="Other">Other</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit" className="save-contact-button">
          Save Contact
        </Button>
      </Form>
    </div>
  );
};

NewContactScreen.propTypes = {
  saveContact: PropTypes.func.isRequired,
};

export default connect(null, { saveContact })(NewContactScreen);
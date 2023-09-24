import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { findProfile } from '../actions/profile';
import { transferCoin } from '../actions/profile';
import { Modal, Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ContactScreen = ({ transferCoin, findProfile, profile: { profiles, profile: { contacts } } }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [formData, setFormData] = useState({
    positiveVibe: true,
    amount: '',
    reason: '',
    anonymous: true,
  });

  const handleOpenModal = (contact) => {
    setSelectedContact(contact);
    findProfile(contact.email);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedContact(null);
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { positiveVibe, amount, reason, anonymous } = formData;
    const { _id } = profiles;
    const type = positiveVibe;
    const id = _id;
    transferCoin(id, type, amount, reason, anonymous);
    setShowModal(false);
  };

  return (
    <div>
      {contacts.map((contact, index) => (
        <Card key={index} className="mb-4 contact-card">
          <Card.Body>
            <Card.Title className="contact-name">{contact.firstName} {contact.lastName}</Card.Title>
            <Card.Text className="contact-details">Email: {contact.email}</Card.Text>
            <Card.Text className="contact-details">Phone: {contact.phoneNumber}</Card.Text>
            <Button variant="primary" onClick={() => handleOpenModal(contact)}>Send Coins</Button>
          </Card.Body>
        </Card>
      ))}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Transfer Coins</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedContact && (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="positiveVibe">
                <Form.Check
                  type="checkbox"
                  label="Is this a positive vibe?"
                  name="positiveVibe"
                  checked={formData.positiveVibe}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="amount">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="reason">
                <Form.Label>Reason</Form.Label>
                <Form.Control
                  as="textarea"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="anonymous">
                <Form.Check
                  type="checkbox"
                  label="Anonymous"
                  name="anonymous"
                  checked={formData.anonymous}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit">Submit</Button>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Link to="/new-contact">
        <Button variant="primary" className="mt-4">Add New Contact</Button>
      </Link>
    </div>
  );
};

ContactScreen.propTypes = {
  transferCoin: PropTypes.func.isRequired,
  findProfile: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        phoneNumber: PropTypes.string.isRequired,
      })
    ).isRequired,
    profiles: PropTypes.object.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { findProfile, transferCoin })(ContactScreen);
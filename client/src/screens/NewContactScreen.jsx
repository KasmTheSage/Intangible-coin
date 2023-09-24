import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveContact } from '../actions/profile';
import { findProfile } from '../actions/profile';
import { Modal, Form, Button, Card } from 'react-bootstrap';

const NewContactScreen = ({ findProfile, saveContact, profile: { profiles, loading } }) => {
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    findProfile(email);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveContact = () => {
    const firstName = profiles.firstName;
    const middleName = profiles.middleName;
    const lastName = profiles.lastName;
    const email = profiles.email;

    saveContact( firstName, middleName, lastName, email );
    setShowModal(false);
  };

  return (
    <div className="new-contact-container">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={email} onChange={handleEmailChange} required />
        </Form.Group>
        <Button variant="primary" type="submit">
          Find Profile
        </Button>
      </Form>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Profile Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <p>Loading...</p>
          ) : (
            profiles && (
              <Card>
                <Card.Body>
                  <Card.Title>{profiles.firstName}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {profiles.middleName} {profiles.lastName}
                  </Card.Subtitle>
                  <Card.Text>{profiles.email}</Card.Text>
                </Card.Body>
              </Card>
            )
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveContact}>
            Save Contact
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

NewContactScreen.propTypes = {
  saveContact: PropTypes.func.isRequired,
  findProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { saveContact, findProfile })(NewContactScreen);
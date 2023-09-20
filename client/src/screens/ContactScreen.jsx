import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ContactScreen = ({ auth, profile: { profile: { contacts } } }) => {
  return (
    <Container>
      <h1 className="contact-screen-title">Profile Contacts</h1>
      <div className="contact-list">
        {contacts.map((contact, index) => (
          <Card key={index} className="mb-4 contact-card">
            <Card.Body>
              <Card.Title className="contact-name">{contact.firstName} {contact.lastName}</Card.Title>
              <Card.Text className="contact-details">Email: {contact.email}</Card.Text>
              <Card.Text className="contact-details">Phone: {contact.phoneNumber}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
      <Link to="/new-contact">
        <Button variant="primary" className="mt-4">Add New Contact</Button>
      </Link>
    </Container>
  );
};

ContactScreen.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.shape({
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps)(ContactScreen);
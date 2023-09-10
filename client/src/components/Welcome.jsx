import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

const Welcome = () => {
  const columnStyle = {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: '#fff',
  };

  const buttonStyle = {
    marginTop: '1.5rem',
    width: '12rem',
    fontWeight: 'bold',
    letterSpacing: '1px',
    fontSize: '1.1rem',
    borderRadius: '5px',
  };

  return (
    <Row>
      <Col style={columnStyle}>
        <div>
          <h2 style={{ marginBottom: '2rem', fontSize: '2.5rem', fontWeight: 'bold' }}>
            New User? Register Here
          </h2>
          <Button variant="light" style={buttonStyle}>Sign up</Button>
        </div>
      </Col>
      <Col style={{ ...columnStyle, background: '#fff', color: '#333' }}>
        <div>
          <h2 style={{ marginBottom: '2rem', fontSize: '2.5rem', fontWeight: 'bold' }}>
            Existing User? Login Here
          </h2>
          <Button variant="primary" style={buttonStyle}>Log in</Button>
        </div>
      </Col>
    </Row>
  );
};

export default Welcome;
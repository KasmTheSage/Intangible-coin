import React from 'react';
import {Container, Navbar, Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../actions/auth';

const Header = ({auth: {isAuthenticated, loading}, logout}) => {
   const authLinks = (
    <Container>
    <LinkContainer to="/profile">
      <Navbar.Brand style={{fontWeight: 'bold', fontSize: '1.5rem'}}>
        Intangible Coin
      </Navbar.Brand>
    </LinkContainer>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="ms-auto">
      <LinkContainer to="/about">
        <Nav.Link style={{marginRight: '1.5rem'}}>About</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/profile">
        <Nav.Link style={{fontWeight: 'bold'}}>Dashboard</Nav.Link>
      </LinkContainer>
      <Nav.Link onClick={logout} style={{fontWeight: 'bold'}}>
        Sign Out
      </Nav.Link>
    </Nav>
    </Navbar.Collapse>
  </Container>
  );

  const guestLinks = (
    <Container>
      <LinkContainer to="/">
        <Navbar.Brand style={{fontWeight: 'bold', fontSize: '1.5rem'}}>
          Intangible Coin
        </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <LinkContainer to="/about">
            <Nav.Link style={{marginRight: '1.5rem'}}>About</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/login">
            <Nav.Link style={{fontWeight: 'bold'}}>Sign In</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Container>
  );

  return (
    <header>
      <Navbar bg="light" variant="light" expand="md" collapseOnSelect>
        {!loading && (
          <>{isAuthenticated ? authLinks : guestLinks}</>
        )}
      </Navbar>
    </header>
  );
};

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect (mapStateToProps, {logout}) (Header);

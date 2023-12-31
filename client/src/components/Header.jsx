import React from 'react';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/auth';
import logo from '../assets/logo.png';

const Header = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <Container>
      <LinkContainer to="/profile">
        <Navbar.Brand style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
        <img src={logo} alt="Intangible Coin" className="logo-image"/>
        </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/help">Help</Nav.Link>
          <NavDropdown title="Account">
            <LinkContainer to="/questionnaire">
            <NavDropdown.Item>Edit Account Information</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/contact-list">
            <NavDropdown.Item>Contact List</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={logout}>Sign Out</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Container>
  );

  const guestLinks = (
    <Container>
      <LinkContainer to="/">
        <Navbar.Brand style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
        <img src={logo} alt="Intangible Coin" className="logo-image"/>
        </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/help">Help</Nav.Link>
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

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Header);

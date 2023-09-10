import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';

const Header = () => {
  return (
    <header>
      <Navbar bg="light" variant="light" expand="md" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/" style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
            Intangible Coin
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/about" style={{ marginRight: '1.5rem' }}>About</Nav.Link>
              <Nav.Link href="/login" style={{ fontWeight: 'bold' }}>Sign In</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import logo from '../assets/logo.png';

const Footer = () => {
    const year = new Date().getFullYear();

  return (
    <footer>
        <Container>
            <Row>
                <Col className='text-center py-3'>
                    <p><img src={logo} alt="Intangible Coin" className="logo-image"/> {year} All Rights Reserved.</p>
                </Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer
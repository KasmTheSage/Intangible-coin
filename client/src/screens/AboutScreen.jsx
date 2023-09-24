import React from 'react';
import pape from '../assets/pape.jpg';
import robert from '../assets/robert.jpeg';
import { Container, Row, Col, Image } from 'react-bootstrap';

const AboutScreen = () => {
  return (
    <Container className="about-container">
      <div className="about-content">
        <h1 className="about-title">Intangible Coin</h1>
        <p className="about-description">
          Intangible Coin is a product that enables and encourages people to provide meaningful feedback to other people. We believe: relationships of all kinds can be a gratifying source of life fulfillment; some relationship benefits can't be bought, at any price; it is well-worth measuring things that matter but money can't buy.
        </p>
      </div>
      <Row className="about-team">
      <Col>
          <Image src={robert} alt="Robert" className="team-image" />
          <h3 className="team-title">CEO/Founder</h3>
          <p className="team-name">Robert Kenmore</p>
        </Col>
        <Col>
          <Image src={pape} alt="Pape" className="team-image" />
          <h3 className="team-title">Senior Developer</h3>
          <p className="team-name">Pape Ndiaye</p>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutScreen;
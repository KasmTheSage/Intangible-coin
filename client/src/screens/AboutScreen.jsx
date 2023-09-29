import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../actions/profile';
import pape from '../assets/pape.jpg';
import robert from '../assets/robert.jpeg';
import { Container, Row, Col, Image } from 'react-bootstrap';

const AboutScreen = ({ getCurrentProfile, profile: { profile, loading}}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  if (!loading && profile) {
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
  } else {
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
  }

};

AboutScreen.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(AboutScreen);
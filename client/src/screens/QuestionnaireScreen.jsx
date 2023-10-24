import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../actions/profile';
import { Form, Button } from 'react-bootstrap';

const Questionnaire = ({ createProfile, profile: { profile, loading } }) => {
  const [formData, setFormData] = useState({
    feedback: (!profile) ? false : profile.feedback,
    visibleInfo: {
      name: (!profile) ? false : profile.visibleInfo.name,
      dob: (!profile) ? false : profile.visibleInfo.dob,
      totalBalance: (!profile) ? false : profile.visibleInfo.totalBalance,
      activityHistory: (!profile) ? false : profile.visibleInfo.activityHistory,
      dataForage: (!profile) ? false : profile.visibleInfo.dataForage,
      experimental: (!profile) ? false : profile.visibleInfo.experimental
    }
  });
  const navigate = useNavigate();
  const { feedback, visibleInfo } = formData;

  const onChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: checked,
      visibleInfo: {
        ...prevState.visibleInfo,
        [name]: checked
      }
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    createProfile(formData);
    if (!loading && profile && profile.visibleInfo.experimental) {
      navigate('/optional');
    } else if (!loading && profile && !profile.visibleInfo.experimental) {
      navigate('/profile');
    }
  };

  return (
    <div className="questionnaire-container">
      <h2 className="questionnaire-heading">Required Questionnaire</h2>
      <Form onSubmit={onSubmit} className="questionnaire-form">
        <Form.Group controlId="feedback">
          <Form.Check
            className='checkbox'
            type="checkbox"
            label="Check here if you are comfortable offering as well as accepting negative feedback."
            name="feedback"
            checked={feedback}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group controlId="visibleInfo" className="visibleInfo-group">
          <Form.Label className='info-heading'>What information about yourself are you comfortable sharing with others?</Form.Label>
          <div className="checkbox-group">
            <Form.Check
              className='checkbox'
              type="checkbox"
              label="Name"
              name="name"
              checked={visibleInfo.name}
              onChange={onChange}
            />
            <Form.Check
              className='checkbox'
              type="checkbox"
              label="Date of Birth"
              name="dob"
              checked={visibleInfo.dob}
              onChange={onChange}
            />
            <Form.Check
              className='checkbox'
              type="checkbox"
              label="Total Coin Balance"
              name="totalBalance"
              checked={visibleInfo.totalBalance}
              onChange={onChange}
            />
            <Form.Check
              className='checkbox'
              type="checkbox"
              label="History of Activity"
              name="activityHistory"
              checked={visibleInfo.activityHistory}
              onChange={onChange}
            />
          </div>
        </Form.Group>
        <Form.Group controlId="dataForage">
          <Form.Check
            className='checkbox'
            type="checkbox"
            label="Check here if it is ok for us to use your data, generically stripped of your identity, strictly for internal research purposes, aimed at improving everyone's user experience."
            name="dataForage"
            checked={visibleInfo.dataForage}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group controlId="experimental">
          <Form.Check
            className='checkbox'
            type="checkbox"
            label="Check here if you would like your account to include new features and functionalities under development."
            name="experimental"
            checked={visibleInfo.experimental}
            onChange={onChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="submit-button">
          Submit
        </Button>
      </Form>
    </div>
  );
};

Questionnaire.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile })(Questionnaire);
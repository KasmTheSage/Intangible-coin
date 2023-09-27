import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../actions/profile';

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
    setFormData({
      ...formData,
      [name]: checked,
      visibleInfo: {
        ...visibleInfo,
        [name]: checked
      }
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    createProfile(formData);
    if (!loading && profile && !profile.visibleInfo.experimental) {
      navigate('/optional');
    } else if (!loading && profile && profile.visibleInfo.experimental) {
      navigate('/profile');
    }
  };

  return (
    <div className="questionnaire-container">
      <h2 className="questionnaire-heading">Required Questionnaire</h2>
      <form className="questionnaire-form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label className="form-label">
            Check here if you are comfortable offering as well as accepting negative feedback.
          </label>
          <input
            className="form-input"
            type="checkbox"
            name="feedback"
            checked={feedback}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">
            What information about yourself are you comfortable sharing with others?
          </label>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="name"
                checked={visibleInfo.name}
                onChange={(e) => onChange(e)}
              />
              Name
            </label>
            <label>
              <input
                type="checkbox"
                name="dob"
                checked={visibleInfo.dob}
                onChange={(e) => onChange(e)}
              />
              Date of birth
            </label>
            <label>
              <input
                type="checkbox"
                name="totalBalance"
                checked={visibleInfo.totalBalance}
                onChange={(e) => onChange(e)}
              />
              Total coin balance
            </label>
            <label>
              <input
                type="checkbox"
                name="activityHistory"
                checked={visibleInfo.activityHistory}
                onChange={(e) => onChange(e)}
              />
              History of activity
            </label>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">
            Is it ok for us to use your data, generically stripped of your identity,
            strictly for internal research purposes, aimed at improving everyone's user
            experience?
          </label>
          <input
            className="form-input"
            type="checkbox"
            name="dataForage"
            checked={visibleInfo.dataForage}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">
            Would you like your account to include new features and functionalities under
            development?
          </label>
          <input
            className="form-input"
            type="checkbox"
            name="experimental"
            checked={visibleInfo.experimental}
            onChange={(e) => onChange(e)}
          />
        </div>
        <button className="submit-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

Questionnaire.propTypes = {
  createProfile: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps, { createProfile })(Questionnaire);
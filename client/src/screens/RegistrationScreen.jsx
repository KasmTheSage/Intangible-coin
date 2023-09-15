import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../actions/auth';
import { setAlert } from '../actions/alert';
import PropTypes from 'prop-types';


const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    password: ''
  });

  const { firstName, middleName, lastName, dateOfBirth, email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const navigate = useNavigate();

  const onSubmit = async e => {
    e.preventDefault();
    try {
      register({
        firstName,
        middleName,
        lastName,
        dateOfBirth,
        email,
        password
      });
    } catch (err) {
      const errmessage = err.response.data.message;
      setAlert(errmessage, 'danger');
    }
  };

  if (isAuthenticated) {
    navigate('/questionnaire');
  };

  return (
    <div className="register-container">
      <h2 className="register-heading">Register</h2>
      <form className="register-form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <label className="form-label">First Name:</label>
          <input
            className="form-input"
            type="text"
            name="firstName"
            value={firstName}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Middle Name:</label>
          <input
            className="form-input"
            type="text"
            name="middleName"
            value={middleName}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Last Name:</label>
          <input
            className="form-input"
            type="text"
            name="lastName"
            value={lastName}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Date of Birth:</label>
          <input
            className="form-input"
            type="date"
            name="dateOfBirth"
            value={dateOfBirth}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Email:</label>
          <input
            className="form-input"
            type="email"
            name="email"
            value={email}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password:</label>
          <input
            className="form-input"
            type="password"
            name="password"
            value={password}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <button className="register-button" type="submit">Register</button>
      </form>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { setAlert, register }
)(Register);
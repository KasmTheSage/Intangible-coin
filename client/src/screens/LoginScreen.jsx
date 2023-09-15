import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../actions/alert';
import { login } from '../actions/auth';
import PropTypes from 'prop-types';

const Login = ({ setAlert, login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const navigate = useNavigate();

  const onSubmit = async e => {
    e.preventDefault();

    try {
        login(email, password);
    } catch (err) {
        const errmessage = err.response.data.message;
        setAlert(errmessage, 'danger');
    }
  }

  if (isAuthenticated) {
    navigate('/profile');
  }

  return (
    <div className="login-container">
      <h2 className="login-heading">Login</h2>
      <form className="login-form" onSubmit={e => onSubmit(e)}>
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
          <button className="login-button" type="submit">Login</button>
      </form>
    </div>
  );
};

Login.propTypes = {
    setAlert: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, login })(Login);
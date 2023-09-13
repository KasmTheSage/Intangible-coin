import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../actions/alert';
import axios from 'axios';
import PropTypes from 'prop-types';

const Login = ({ setAlert }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  //const navigate = useNavigate();

  const onSubmit = async e => {
    e.preventDefault();

    const user = {
        email,
        password
    };

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify(user);

        const res = await axios.post('/api/auth', body, config);
        console.log(res.data);
        //navigate('/profile');
    } catch (err) {
        const errmessage = err.response.data.message;
        setAlert(errmessage, 'danger');
    }
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
    setAlert: PropTypes.func.isRequired
};

export default connect(null, { setAlert })(Login);
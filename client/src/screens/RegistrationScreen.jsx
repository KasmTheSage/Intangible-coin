import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
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
      const newUser = {
        firstName,
        middleName,
        lastName,
        dateOfBirth,
        email,
        password
      };

      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const body = JSON.stringify(newUser);
      const res = await axios.post('/api/users', body, config);
      console.log(res.data);
        navigate('/questionnaire');
    } catch (err) {
      console.error(err.response.data);
      // Handle registration error, such as displaying an error message to the user
    }
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

export default Register;
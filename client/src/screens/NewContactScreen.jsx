import React, { useState } from 'react'; 
import PropTypes from 'prop-types'; 
import { useNavigate } from 'react-router-dom'; 
import { connect } from 'react-redux'; 
import { saveContact } from '../actions/profile'; 
import { Form, Button } from 'react-bootstrap'; 

const NewContactScreen = ({ saveContact }) => { 
  const [formData, setFormData] = useState({ 
    firstName: '', 
    middleName: '', 
    lastName: '', 
    email: '', 
    phoneNumber: '', 
    type: { 
      significantOther: false, 
      intimateOther: false, 
      family: false, 
      friend: false, 
      school: false, 
      work: false, 
      activeAcquaintance: false, 
      passiveAcquaintance: false, 
      other: false, 
    }, 
  }); 

  const navigate = useNavigate();

  const { firstName, middleName, lastName, email, phoneNumber, type } = formData; 

  const handleChange = (e) => { 
    const { name, value, type, checked } = e.target; 
    const newValue = type === 'checkbox' ? checked : value; 
    if (name.startsWith('type.')) { 
      const typeField = name.substring(5); 
      setFormData({ 
        ...formData, 
        type: { 
          ...type, 
          [typeField]: newValue, 
        }, 
      }); 
    } else { 
      setFormData({ ...formData, [name]: newValue }); 
    } 
  }; 

  const handleSubmit = (e) => { 
    e.preventDefault(); 
    saveContact(formData); 
    navigate('/profile'); 
  }; 

  return ( 
    <div className="new-contact-container"> 
      <h2 className="new-contact-heading">New Contact</h2> 
      <Form onSubmit={handleSubmit} className="new-contact-form"> 
        <Form.Group controlId="firstName"> 
          <Form.Label>First Name</Form.Label> 
          <Form.Control 
            type="text" 
            name="firstName" 
            value={firstName} 
            onChange={handleChange} 
            required 
          /> 
        </Form.Group> 
        <Form.Group controlId="middleName"> 
          <Form.Label>Middle Name</Form.Label> 
          <Form.Control 
            type="text" 
            name="middleName" 
            value={middleName} 
            onChange={handleChange} 
          /> 
        </Form.Group> 
        <Form.Group controlId="lastName"> 
          <Form.Label>Last Name</Form.Label> 
          <Form.Control 
            type="text" 
            name="lastName" 
            value={lastName} 
            onChange={handleChange} 
            required 
          /> 
        </Form.Group> 
        <Form.Group controlId="email"> 
          <Form.Label>Email</Form.Label> 
          <Form.Control 
            type="email" 
            name="email" 
            value={email} 
            onChange={handleChange} 
            required 
          /> 
        </Form.Group> 
        <Form.Group controlId="phoneNumber"> 
          <Form.Label>Phone Number</Form.Label> 
          <Form.Control 
            type="tel" 
            name="phoneNumber" 
            value={phoneNumber} 
            onChange={handleChange} 
            required 
          /> 
        </Form.Group> 
        <Form.Group controlId="type.significantOther"> 
          <Form.Check 
            type="checkbox" 
            label="Significant Other" 
            name="type.significantOther" 
            checked={type.significantOther} 
            onChange={handleChange} 
          /> 
        </Form.Group> 
        <Form.Group controlId="type.intimateOther"> 
          <Form.Check 
            type="checkbox" 
            label="Intimate Other" 
            name="type.intimateOther" 
            checked={type.intimateOther} 
            onChange={handleChange} 
          /> 
        </Form.Group> 
        <Form.Group controlId="type.family"> 
          <Form.Check 
            type="checkbox" 
            label="Family" 
            name="type.family" 
            checked={type.family} 
            onChange={handleChange} 
          /> 
        </Form.Group> 
        <Form.Group controlId="type.friend"> 
          <Form.Check 
            type="checkbox" 
            label="Friend" 
            name="type.friend" 
            checked={type.friend} 
            onChange={handleChange} 
          /> 
        </Form.Group> 
        <Form.Group controlId="type.school"> 
          <Form.Check 
            type="checkbox" 
            label="School" 
            name="type.school" 
            checked={type.school} 
            onChange={handleChange} 
          /> 
        </Form.Group> 
        <Form.Group controlId="type.work"> 
          <Form.Check 
            type="checkbox" 
            label="Work" 
            name="type.work" 
            checked={type.work} 
            onChange={handleChange} 
          /> 
        </Form.Group> 
        <Form.Group controlId="type.activeAcquaintance"> 
          <Form.Check 
            type="checkbox" 
            label="Active Acquaintance" 
            name="type.activeAcquaintance" 
            checked={type.activeAcquaintance} 
            onChange={handleChange} 
          /> 
        </Form.Group> 
        <Form.Group controlId="type.passiveAcquaintance"> 
          <Form.Check 
            type="checkbox" 
            label="Passive Acquaintance" 
            name="type.passiveAcquaintance" 
            checked={type.passiveAcquaintance} 
            onChange={handleChange} 
          /> 
        </Form.Group> 
        <Form.Group controlId="type.other"> 
          <Form.Check 
            type="checkbox" 
            label="Other" 
            name="type.other" 
            checked={type.other} 
            onChange={handleChange} 
          /> 
        </Form.Group> 
        <Button variant="primary" type="submit" className="save-contact-button"> 
          Save Contact 
        </Button> 
      </Form> 
    </div> 
  ); 
}; 

NewContactScreen.propTypes = { 
  saveContact: PropTypes.func.isRequired, 
}; 

export default connect(null, { saveContact })(NewContactScreen);
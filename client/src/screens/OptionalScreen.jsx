import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const OptionalScreen = () => {
  const [lifeSatisfaction, setLifeSatisfaction] = useState(50);

  const handleLifeSatisfactionChange = (e) => {
    setLifeSatisfaction(parseInt(e.target.value));
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/profile');
  }

  return (
    <Container>
      <h1 className="optional-screen-title">Optional Questionnaire</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="healthWellbeing">
          <Form.Label className="question-label">How is your health & overall well-being?</Form.Label>
          <Form.Select className="custom-select">
            <option>Excellent</option>
            <option>Good</option>
            <option>Fair</option>
            <option>Poor</option>
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="lifeSatisfaction">
          <Form.Label className="question-label">Overall, how satisfied are you with your life?</Form.Label>
          <Form.Range
            min={0}
            max={100}
            value={lifeSatisfaction}
            onChange={handleLifeSatisfactionChange}
            className="custom-range"
          />
          <p className="life-satisfaction-value">{lifeSatisfaction}%</p>
        </Form.Group>
        <Button variant="primary" type="submit" className="submit-button">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default OptionalScreen;
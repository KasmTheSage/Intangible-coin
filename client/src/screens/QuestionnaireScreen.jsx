import React, { useState } from 'react';

const Questionnaire = () => {
  const [formData, setFormData] = useState({
    feedback: false,
    visibleInfo: {
      name: false,
      dob: false,
      totalBalance: false,
      activityHistory: false,
      dataForage: false,
      experimental: false
    }
  });

  const { feedback, visibleInfo } = formData;

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked
      });
    } else {
      setFormData({
        ...formData,
        visibleInfo: {
          ...visibleInfo,
          [name]: value
        }
      });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div className="questionnaire-container">
      <h2 className="questionnaire-heading">Questionnaire</h2>
      <form className="questionnaire-form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label className="form-label">
            Are you comfortable both offering and accepting negative feedback?
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
            What information about yourself are you comfortable being visible?
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

export default Questionnaire;
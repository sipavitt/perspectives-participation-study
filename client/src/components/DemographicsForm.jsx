import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitDemographics } from '../api';
import WithdrawButton from './WithdrawButton';


const DemographicsForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    education: '',
    employment: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const code = localStorage.getItem('participantCode');
    try {
      await submitDemographics({ code, demographics: formData });
      navigate('/intervention-info');
    } catch (err) {
      alert("Error submitting demographics. Please try again.");
    }
  };

  return (
  <div className="container">
    <div className="question-block">
      <h2>Demographics</h2>

      <label>Age:</label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />

      <label>Gender:</label>
        <select
          name="gender"
          id="gender"
          value={formData.gender}
          onChange={handleChange}
          style={{ display: 'block', marginBottom: '1rem' }}
        >
          <option value="">Select...</option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
          <option value="Non-binary">Non-binary</option>
          <option value="Prefer not to say">Prefer not to say</option>
        </select>

      <label>Highest Education Level:</label>
        <select
          name="education"
          id="education"
          value={formData.education}
          onChange={handleChange}
          style={{ display: 'block', marginBottom: '1rem' }}
        >
          <option value="">Select...</option>
          <option value="GCSE or equivalent">GCSE or equivalent</option>
          <option value="A-level or equivalent">A-level or equivalent</option>
          <option value="Undergraduate degree">Undergraduate degree</option>
          <option value="Postgraduate degree">Postgraduate degree</option>
        </select>

      <label>Current Employment Status:</label>
        <select
          name="employment"
          id="employment"
          value={formData.employment}
          onChange={handleChange}
          style={{ display: 'block', marginBottom: '1rem' }}
        >
          <option value="">Select...</option>
          <option value="Employed full-time">Employed full-time</option>
          <option value="Employed part-time">Employed part-time</option>
          <option value="Self-employed">Self-employed</option>
          <option value="Unemployed">Unemployed</option>
          <option value="Student">Student</option>
          <option value="Retired">Retired</option>
        </select>

      <div className="button-row">
        <WithdrawButton />
        <button onClick={handleSubmit}>Continue</button>
      </div>

    </div>
</div>
  );
};

export default DemographicsForm;

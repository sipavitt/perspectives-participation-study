import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitDemographics } from '../api';
import WithdrawButton from './WithdrawButton';

const DemographicsForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    age: '',
    preferNotToSay: false,
    gender: '',
    experience: '',
    expectedTraining: '',
    priorAttack: '',
    openText: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = () => {
    setForm(prev => ({
      ...prev,
      preferNotToSay: !prev.preferNotToSay,
      age: !form.preferNotToSay ? '' : form.age
    }));
  };

  const handleSubmit = async () => {
    const code = localStorage.getItem('participantCode');
    try {
      await submitDemographics({ code, demographics: form });
      navigate('/intervention-info');
    } catch (err) {
      console.error("Submission failed:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>Demographics</h2>
      <div className="survey-section">
        <label>
          What is your age?
          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            disabled={form.preferNotToSay}
          />
        </label>
        <label>
          <input
            type="checkbox"
            checked={form.preferNotToSay}
            onChange={handleCheckbox}
          />
          I’d rather not say
        </label>
        <hr />

        <label>
          What is your gender?
          <select name="gender" value={form.gender} onChange={handleChange}>
            <option value="">Select an option</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Other">Other</option>
            <option value="Prefer not to say">I'd rather not say</option>
          </select>
        </label>
        <hr />

        <label>
          My cyber-security experience is…
          <select name="experience" value={form.experience} onChange={handleChange}>
            <option value="">Select an option</option>
            <option value="None">None</option>
            <option value="Exposed at work as a non-specialist">Exposed to it in the workplace as a non-specialist</option>
            <option value="Cyber security professional">I am a cyber security professional</option>
            <option value="Other security professional">I am another kind of security professional</option>
            <option value="Previously involved">I am no longer involved with cyber but have prior experience</option>
          </select>
        </label>
        <hr />

        <fieldset>
          <legend>I am expected to complete cyber-security training in my job</legend>
          <label><input type="radio" name="expectedTraining" value="Yes" onChange={handleChange} /> Yes</label>
          <label><input type="radio" name="expectedTraining" value="No" onChange={handleChange} /> No</label>
          <label><input type="radio" name="expectedTraining" value="N/A" onChange={handleChange} /> N/A</label>
        </fieldset>
        <hr />

        <label>
          I have experience with a cyber-attack
          <select name="priorAttack" value={form.priorAttack} onChange={handleChange}>
            <option value="">Select an option</option>
            <option value="No">No</option>
            <option value="Personal experience">I have personal experience of cybercrime outside work</option>
            <option value="Employer attacked">My employer was attacked</option>
            <option value="Involved in response">I was involved in the response to an attack in my organisation</option>
            <option value="Prefer not to say">I’d rather not say</option>
          </select>
        </label>
        <hr />

        <label>
          Is there anything else you would like to tell us about your background or experience relevant to this study?
          <textarea
            name="openText"
            value={form.openText}
            onChange={handleChange}
            rows={4}
            placeholder="Enter your response"
          />
        </label>
      </div>

      <div className="button-row">
        <WithdrawButton />
        <button onClick={handleSubmit}>Continue</button>
      </div>
    </div>
  );
};

export default DemographicsForm;

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
    exposureDuration: '',
    fictionEngagement: '',
    gamingEngagement: '',
    openText: ''
  });
  const [ageWarning, setAgeWarning] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));

    if (name === 'age') {
      const num = parseInt(value);
      if (!isNaN(num) && (num < 18 || num > 65)) {
        setAgeWarning('This study is only open to participants aged between 18 and 65.');
      } else {
        setAgeWarning('');
      }
    }
  };

  const handleCheckbox = () => {
    setForm(prev => ({
      ...prev,
      preferNotToSay: !prev.preferNotToSay,
      age: !form.preferNotToSay ? '' : form.age
    }));
    setAgeWarning('');
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
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', gap: '1rem' }}>
          <label style={{ flexGrow: 1 }}>
            What is your age?<br />
            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              disabled={form.preferNotToSay}
            />
          </label>
          <label style={{ whiteSpace: 'nowrap' }}>
            <input
              type="checkbox"
              checked={form.preferNotToSay}
              onChange={handleCheckbox}
            />
            I’d rather not say
          </label>
        </div>
        {ageWarning && (
          <div style={{ marginBottom: '1rem', color: '#990000', fontWeight: 'bold' }}>{ageWarning}</div>
        )}
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

        <fieldset style={{ border: 'none', padding: 0, marginBottom: '1rem' }}>
          <legend style={{ marginBottom: '0.5rem' }}>I am expected to complete cyber-security training in my job</legend>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <label><input type="radio" name="expectedTraining" value="Yes" onChange={handleChange} /> Yes</label>
            <label><input type="radio" name="expectedTraining" value="No" onChange={handleChange} /> No</label>
            <label><input type="radio" name="expectedTraining" value="N/A" onChange={handleChange} /> N/A</label>
          </div>
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
          I have been exposed to cyber-security for…
          <select name="exposureDuration" value={form.exposureDuration} onChange={handleChange}>
            <option value="">Select an option</option>
            <option value="0 years">0 years</option>
            <option value="1-2 years">1–2 years</option>
            <option value="3-5 years">3–5 years</option>
            <option value="5-10 years">5–10 years</option>
            <option value="11+ years">11+ years</option>
          </select>
        </label>
        <hr />

        <label>
          I watch movies, tv, or read fiction books…
          <select name="fictionEngagement" value={form.fictionEngagement} onChange={handleChange}>
            <option value="">Select an option</option>
            <option value="Never">Never</option>
            <option value="Rarely">Rarely</option>
            <option value="Sometimes">Sometimes</option>
            <option value="Often">Often</option>
            <option value="Enthusiast">Enthusiast</option>
          </select>
        </label>
        <hr />

        <label>
          I play video games or board games…
          <select name="gamingEngagement" value={form.gamingEngagement} onChange={handleChange}>
            <option value="">Select an option</option>
            <option value="Never">Never</option>
            <option value="Rarely">Rarely</option>
            <option value="Sometimes">Sometimes</option>
            <option value="Often">Often</option>
            <option value="Avid gamer">Avid gamer</option>
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

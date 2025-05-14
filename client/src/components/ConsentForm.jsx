import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitConsent } from '../api';
import WithdrawButton from './WithdrawButton';


const ConsentForm = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState([false, false, false, false]);

  const consentText = [
    "I understand that my participation is voluntary.",
    "I understand I can withdraw at any time before submission.",
    "I confirm I am 18 years or older.",
    "I consent to participate in this academic research study."
  ];

  const handleChange = (index) => {
    const updated = [...checked];
    updated[index] = !updated[index];
    setChecked(updated);
  };

  const handleSubmit = async () => {
    if (checked.every(Boolean)) {
      try {
        const code = localStorage.getItem('participantCode');
        await submitConsent({ code, consent: checked });
        navigate('/demographics');
      } catch (err) {
        console.error("Consent submission error:", err);
        alert("Error submitting consent. Please try again.");
      }
    } else {
      alert("Please agree to all statements before continuing.");
    }
  };

  return (
    <div className="container">
      <h2>Consent Form</h2>
      <p>Please confirm the following:</p>
      {consentText.map((text, i) => (
  <div key={i} className="question-block">
    <label style={{ display: 'flex', alignItems: 'center' }}>
      <input
        type="checkbox"
        checked={checked[i]}
        onChange={() => handleChange(i)}
      />
      <span style={{ marginLeft: '0.5rem' }}>{text}</span>
    </label>
  </div>
))}

      <div className="button-row">
        <WithdrawButton />
        <button onClick={handleSubmit}>Continue</button>
      </div>

    </div>
  );
};

export default ConsentForm;

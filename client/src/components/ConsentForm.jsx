import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitConsent } from '../api';
import WithdrawButton from './WithdrawButton';

const ConsentForm = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(new Array(8).fill(false));

  const consentText = [
    "I have read and understood the participant information sheet dated 18 May 2025.",
    "I have been able to ask questions about the study and my questions have been answered to my satisfaction.",
    "I voluntarily give my consent to be a participant in this study and understand that I can withdraw from the study without providing a reason up until final submission of the motivation questionnaire by clicking the “Withdraw from study” button.",
    "I understand that if I withdraw before the final submission point, all my data will be deleted but if I withdraw after, it will no longer be possible to delete my data.",
    "I understand that information I provide will be used for research publications and presentations.",
    "I agree that statements I make in the questionnaire can be quoted anonymously in research outputs.",
    "I understand that I will not be asked for any sensitive personal information.",
    "I give permission for the data I provide to be deposited in a specialist data centre after it has been anonymised, so it can be used for future research and learning. It will not be used commercially. My consent will be retained digitally, separate from the data itself until my data is destroyed."
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
        await submitConsent({ code, consentGiven: true });  // single boolean
        navigate('/demographics');
      } catch (err) {
        console.error("Consent submission error:", err);
        alert("Error submitting consent. Please try again.");
      }
    } else {
      alert("Please agree to all items before continuing.");
    }
  };

  return (
    <div className="container">
      <h2>Consent Form</h2>
      <p>Please tick all boxes to confirm your understanding and agreement:</p>

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
        <button onClick={handleSubmit}>I Accept</button>
      </div>

      <p style={{ fontSize: '0.9rem', marginTop: '2rem' }}>
        This project has been reviewed by, and received a favourable opinion from, the OU Human Research Ethics Committee – HREC reference number: XXXX.<br />
        <a href="http://www.open.ac.uk/research/ethics/" target="_blank" rel="noopener noreferrer">
          http://www.open.ac.uk/research/ethics/
        </a>
      </p>
    </div>
  );
};

export default ConsentForm;

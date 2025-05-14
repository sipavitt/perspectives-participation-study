import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitPostSurvey } from '../api';
import WithdrawButton from './WithdrawButton';


const likertOptions = [
  "Strongly disagree",
  "Disagree",
  "Neutral",
  "Agree",
  "Strongly agree"
];

const questions = [
  "I felt in control during the experience.",
  "The activity was enjoyable.",
  "I learned something useful.",
  "I was motivated to complete the task.",
  "I would recommend this to others."
];

const PostSurvey = () => {
  const navigate = useNavigate();
  const [responses, setResponses] = useState(Array(questions.length).fill(""));
  const [finalConfirm, setFinalConfirm] = useState(false);

const handleChange = (index, value) => {
    const updated = [...responses];
    updated[index] = value;
    setResponses(updated);
  };

const handleSubmit = async () => {
    if (responses.includes("")) {
      alert("Please answer all questions.");
      return;
    }
if (!finalConfirm) {
  alert("Please acknowledge that you understand withdrawal will no longer be possible after submission.");
  return;
}




    const code = localStorage.getItem('participantCode');
    try {
      await submitPostSurvey({ code, responses });
      navigate('/thankyou');
    } catch (err) {
      alert("Error submitting survey.");
    }
  };

  return (
    <div className="container">
      <h2>Post-Experience Survey</h2>
      {questions.map((q, i) => (
        <div key={i} className="question-block">
          <label>{q}</label>
          <div className="likert-options">
          {likertOptions.map((option, j) => (
            <label key={j}>
              <input
                type="radio"
                name={`q${i}`}
                value={option}
                checked={responses[i] === option}
                onChange={() => handleChange(i, option)}
              />
              {option}
            </label>
          ))}
        </div>
      </div>
      ))}

<div className="withdraw-warning">
  <label style={{ display: 'flex', alignItems: 'center' }}>
    <input
      type="checkbox"
      checked={finalConfirm}
      onChange={() => setFinalConfirm(!finalConfirm)}
      style={{ marginRight: '0.5rem' }}
    />
    By continuing, you acknowledge that you will no longer be able to withdraw from this study as your data will be anonymised.
  </label>
</div>

      <div className="button-row">
        <WithdrawButton />
        <button onClick={handleSubmit}>Continue</button>
      </div>

    </div>
  );
};

export default PostSurvey;

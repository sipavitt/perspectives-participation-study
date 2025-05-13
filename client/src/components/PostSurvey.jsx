import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitPostSurvey } from '../api';

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
        <div key={i} style={{ marginBottom: '1rem' }}>
          <p>{q}</p>
          {likertOptions.map((option, j) => (
            <label key={j} style={{ marginRight: '1rem' }}>
              <input
                type="radio"
                name={`q${i}`}
                value={option}
                checked={responses[i] === option}
                onChange={() => handleChange(i, option)}
              />{' '}
              {option}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit Survey</button>
    </div>
  );
};

export default PostSurvey;

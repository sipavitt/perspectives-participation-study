import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import WithdrawButton from './WithdrawButton';
import StandardAttentionChecks from './StandardAttentionChecks';
import ControlAttentionChecks from './ControlAttentionChecks';

const PostSurvey = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const group = location.state?.group || parseInt(localStorage.getItem('group'), 10);

  const [responses, setResponses] = useState({
    q1: '', q2: '', q3: '',
    q4: 5, q5: 5, q6: 5,
    ...Array.from({ length: 16 }, (_, i) => ({ [`q${i + 7}`]: '' })).reduce((a, b) => ({ ...a, ...b }), {})
  });

  const handleRadioChange = (qKey, value) => {
    setResponses(prev => ({ ...prev, [qKey]: parseInt(value) }));
  };

  const handleSliderChange = (qKey, value) => {
    setResponses(prev => ({ ...prev, [qKey]: parseInt(value) }));
  };

  const handleLikertChange = (index, value) => {
    const key = `q${index + 7}`;
    setResponses(prev => ({ ...prev, [key]: parseInt(value) }));
  };

  const likertItems = [
    "…because I think that these activities are interesting.",
    "…because I think that these activities are pleasant.",
    "…because I think that these activities are fun.",
    "…because I feel good when doing these activities.",
    "…because I am doing it for my own good.",
    "…because I think that these activities are good for me.",
    "…because I decided that these activities are beneficial.",
    "…because I believe that these activities are important to me.",
    "…because I am supposed to do it.",
    "…because it is something that I have to do.",
    "…because I don’t have any choice.",
    "…because I feel that I have to do it.",
    "…but I am not sure if it is worth it.",
    "…but I don’t see what the activity brings me.",
    "…but I am not sure it is a good thing.",
    "…but personally I don’t see any good reasons to do these activities."
  ];

  const handleSubmit = () => {
    const requiredKeys = ['q1', 'q2', 'q3', ...Array.from({ length: 16 }, (_, i) => `q${i + 7}`)];
    const missing = requiredKeys.some(k => responses[k] === '' || responses[k] == null);

    if (missing) {
      alert("Please complete all questions.");
      return;
    }
    navigate('/post-survey-2', { state: { responses } });
  };

  if (!group) {
    return <p>Error: Group assignment missing. Please refresh or restart.</p>;
  }

  return (
    <div className="container">
      <h2>Post-Experience Survey – Page 1 of 2</h2>

      {group === 5 ? (
        <ControlAttentionChecks values={responses} handleChange={handleRadioChange} />
      ) : (
        <StandardAttentionChecks values={responses} handleChange={handleRadioChange} />
      )}

      <h3>Behavioural Intention</h3>
      <div className="survey-section">
        {[
          { key: "q4", label: "Likelihood you will verify the identity of people following you into restricted work areas" },
          { key: "q5", label: "Likelihood you will report strange or unauthorised USB devices" },
          { key: "q6", label: "Likelihood you will challenge someone acting suspiciously in the workplace" }
        ].map(({ key, label }) => (
          <div key={key} className="question-block">
            <label>{label}</label>
            <input
              type="range"
              min="0"
              max="10"
              value={responses[key]}
              onChange={e => handleSliderChange(key, e.target.value)}
            />
            <div className="slider-labels">
              <span>Extremely unlikely</span><span>Extremely likely</span>
            </div>
          </div>
        ))}
      </div>

      <h3>Response Performance Motivation</h3>
      <p><strong>Please indicate your level of agreement with the following statements:</strong></p>
      <div className="survey-section">
        {likertItems.map((q, i) => (
          <div key={i} className="likert-question">
            <label>{q}</label>
            <div className="likert-options">
              {[1, 2, 3, 4, 5].map(value => (
                <label key={value}>
                  <input
                    type="radio"
                    name={`q${i + 7}`}
                    value={value}
                    checked={responses[`q${i + 7}`] === value}
                    onChange={() => handleLikertChange(i, value)}
                  />
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="button-row">
        <WithdrawButton />
        <button onClick={handleSubmit}>Continue to Page 2</button>
      </div>
    </div>
  );
};

export default PostSurvey;

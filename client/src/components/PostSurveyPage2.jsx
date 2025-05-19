import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { submitPostSurvey } from '../api';
import WithdrawButton from './WithdrawButton';

const sections = {
  "Threat Severity": [
    "If a hacker followed me into a secure area of my workplace, it would be severe.",
    "If hacker plugged in an unauthorised USB device, it would be serious.",
    "If someone were to do something suspicious but no-one challenged them, it would be significant."
  ],
  "Threat Susceptibility": [
    "My workplace is at risk of having someone gain unauthorised access.",
    "It is likely that someone might get away with doing something suspicious without being challenged.",
    "It is possible that someone might install an unauthorised USB device."
  ],
  "Response Efficacy": [
    "Challenging suspicious behaviour works for protection.",
    "Challenging suspicious behaviour is effective for protection.",
    "When suspicious behaviours are challenged, your workplace is more likely to be protected."
  ],
  "Self-Efficacy": [
    "Cyber security behaviours are easy to do.",
    "Challenging suspicious behaviour is convenient.",
    "I am able to challenge suspicious behaviour without much effort."
  ],
  "Response Cost": [
    "Responding to suspicious behaviour is time consuming for me.",
    "Responding to suspicious behaviour is burdensome for me.",
    "Responding to suspicious behaviour is financially costly for me.",
    "Responding to suspicious behaviour would require too much from me.",
    "Responding to suspicious behaviour is not worth it."
  ],
  "Autonomy": [
    "I would take steps similar to what was shown in the intervention.",
    "I feel that the security information I have been given fits perfectly with what I should do if I were to witness suspicious behaviour.",
    "I feel that the security information I have been given is an expression of my own preferences.",
    "I feel that I have the opportunity to make choices as to what I ought to do, based on the intervention I took part in."
  ],
  "Competence": [
    "I feel I have a better understanding of how to challenge suspicious behaviour.",
    "I feel that I effectively learned about challenging suspicious behaviour.",
    "I feel that I did a good job learning about challenging suspicious behaviour.",
    "I feel that I can manage the requirements of learning more about challenging suspicious behaviour."
  ],
  "Relatedness": [
    "I feel a strong connection with the security of my workplace.",
    "If my workplace is affected by a cyber-attack, then so am I.",
    "The thought of my workplace being targeted with a cyber-attack makes me anxious.",
    "Protecting the workplace against hackers is a way to protect myself."
  ]
};

const PostSurveyPage2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const previousResponses = location.state?.responses || {};
  const [responses, setResponses] = useState(
    Object.fromEntries(Array.from({ length: 29 }, (_, i) => [`q${i + 23}`, '' ]))
  );
  const [finalConfirm, setFinalConfirm] = useState(false);

  const handleLikertChange = (key, value) => {
    setResponses(prev => ({ ...prev, [key]: parseInt(value) }));
  };

  const handleSubmit = async () => {
    if (Object.values(responses).some(v => v === '')) {
      alert("Please complete all remaining questions.");
      return;
    }

    if (!finalConfirm) {
      alert("Please confirm withdrawal notice before submitting.");
      return;
    }

    const allResponses = { ...previousResponses, ...responses };
    const code = localStorage.getItem('participantCode');

    try {
      await submitPostSurvey({ code, responses: allResponses });
      navigate('/thankyou');
    } catch (err) {
      alert("Error submitting post-survey.");
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>Post-Experience Survey – Page 2 of 2</h2>
      

      {Object.entries(sections).map(([sectionTitle, items]) => (
        <div key={sectionTitle} className="survey-section">
          <h3>{sectionTitle}</h3>
          <div className="likert-scale-labels" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', gap: '1rem', marginBottom: '0.25rem', marginLeft: '1rem', marginRight: '1rem' }}>
  <span style={{ marginLeft: 'auto' }}>Strongly disagree</span>
  <span>Strongly agree</span>
</div>
          
          {items.map((q, i) => {
            const qNum = Object.values(sections).flat().findIndex(text => text === q) + 23;
            const key = `q${qNum}`;
            return (
              <div key={key} className="likert-question">
                <label>{q}</label>
                <div className="likert-options">
                  {[1, 2, 3, 4, 5].map(value => (
                    <label key={value}>
                      <input
                        type="radio"
                        name={key}
                        value={value}
                        checked={responses[key] === value}
                        onChange={() => handleLikertChange(key, value)}
                      />
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
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
        <button onClick={handleSubmit}>Submit Survey</button>
      </div>
    </div>
  );
};

export default PostSurveyPage2;

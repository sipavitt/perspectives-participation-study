import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitDemographics } from '../api';
import WithdrawButton from './WithdrawButton';

const DemographicsForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    age: '',
    preferNotToSay: false,
    q2: '',
    q3: '',
    q4: '',
    q5: '',
    q6: '',
    q7: '',
    q8: '',
    q9: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = () => {
    setForm(prev => ({
      ...prev,
      preferNotToSay: !prev.preferNotToSay,
      age: !form.preferNotToSay ? '' : form.age // clear age if opting out
    }));
  };

  const handleSubmit = async () => {
    const code = localStorage.getItem('participantCode');
    try {
      await submitDemographics({ code, demographics: form });
      navigate('/interstitial');
    } catch (err) {
      console.error("Submission failed:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>Demographics</h2>

      {/* Age with opt-out */}
      <label>
        Age:
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
        I'd rather not say
      </label>

      {/* Dropdowns (replace placeholders with real labels/values) */}
      <label>
        Question 2:
        <select name="q2" value={form.q2} onChange={handleChange}>
          <option value="">Select an option</option>
          <option value="Option 1">Option 1</option>
          <option value="Option 2">Option 2</option>
          <option value="Option 3">Option 3</option>
          <option value="Option 4">Option 4</option>
          <option value="Option 5">Option 5</option>
        </select>
      </label>

      <label>
        Question 3:
        <select name="q3" value={form.q3} onChange={handleChange}>
          <option value="">Select an option</option>
          <option value="Option A">Option A</option>
          <option value="Option B">Option B</option>
          <option value="Option C">Option C</option>
          <option value="Option D">Option D</option>
          <option value="Option E">Option E</option>
        </select>
      </label>

      {/* Radio buttons for Q4 */}
      <fieldset>
        <legend>Question 4:</legend>
        <label><input type="radio" name="q4" value="N/A" onChange={handleChange} /> N/A</label>
        <label><input type="radio" name="q4" value="Yes" onChange={handleChange} /> Yes</label>
        <label><input type="radio" name="q4" value="No" onChange={handleChange} /> No</label>
      </fieldset>

      {/* More dropdowns as placeholders */}
      <label>
        Question 5:
        <select name="q5" value={form.q5} onChange={handleChange}>
          <option value="">Select</option>
          <option value="One">One</option>
          <option value="Two">Two</option>
          <option value="Three">Three</option>
          <option value="Four">Four</option>
          <option value="Five">Five</option>
        </select>
      </label>

      <label>
        Question 6:
        <select name="q6" value={form.q6} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Red">Red</option>
          <option value="Green">Green</option>
          <option value="Blue">Blue</option>
          <option value="Yellow">Yellow</option>
          <option value="Purple">Purple</option>
        </select>
      </label>

      <label>
        Question 7:
        <select name="q7" value={form.q7} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Bird">Bird</option>
          <option value="Fish">Fish</option>
          <option value="Other">Other</option>
        </select>
      </label>

      <label>
        Question 8:
        <select name="q8" value={form.q8} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Choice A">Choice A</option>
          <option value="Choice B">Choice B</option>
          <option value="Choice C">Choice C</option>
          <option value="Choice D">Choice D</option>
          <option value="Choice E">Choice E</option>
        </select>
      </label>

      {/* Free text box */}
      <label>
        Question 9 (Open text):
        <textarea
          name="q9"
          value={form.q9}
          onChange={handleChange}
          rows={4}
          placeholder="Enter your response"
        />
      </label>

      {/* Button row */}
      <div className="button-row">
        <WithdrawButton />
        <button onClick={handleSubmit}>Continue</button>
      </div>
    </div>
  );
};

export default DemographicsForm;


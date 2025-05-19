import React from 'react';

const StandardAttentionChecks = ({ values, handleChange }) => (
  <>
    <div className="mb-4">
      <label className="block mb-1 font-semibold">
        To check you’re paying attention, select “Strongly disagree” for this question.
      </label>
      <select
        name="q1"
        value={values.q1 || ''}
        onChange={e => {
          const value = e.target.value === '' ? '' : parseInt(e.target.value, 10);
          handleChange(e.target.name, value);
        }}
        className="w-full border rounded p-2"
        required
      >
        <option value="">Select an option</option>
        <option value="1">Strongly disagree</option>
        <option value="2">Disagree</option>
        <option value="3">Neutral</option>
        <option value="4">Agree</option>
        <option value="5">Strongly agree</option>
      </select>
    </div>

    <div className="mb-4">
      <label className="block mb-1 font-semibold">
        What type of cyberattack was described in the intervention?
      </label>
      <select
        name="q2"
        value={values.q2 || ''}
        onChange={e => {
          const value = e.target.value === '' ? '' : parseInt(e.target.value, 10);
          handleChange(e.target.name, value);
        }}
        className="w-full border rounded p-2"
        required
      >
        <option value="">Select an option</option>
        <option value="1">Phishing</option>
        <option value="2">Malware</option>
        <option value="3">DDoS</option>
        <option value="4">Password spraying</option>
        <option value="5">None of the above</option>
      </select>
    </div>

    <div className="mb-4">
      <label className="block mb-1 font-semibold">
        The attacker in the scenario was portrayed as:
      </label>
      <select
        name="q3"
        value={values.q3 || ''}
        onChange={e => {
          const value = e.target.value === '' ? '' : parseInt(e.target.value, 10);
          handleChange(e.target.name, value);
        }}
        className="w-full border rounded p-2"
        required
      >
        <option value="">Select an option</option>
        <option value="1">Reckless</option>
        <option value="2">Strategic</option>
        <option value="3">Ethical</option>
        <option value="4">Incompetent</option>
        <option value="5">None of the above</option>
      </select>
    </div>
  </>
);

export default StandardAttentionChecks;

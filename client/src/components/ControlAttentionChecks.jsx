import React from 'react';

const ControlAttentionChecks = ({ values, handleChange }) => (
  <>
    <div className="mb-4">
      <label className="block mb-1 font-semibold">
        To check you’re paying attention, select “Strongly agree” for this question.
      </label>
      <select
        name="attention1"
        value={values.attention1 || ''}
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
        What colour is the sky on a clear day?
      </label>
      <select
        name="attention2"
        value={values.attention2 || ''}
        onChange={e => {
          const value = e.target.value === '' ? '' : parseInt(e.target.value, 10);
          handleChange(e.target.name, value);
        }}
        className="w-full border rounded p-2"
        required
      >
        <option value="">Select an option</option>
        <option value="1">Red</option>
        <option value="2">Blue</option>
        <option value="3">Green</option>
        <option value="4">Purple</option>
        <option value="5">Orange</option>
      </select>
    </div>

    <div className="mb-4">
      <label className="block mb-1 font-semibold">
        Which of these numbers is the largest?
      </label>
      <select
        name="attention3"
        value={values.attention3 || ''}
        onChange={e => {
          const value = e.target.value === '' ? '' : parseInt(e.target.value, 10);
          handleChange(e.target.name, value);
        }}
        className="w-full border rounded p-2"
        required
      >
        <option value="">Select an option</option>
        <option value="1">10</option>
        <option value="2">100</option>
        <option value="3">1000</option>
        <option value="4">10000</option>
        <option value="5">1</option>
      </select>
    </div>
  </>
);

export default ControlAttentionChecks;

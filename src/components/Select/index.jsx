import React from "react";

function Select({ options, value, handleChange }) {
  return (
    <select value={value} onChange={handleChange}>
      {options.map(option => (
        <option key={option} value={option.toLowerCase()}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default Select;

import React from 'react';

const BreakTypeSelector = ({ selectedBreakType, onBreakTypeChange }) => {
  return (
    <div>
      <label htmlFor="break-type">Select Break Type:</label>
      <select
        id="break-type"
        value={selectedBreakType}
        onChange={(e) => onBreakTypeChange(e.target.value)}
      >
        <option value="unpaid">Unpaid Break</option>
        <option value="paid">Paid Break</option>
      </select>
    </div>
  );
};

export default BreakTypeSelector;
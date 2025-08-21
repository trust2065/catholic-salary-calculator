import React from 'react';

type WorkTypeSelectorProps = {
  selectedWorkType: string;
  onWorkTypeChange: (workType: string) => void;
};

const WorkTypeSelector: React.FC<WorkTypeSelectorProps> = ({ selectedWorkType, onWorkTypeChange }) => {
  return (
    <div>
      <label htmlFor="work-type">Select Work Type:</label>
      <select
        id="work-type"
        value={selectedWorkType}
        onChange={(e) => onWorkTypeChange(e.target.value)}
      >
        <option value="Work">Work</option>
        <option value="UnPaid break">Unpaid Break</option>
        <option value="Paid break">Paid Break</option>
      </select>
    </div>
  );
};

export default WorkTypeSelector;
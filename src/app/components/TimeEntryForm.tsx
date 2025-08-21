import React, { useState } from 'react';

const TimeEntryForm = () => {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [breakTime, setBreakTime] = useState('');
  const [workType, setWorkType] = useState('unpaid');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!date || !startTime || !endTime) {
      setError('Please fill in all fields.');
      return;
    }
    // Additional validation can be added here
    setError('');
    // Handle form submission logic here
    console.log({ date, startTime, endTime, breakTime, workType });
  };

  return (
    <form onSubmit={handleSubmit} className="time-entry-form">
      <div>
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Start Time:</label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
      </div>
      <div>
        <label>End Time:</label>
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Break Time (in minutes):</label>
        <input
          type="number"
          value={breakTime}
          onChange={(e) => setBreakTime(e.target.value)}
        />
      </div>
      <div>
        <label>Work Type:</label>
        <select value={workType} onChange={(e) => setWorkType(e.target.value)}>
          <option value="unpaid">Unpaid</option>
          <option value="paid">Paid</option>
        </select>
      </div>
      {error && <p className="error">{error}</p>}
      <button type="submit">Submit</button>
    </form>
  );
};

export default TimeEntryForm;
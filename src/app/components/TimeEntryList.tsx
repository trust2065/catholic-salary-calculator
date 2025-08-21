import React from 'react';

interface TimeEntry {
  date: string;
  startTime: string;
  endTime: string;
  breakType: string;
  breakDuration: number; // in minutes
}

interface TimeEntryListProps {
  entries: TimeEntry[];
}

const TimeEntryList: React.FC<TimeEntryListProps> = ({ entries }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold">Recorded Time Entries</h2>
      <ul className="list-disc pl-5">
        {entries.map((entry, index) => (
          <li key={index} className="mb-2">
            <div>
              <strong>Date:</strong> {entry.date}
            </div>
            <div>
              <strong>Working Hours:</strong> {entry.startTime} - {entry.endTime}
            </div>
            <div>
              <strong>Break Type:</strong> {entry.breakType} ({entry.breakDuration} minutes)
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimeEntryList;
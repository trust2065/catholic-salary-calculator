import React from 'react';
import { TimeEntry } from '../types';

interface TimeEntryListProps {
  entries: TimeEntry[];
  onDelete: (entry: TimeEntry, index: number) => void;
}

const TimeEntryList: React.FC<TimeEntryListProps> = ({ entries, onDelete }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Saved Records</h2>
      <ul>
        {entries.map((entry, idx) => (
          <li key={entry.id ?? idx} className="flex items-center justify-between py-2 border-b">
            <span>
              {entry.date} {entry.startTime}-{entry.endTime} | {entry.workType}
            </span>
            <button
              className="ml-4 text-red-600 underline"
              onClick={() => onDelete(entry, idx)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimeEntryList;
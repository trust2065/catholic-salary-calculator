import React from "react";
import { TimeEntry } from '../types';

function timeToMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function minutesToHHMM(mins: number) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h}:${m.toString().padStart(2, "0")}`;
}

function minutesToDecimalHours(mins: number) {
  return (mins / 60).toFixed(2);
}

export default function DailyEntryList({ entries }: { entries: TimeEntry[]; }) {
  // Group by date
  const grouped = entries.reduce((acc: Record<string, TimeEntry[]>, entry) => {
    acc[entry.date] = acc[entry.date] || [];
    acc[entry.date].push(entry);
    return acc;
  }, {} as Record<string, TimeEntry[]>);

  // Calculate daily hours and breaks
  function calculateDaily(entries: TimeEntry[]) {
    // Sort by start time
    const sorted = entries.sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));

    // Find earliest start and latest end
    const firstStart = timeToMinutes(sorted[0].startTime);
    const lastEnd = timeToMinutes(sorted[sorted.length - 1].endTime);

    // Total work span
    let total = lastEnd - firstStart;

    // Subtract all unpaid breaks
    sorted.forEach((entry) => {
      if (entry.workType === "UnPaid break") {
        total -= timeToMinutes(entry.endTime) - timeToMinutes(entry.startTime);
      }
    });

    return { total, allowance: 0, breaks: [] };
  }

  if (Object.keys(grouped).length === 0) {
    return <div className="text-gray-500">No entries found for the selected date.</div>;
  }

  return (
    <div className='border rounded p-4'>
      {Object.entries(grouped)
        .sort(([dateA], [dateB]) => dateB.localeCompare(dateA)) // Sort dates descending
        .map(([date, dayEntries]) => {
          const { total, allowance, breaks } = calculateDaily(dayEntries);
          return (
            <div key={date} className="mb-6">
              <h3 className="font-bold text-lg mb-2">{date}</h3>
              <ul>
                {(dayEntries).map((entry, idx) => (
                  <li key={entry.id ?? idx} className="mb-1">
                    {entry.startTime}-{entry.endTime} | {entry.workType}
                    {entry.workType !== "Work" && breaks[idx] > 0 && (
                      <> ({breaks[idx]} min break)</>
                    )}
                  </li>
                ))}
              </ul>
              <div className="mt-2">
                <hr />
                <span className="font-semibold">Total Paid Time: </span>
                {minutesToHHMM(total + allowance)}
                <span className="ml-2 text-blue-600">
                  ({minutesToDecimalHours(total + allowance)} hours)
                </span>
                {allowance > 0 && (
                  <span className="ml-2 text-green-600">
                    (+{minutesToHHMM(allowance)} allowance)
                  </span>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
}
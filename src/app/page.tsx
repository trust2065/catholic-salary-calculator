"use client";

import React, { useState } from "react";
import TimeEntryList from './components/TimeEntryList';
import TimePicker from 'react-time-picker';

interface TimeEntry {
  date: string;
  startTime: string;
  endTime: string;
  breakType: string;
  breakDuration: number;
}

const breakTypes = [
  { value: "Work", label: "Work (no break)", duration: 0 },
  { value: "Paid", label: "Paid Break (custom, paid)", duration: 0 },
  { value: "No Pay", label: "Non-Paid Break (15 min, no pay)", duration: 15 },
];

export default function Home() {
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [form, setForm] = useState({
    date: "",
    startTime: "",
    endTime: "",
    breakType: breakTypes[0].value,
    breakDuration: breakTypes[0].duration,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "breakType") {
      const selected = breakTypes.find((b) => b.value === value)!;
      setForm((f) => ({
        ...f,
        breakType: selected.value,
        breakDuration: selected.duration,
      }));
    } else {
      setForm((f) => ({
        ...f,
        [name]: value,
      }));
    }
  };

  const handleTimeChange = (name: "startTime" | "endTime", value: string | null) => {
    setForm((f) => ({
      ...f,
      [name]: value ?? "",
    }));
  };

  const handleBreakDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({
      ...f,
      breakDuration: Number(e.target.value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEntries((prev) => [...prev, form]);
    setForm((f) => ({
      ...f,
      startTime: "",
      endTime: "",
      breakType: breakTypes[0].value,
      breakDuration: breakTypes[0].duration,
      date: f.date,
    }));
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Time Recorder</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label className="block mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="border px-2 py-1 rounded w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Working Time (From)</label>
          <TimePicker
            onChange={(value) => handleTimeChange("startTime", value)}
            value={form.startTime}
            disableClock
            format="HH:mm"
            clearIcon={null}
            className="w-48 text-black bg-white border px-2 py-1 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Working Time (To)</label>
          <TimePicker
            onChange={(value) => handleTimeChange("endTime", value)}
            value={form.endTime}
            disableClock
            format="HH:mm"
            clearIcon={null}
            className="w-48 text-black bg-white border px-2 py-1 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Type</label>
          <select
            name="breakType"
            value={form.breakType}
            onChange={handleChange}
            className="border px-2 py-1 rounded w-full"
          >
            {breakTypes.map((bt) => (
              <option key={bt.value} value={bt.value}>
                {bt.label}
              </option>
            ))}
          </select>
        </div>
        {form.breakType === "Paid" && (
          <div>
            <label className="block mb-1">Break Duration (minutes)</label>
            <input
              type="number"
              name="breakDuration"
              min={0}
              value={form.breakDuration}
              onChange={handleBreakDurationChange}
              className="border px-2 py-1 rounded w-full"
            />
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Record Entry
        </button>
      </form>
      <TimeEntryList entries={entries} />
    </div>
  );
}
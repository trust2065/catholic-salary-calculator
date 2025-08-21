'use client';
import React, { useState, useEffect } from "react";
import TimeEntryList from './components/TimeEntryList';
import TimePicker from 'react-time-picker';
import { supabase } from './supabaseClient';
import { toCamelCase, toSnakeCase } from './utils/snakeCaseUtils';
import DailyEntryList from './components/DailyEntryList';
import { TimeEntry } from './types';

const workTypes = [
  { value: "Work", label: "Work" },
  { value: "Paid break", label: "Paid Break(15 min)" },
  { value: "UnPaid break", label: "UnPaid Break" },
];

export default function Home() {
  const today = new Date().toISOString().slice(0, 10); // yyyy-mm-dd

  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [form, setForm] = useState({
    date: today,
    startTime: "10:00",
    endTime: "12:00",
    workType: workTypes[0].value, // "Work"
  });
  const [deletedEntry, setDeletedEntry] = useState<TimeEntry | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "workType") {
      const selected = workTypes.find((b) => b.value === value)!;
      setForm((f) => ({
        ...f,
        workType: selected.value,
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


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Insert and get the inserted row (with id)
    const { data, error } = await supabase
      .from('time_entries')
      .insert([toSnakeCase(form)])
      .select(); // returns the inserted row(s)
    if (data && data.length > 0) {
      // Use general toCamelCase function for UI
      setEntries((prev) => [toCamelCase(data[0]) as TimeEntry, ...prev]);
    }
    setForm((f) => ({
      ...f,
      startTime: "",
      endTime: "",
      date: f.date,
    }));
  };

  // Delete handler
  const handleDelete = async (entry: TimeEntry, index: number) => {
    // Find the id from entries loaded from supabase (assuming you add id to TimeEntry)
    const entryId = entries[index]?.id;
    console.log(entry);
    console.log("Deleting entry with ID:", entryId);
    if (!entryId) {
      console.warn("No ID found for entry, cannot delete");
      return;
    }
    setDeletedEntry(entry);
    setEntries((prev) => prev.filter((_, i) => i !== index));
    // Delete from supabase
    if (entryId) {
      await supabase.from('time_entries').delete().eq('id', entryId);
    }
  };

  // Undo handler
  const handleUndo = async () => {
    if (deletedEntry) {
      // Re-insert into supabase
      const { id, ...entryData } = deletedEntry;
      await supabase.from('time_entries').insert([entryData]);
      // Reload entries
      setDeletedEntry(null);
      // Optionally, reload from supabase
      // Or just add back to entries
      setEntries((prev) => [deletedEntry!, ...prev]);
    }
  };

  // Load top 100 records on init
  useEffect(() => {
    async function fetchEntries() {
      const { data, error } = await supabase
        .from('time_entries')
        .select('*')
        .order('id', { ascending: false })
        .limit(100);
      if (data) {

        setEntries(data.map(toCamelCase) as TimeEntry[]);
      }
      if (error) {
        console.error(error);
      }
    }
    fetchEntries();
  }, []);

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
            name="workType"
            value={form.workType}
            onChange={handleChange}
            className="border px-2 py-1 rounded w-full"
          >
            {workTypes.map((bt) => (
              <option key={bt.value} value={bt.value}>
                {bt.label}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Record Entry
        </button>
      </form>
      <TimeEntryList entries={entries} onDelete={handleDelete} />

      <h4 className="mt-8 text-lg font-semibold mb-2 text-gray-200">Daily Records</h4>
      <DailyEntryList entries={entries} />
      {deletedEntry && (
        <div className="mt-4 bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-2 rounded">
          Record deleted.
          <button
            className="ml-2 underline text-blue-600"
            onClick={handleUndo}
          >
            Undo
          </button>
        </div>
      )}
    </div>
  );
}
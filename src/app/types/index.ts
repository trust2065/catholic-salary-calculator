export interface TimeEntry {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  breakDuration: number; // in minutes
  breakType: BreakType;
}

export type BreakType = 'paid' | 'unpaid';
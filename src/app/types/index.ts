export interface TimeEntry {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  workType: BreakType;
}

export type BreakType = 'paid' | 'unpaid';
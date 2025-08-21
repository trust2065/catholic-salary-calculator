export interface TimeEntry {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  workType: WorkType;
}

export type WorkType = 'Work' | 'Paid break' | 'UnPaid break';
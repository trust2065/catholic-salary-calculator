export function calculateTotalHours(start: string, end: string, breaks: Array<{ start: string; end: string; type: 'paid' | 'unpaid' }>): number {
  const startTime = new Date(`1970-01-01T${start}:00`);
  const endTime = new Date(`1970-01-01T${end}:00`);
  let totalBreakTime = 0;

  breaks.forEach(b => {
    const breakStart = new Date(`1970-01-01T${b.start}:00`);
    const breakEnd = new Date(`1970-01-01T${b.end}:00`);
    totalBreakTime += (breakEnd.getTime() - breakStart.getTime()) / 3600000; // Convert milliseconds to hours
  });

  const totalHours = (endTime.getTime() - startTime.getTime()) / 3600000 - totalBreakTime; // Convert milliseconds to hours
  return totalHours < 0 ? 0 : totalHours; // Ensure total hours is not negative
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function validateTimeInput(time: string): boolean {
  const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/; // HH:mm format
  return timePattern.test(time);
}
export function convertMillisecondsToSeconds(milliseconds: number): string {
  const seconds = milliseconds / 1000;
  return parseFloat(seconds.toFixed(2)).toString();
}

export function convertMillisecondsToMinutes(milliseconds: number): string {
  const minutes = milliseconds / 60000;
  return parseFloat(minutes.toFixed(2)).toString();
}
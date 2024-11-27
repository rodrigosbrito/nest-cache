import ms from 'ms';

export const SECONDS_MS = ms('1s');
const MINUTES_MS = ms('1m');

export function convertMillisecondsToSeconds(milliseconds: number): string {
  const seconds = milliseconds / SECONDS_MS;
  return parseFloat(seconds.toFixed(2)).toString();
}

export function convertMillisecondsToMinutes(milliseconds: number): string {
  const minutes = milliseconds / MINUTES_MS;
  return parseFloat(minutes.toFixed(2)).toString();
}

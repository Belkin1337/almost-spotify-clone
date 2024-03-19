let minutes = 0;
let seconds = 0;
let formatted_time = '';

export function durationConverter(
  value: number
) {
  minutes = Math.floor(value / 60);
  seconds = Math.round(value % 60);

  formatted_time = minutes + ":" + (seconds < 10 ? '0' : '') + seconds;

  return formatted_time;
}
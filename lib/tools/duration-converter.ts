export function durationConverter(value: number) {
  let minutes = Math.floor(value / 60);
  let seconds = Math.round(value % 60);

  let formatted = minutes + ":" + (seconds < 10 ? '0' : '') + seconds;

  return formatted;
}
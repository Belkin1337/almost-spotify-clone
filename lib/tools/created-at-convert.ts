import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/ru";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("ru");
dayjs.extend(relativeTime);

export function getRelativeTime(timestamp: string) {
  const time = dayjs(timestamp?.replace(" ", "T"));

  return time.fromNow();
}
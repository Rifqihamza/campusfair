import { APP_TIMEZONE } from "@/lib/utils/date";

type DateInput = Date | string | number;

const INDONESIAN_DATE_FORMATTER =
    new Intl.DateTimeFormat("id-ID", {
        timeZone: APP_TIMEZONE,
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

const INDONESIAN_TIME_FORMATTER =
    new Intl.DateTimeFormat("id-ID", {
        timeZone: APP_TIMEZONE,
        hour: "2-digit",
        minute: "2-digit",
    });

export function formatDate(date: DateInput) {
    return INDONESIAN_DATE_FORMATTER.format(new Date(date));
}

export function formatTime(date: DateInput) {
    return INDONESIAN_TIME_FORMATTER.format(new Date(date));
}

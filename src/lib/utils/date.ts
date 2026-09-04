export const APP_TIMEZONE = "Asia/Jakarta";

export function parseJakartaDateTime(value: string) {
    const normalizedValue = value.length === 16
        ? `${value}:00`
        : value;

    return new Date(`${normalizedValue}+07:00`);
}

export function formatDateTimeLocal(date: Date) {
    const parts = new Intl.DateTimeFormat("en-CA", {
        timeZone: APP_TIMEZONE,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
    }).formatToParts(date);

    const values = Object.fromEntries(
        parts.map((part) => [part.type, part.value]),
    );

    return `${values.year}-${values.month}-${values.day}T${values.hour}:${values.minute}`;
}
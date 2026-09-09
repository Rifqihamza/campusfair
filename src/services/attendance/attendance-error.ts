export type AttendanceErrorCode =
    | "SCANNER_NOT_FOUND"
    | "EVENT_NOT_STARTED"
    | "EVENT_FINISHED"
    | "QR_NOT_FOUND"
    | "ALREADY_CHECKED_IN"
    | "ALREADY_CHECKED_OUT"
    | "NOT_CHECKED_IN";

export class AttendanceError extends Error {
    constructor(
        public readonly code: AttendanceErrorCode,
    ) {
        super(code);
        this.name = "AttendanceError";
    }
}
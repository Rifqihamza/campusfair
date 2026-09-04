export type AttendanceErrorCode =
    | "SCANNER_NOT_FOUND"
    | "EVENT_NOT_STARTED"
    | "EVENT_FINISHED"
    | "QR_NOT_FOUND"
    | "ALREADY_CHECKED_OUT";

export class AttendanceError extends Error {
    constructor(
        public readonly code: AttendanceErrorCode,
    ) {
        super(code);
        this.name = "AttendanceError";
    }
}
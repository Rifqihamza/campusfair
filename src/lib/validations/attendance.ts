import { z } from "zod";

export const attendanceSchema = z.object({
    scannerToken: z
        .string()
        .trim()
        .min(1, "Scanner token wajib diisi"),

    qrToken: z
        .string()
        .trim()
        .min(1, "QR token wajib diisi"),
});

export type AttendanceInput = z.infer<
    typeof attendanceSchema
>;
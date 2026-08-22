import { z } from "zod";

export const attendanceSchema = z.object({
    scannerToken: z.string().min(1),
    qrToken: z.string().min(1),
});

export type AttendanceInput = z.infer<
    typeof attendanceSchema
>;
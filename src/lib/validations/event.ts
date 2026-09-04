import { z } from "zod";

export const eventSchema = z
    .object({
        name: z
            .string()
            .trim()
            .min(3, "Nama event minimal 3 karakter"),

        description: z
            .string()
            .trim()
            .optional(),

        startAt: z
            .string()
            .min(1, "Tanggal mulai wajib diisi"),

        endAt: z
            .string()
            .min(1, "Tanggal selesai wajib diisi"),
    })
    .refine(
        (data) => {
            const startAt = new Date(data.startAt);
            const endAt = new Date(data.endAt);

            return (
                !Number.isNaN(startAt.getTime()) &&
                !Number.isNaN(endAt.getTime()) &&
                endAt > startAt
            );
        },
        {
            message:
                "Tanggal selesai harus setelah tanggal mulai",
            path: ["endAt"],
        },
    );

export const registerEventSchema = z.object({
    eventId: z.uuid(),
});
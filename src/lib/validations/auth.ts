import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().trim().min(2, "Nama minimal 2 karakter"),
    school: z.string().trim().min(2, "Nama sekolah wajib diisi"),
    major: z.string().trim().optional(),
    class: z.string().trim().optional(),
    phone: z
        .string()
        .trim()
        .min(8, "Nomor telepon tidak valid"),

    email: z
        .string()
        .trim()
        .email("Format email tidak valid")
        .toLowerCase(),

    password: z
        .string()
        .min(8, "Password minimal 8 karakter"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
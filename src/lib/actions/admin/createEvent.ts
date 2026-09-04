"use server";

import crypto from "crypto";
import { redirect } from "next/navigation";
import { parseJakartaDateTime } from "@/lib/utils/date";
import { requireAdmin } from "@/lib/auth/require-admin";
import { prisma } from "@/lib/db/prisma";
import { eventSchema } from "@/lib/validations/event";
import { generateUniqueSlug } from "./generateUniqueSlug";

export async function createEvent(formData: FormData) {
    await requireAdmin();

    const rawData = {
        name: formData.get("name"),
        startAt: formData.get("startAt"),
        description: formData.get("description"),
        endAt: formData.get("endAt"),
    };

    const validation = eventSchema.safeParse(rawData);

    if (!validation.success) {
        throw new Error("Data event tidak valid");
    }

    const {
        name,
        description,
        startAt,
        endAt,
    } = validation.data;

    const slug = await generateUniqueSlug(name);

    await prisma.event.create({
        data: {
            name,
            description: description || null,
            slug,
            startAt: parseJakartaDateTime(startAt),
            endAt: parseJakartaDateTime(endAt),
            isActive: true,
            scannerToken: crypto.randomUUID(),
        },
    });

    redirect("/admin/events");
}

"use server";

import { redirect } from "next/navigation";
import { parseJakartaDateTime } from "@/lib/utils/date";
import { requireAdmin } from "@/lib/auth/require-admin";
import { prisma } from "@/lib/db/prisma";
import { eventSchema } from "@/lib/validations/event";
import { generateUniqueSlug } from "./generateUniqueSlug";

export async function updateEvent(formData: FormData) {
    await requireAdmin();

    const id = formData.get("id");

    if (typeof id !== "string" || !id) {
        throw new Error("ID event tidak valid");
    }

    const isActive = formData.get("isActive") === "on";

    const rawData = {
        name: formData.get("name"),
        description: formData.get("description"),
        startAt: formData.get("startAt"),
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

    const existingEvent = await prisma.event.findFirst({
        where: {
            id,
            deletedAt: null,
        },
    });

    if (!existingEvent) {
        throw new Error("Event tidak ditemukan");
    }

    let slug = existingEvent.slug;

    if (name !== existingEvent.name) {
        slug = await generateUniqueSlug(name, id);
    }

    await prisma.event.update({
        where: {
            id,
        },
        data: {
            name,
            description: description || null,
            slug,
            startAt: parseJakartaDateTime(startAt),
            endAt: parseJakartaDateTime(endAt),
            isActive,
        },
    });

    redirect("/admin/events");
}

"use server";

import crypto from "crypto";
import { redirect } from "next/navigation";
import { parseJakartaDateTime } from "@/lib/utils/date";
import { requireAdmin } from "@/lib/auth/require-admin";
import { prisma } from "@/lib/db/prisma";
import { generateSlug } from "@/lib/utils/slug";
import { eventSchema } from "@/lib/validations/event";

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

export async function deleteEvent(formData: FormData) {
    await requireAdmin();

    const id = formData.get("id");

    if (typeof id !== "string" || !id) {
        throw new Error("ID event tidak valid");
    }

    const existingEvent = await prisma.event.findFirst({
        where: {
            id,
            deletedAt: null,
        },
    });

    if (!existingEvent) {
        throw new Error("Event tidak ditemukan");
    }

    await prisma.event.update({
        where: {
            id,
        },
        data: {
            deletedAt: new Date(),
            isActive: false,
        },
    });

    redirect("/admin/events");
}

async function generateUniqueSlug(
    name: string,
    excludeEventId?: string,
): Promise<string> {
    const baseSlug = generateSlug(name);

    let slug = baseSlug;
    let suffix = 2;

    while (true) {
        const existingEvent = await prisma.event.findFirst({
            where: {
                slug,
                ...(excludeEventId
                    ? {
                        NOT: {
                            id: excludeEventId,
                        },
                    }
                    : {}),
            },
            select: {
                id: true,
            },
        });

        if (!existingEvent) {
            return slug;
        }

        slug = `${baseSlug}-${suffix}`;
        suffix += 1;
    }
}
"use server";

import crypto from "crypto";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/db/prisma";
import { eventSchema } from "@/lib/validations/event";
import { generateSlug } from "@/lib/utils/slug";
import { requireAdmin } from "@/lib/auth/require-admin";

export async function createEvent(
    formData: FormData,
) {
    await requireAdmin();

    const rawData = {
        name: formData.get("name"),
        startAt: formData.get("startAt"),
        endAt: formData.get("endAt"),
    };

    const validation =
        eventSchema.safeParse(rawData);

    if (!validation.success) {
        throw new Error(
            "Data event tidak valid",
        );
    }

    const {
        name,
        description,
        startAt,
        endAt,
    } = validation.data;

    const slug = generateSlug(name);

    await prisma.event.create({
        data: {
            name,
            description: description || null,
            slug,
            startAt: new Date(startAt),
            endAt: new Date(endAt),
            isActive: true,
            scannerToken: crypto.randomUUID(),
        },
    });

    redirect("/admin/events");
}

export async function updateEvent(
    formData: FormData,
) {
    await requireAdmin();

    const id = formData.get("id");

    if (typeof id !== "string" || !id) {
        throw new Error("ID event tidak valid");
    }

    const isActive =
        formData.get("isActive") === "on";

    const rawData = {
        name: formData.get("name"),
        description: formData.get("description"),
        startAt: formData.get("startAt"),
        endAt: formData.get("endAt"),
    };

    const validation =
        eventSchema.safeParse(rawData);

    if (!validation.success) {
        throw new Error(
            "Data event tidak valid",
        );
    }

    const {
        name,
        description,
        startAt,
        endAt,
    } = validation.data;

    await prisma.event.update({
        where: {
            id,
        },
        data: {
            name,
            description: description || null,
            startAt: new Date(startAt),
            endAt: new Date(endAt),
            isActive,
        },
    });

    redirect("/admin/events");
}

export async function deleteEvent(
    formData: FormData,
) {
    await requireAdmin();

    const id = formData.get("id");

    if (typeof id !== "string" || !id) {
        throw new Error("ID event tidak valid");
    }

    const existingEvent =
        await prisma.event.findFirst({
            where: {
                id,
                deletedAt: null,
            },
        });

    if (!existingEvent) {
        throw new Error(
            "Event tidak ditemukan",
        );
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
"use server";

import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/require-admin";
import { prisma } from "@/lib/db/prisma";

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


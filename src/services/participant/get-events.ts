import { prisma } from "@/lib/db/prisma";

export async function getEvents() {
    const now = new Date();

    return prisma.event.findMany({
        where: {
            isActive: true,
            deletedAt: null,
            endAt: {
                gte: now,
            },
        },
        orderBy: {
            startAt: "asc",
        },
        select: {
            id: true,
            name: true,
            slug: true,
            description: true,
            startAt: true,
            endAt: true,
        },
    });
}
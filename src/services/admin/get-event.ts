import { prisma } from "@/lib/db/prisma";

export async function getAdminEvent(eventId: string) {
    return prisma.event.findFirst({
        where: {
            id: eventId,
            deletedAt: null,
        },
    });
}
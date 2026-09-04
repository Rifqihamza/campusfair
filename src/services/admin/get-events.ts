import { prisma } from "@/lib/db/prisma";

export async function getAdminEvents() {
    return prisma.event.findMany({
        where: {
            deletedAt: null,
        },
        orderBy: {
            startAt: "desc",
        },
    });
}
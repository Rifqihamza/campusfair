import { prisma } from "@/lib/db/prisma";

export async function getAttendanceEvents() {
    return prisma.event.findMany({
        where: {
            deletedAt: null,
        },
        orderBy: {
            startAt: "desc",
        },
    });
}
import { prisma } from "@/lib/db/prisma";

export async function getScannerEvent(
    scannerToken: string,
) {
    return prisma.event.findFirst({
        where: {
            scannerToken,
            isActive: true,
            deletedAt: null,
        },
        select: {
            name: true,
            scannerToken: true,
        },
    });
}
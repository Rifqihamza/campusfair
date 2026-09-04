import { prisma } from "@/lib/db/prisma";
import { generateSlug } from "@/lib/utils/slug";

export async function generateUniqueSlug(
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
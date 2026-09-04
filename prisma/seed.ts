import crypto from "crypto";
import bcrypt from "bcryptjs";

import { PrismaClient } from "./generated/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
}

const adminEmail = process.env.SEED_ADMIN_EMAIL;
const adminPassword = process.env.SEED_ADMIN_PASSWORD;

if (!adminEmail || !adminPassword) {
    throw new Error(
        "SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD are required",
    );
}

const seedAdminEmail = adminEmail;
const seedAdminPassword = adminPassword;

const adapter = new PrismaPg({
    connectionString,
});

const prisma = new PrismaClient({
    adapter,
});

async function main() {
    const hashedPassword = await bcrypt.hash(seedAdminPassword, 12);

    const admin = await prisma.user.upsert({
        where: {
            email: seedAdminEmail,
        },
        update: {
            passwordHash: hashedPassword,
            role: "ADMIN",
        },
        create: {
            email: seedAdminEmail,
            passwordHash: hashedPassword,
            role: "ADMIN",
        },
    });

    console.log("Admin ready:", admin.email);

    const now = new Date();

    const event = await prisma.event.upsert({
        where: {
            slug: "campus-fair",
        },
        update: {},
        create: {
            name: "Campus Fair",
            description:
                "Acara Campus Fair yang di selenggarakan para alumni dari SMK Mitra Industri yang melanjutkan ke jenjang perkuliahan",
            slug: "campus-fair",
            startAt: now,
            endAt: new Date(
                now.getTime() + 2 * 60 * 60 * 1000,
            ),
            isActive: true,
            scannerToken: crypto.randomUUID(),
        },
    });

    console.log("Event ready:", event.id);
}
main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
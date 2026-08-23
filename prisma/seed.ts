import bcrypt from "bcryptjs";
import { PrismaClient } from "./generated/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
}

const adapter = new PrismaPg({
    connectionString,
});

const prisma = new PrismaClient({
    adapter,
});

const password = "admin123"

async function main() {
    const hashedPassword = await bcrypt.hash(password, 12)

    await prisma.user.create({
        data: {
            email: "admin@gmail.com",
            passwordHash: hashedPassword,
            role: "ADMIN",
            createdAt: new Date("2026-08-23T02:01:00+07:00"),
            updatedAt: new Date("2026-08-23T02:01:00+07:00"),
        }
    })

    const existingEvent = await prisma.event.findUnique({
        where: {
            slug: "campus-fair",
        },
    });

    if (existingEvent) {
        console.log("Campus Fair event already exists.");
        return;
    }

    const event = await prisma.event.create({
        data: {
            name: "Campus Fair",
            description: "Acara Campus Fair yang di selenggarakan para alumni dari SMK Mitra Industri yang melanjutkan ke jenjang perkuliahan",
            slug: "campus-fair",

            startAt: new Date("2027-01-15T08:00:00+07:00"),
            endAt: new Date("2027-01-15T16:00:00+07:00"),

            isActive: true,

            scannerToken: crypto.randomUUID(),
        },
    });

    console.log("Event created:", event.id);
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
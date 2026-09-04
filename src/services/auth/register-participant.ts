import bcrypt from "bcryptjs";

import { Prisma } from "../../../prisma/generated/client";

import { prisma } from "@/lib/db/prisma";
import {
    registerSchema,
    type RegisterInput,
} from "@/lib/validations/auth";

export async function registerParticipant(
    input: RegisterInput,
) {
    const data = registerSchema.parse(input);

    const email = data.email.trim().toLowerCase();

    const existingUser =
        await prisma.user.findUnique({
            where: {
                email,
            },
            select: {
                id: true,
            },
        });

    if (existingUser) {
        throw new Error(
            "EMAIL_ALREADY_REGISTERED",
        );
    }

    const passwordHash = await bcrypt.hash(
        data.password,
        12,
    );

    try {
        const user = await prisma.$transaction(
            async (tx) => {
                const newUser =
                    await tx.user.create({
                        data: {
                            email,
                            passwordHash,
                            role: "PARTICIPANT",
                        },
                    });

                await tx.participantProfile.create({
                    data: {
                        userId: newUser.id,
                        name: data.name,
                        school: data.school,
                        major: data.major || null,
                        class: data.class || null,
                        phone: data.phone,
                    },
                });

                return newUser;
            },
        );

        return {
            id: user.id,
            email: user.email,
        };
    } catch (error) {
        if (
            error instanceof
            Prisma.PrismaClientKnownRequestError &&
            error.code === "P2002"
        ) {
            throw new Error(
                "EMAIL_ALREADY_REGISTERED",
            );
        }

        throw error;
    }
}
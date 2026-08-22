import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db/prisma"
import { registerSchema, type RegisterInput } from "@/lib/validations/auth"

export async function registerParticipant(input: RegisterInput) {
    const data = registerSchema.parse(input)
    const existingUser = await prisma.user.findUnique({
        where: {
            email: data.email,
        }
    })

    if (existingUser) {
        throw new Error("EMAIL_ALREADY_REGISTERED")
    }

    const passwordHash = await bcrypt.hash(data.password, 12)
    const user = await prisma.$transaction(async (tx) => {
        const newUser = await tx.user.create({
            data: {
                email: data.email,
                passwordHash,
                role: "PARTICIPANT",
            },
        })

        await tx.participantProfile.create({
            data: {
                userId: newUser.id,
                name: data.name,
                school: data.school,
                major: data.major || null,
                class: data.class || null,
                phone: data.phone
            }
        })

        return newUser
    })

    return {
        id: user.id,
        email: user.email
    }
}

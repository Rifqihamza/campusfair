
import { UserRole } from "../../../prisma/generated/enums"

export function isAdmin(role: UserRole): boolean {
    return role === "ADMIN"
}

export function isParticipant(role: UserRole): boolean {
    return role === "PARTICIPANT"
}
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { prisma } from "@/lib/db/prisma";

export const {
    handlers,
    signIn,
    signOut,
    auth,
} = NextAuth({
    session: {
        strategy: "jwt",
    },

    providers: [
        Credentials({
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                },

                password: {
                    label: "Password",
                    type: "password",
                },
            },

            async authorize(credentials) {
                if (
                    typeof credentials?.email !==
                    "string" ||
                    typeof credentials?.password !==
                    "string"
                ) {
                    return null;
                }

                const user =
                    await prisma.user.findFirst({
                        where: {
                            email: credentials.email,
                            deletedAt: null,
                        },
                    });

                if (!user) {
                    return null;
                }

                const passwordValid =
                    await bcrypt.compare(
                        credentials.password,
                        user.passwordHash,
                    );

                if (!passwordValid) {
                    return null;
                }

                return {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                };
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }

            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                if (typeof token.id === "string") {
                    session.user.id = token.id;
                }
                if (
                    token.role === "PARTICIPANT" ||
                    token.role === "ADMIN"
                ) {
                    session.user.role = token.role;
                }
            }

            return session;
        },
    },
});
"use client";

import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function useLogin() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function login() {
        setError("");
        setLoading(true);

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (!result || result.error) {
                setError("Email atau password salah.");
                return;
            }

            const session = await getSession();

            if (session?.user?.role === "ADMIN") {
                router.push("/admin");
            } else {
                router.push("/dashboard");
            }

            router.refresh();
        } catch {
            setError("Terjadi kesalahan saat login.");
        } finally {
            setLoading(false);
        }
    }

    return {
        email,
        password,
        error,
        loading,
        setEmail,
        setPassword,
        login,
    };
}
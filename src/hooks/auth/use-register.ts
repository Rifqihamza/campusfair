"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export type RegisterFormData = {
    name: string;
    school: string;
    major: string;
    class: string;
    phone: string;
    email: string;
    password: string;
};

const initialForm: RegisterFormData = {
    name: "",
    school: "",
    major: "",
    class: "",
    phone: "",
    email: "",
    password: "",
};

export function useRegister() {
    const router = useRouter();

    const [form, setForm] = useState<RegisterFormData>(initialForm);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setForm((current) => ({
            ...current,
            [name]: value,
        }));
    }

    async function register() {
        setError("");
        setLoading(true);

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const result = await response.json();

            if (!response.ok) {
                setError(result.message ?? "Registrasi gagal.");
                return;
            }

            router.push("/login?registered=true");
        } catch {
            setError("Terjadi kesalahan. Silakan coba lagi.");
        } finally {
            setLoading(false);
        }
    }

    return {
        form,
        error,
        loading,
        handleChange,
        register,
    };
}
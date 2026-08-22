"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type FormData = {
    name: string;
    school: string;
    major: string;
    class: string;
    phone: string;
    email: string;
    password: string;
};

const initialForm: FormData = {
    name: "",
    school: "",
    major: "",
    class: "",
    phone: "",
    email: "",
    password: "",
};

export function RegisterForm() {
    const router = useRouter();

    const [form, setForm] = useState<FormData>(initialForm);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function handleChange(
        event: React.ChangeEvent<HTMLInputElement>,
    ) {
        const { name, value } = event.target;

        setForm((current) => ({
            ...current,
            [name]: value,
        }));
    }

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

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
            setError(
                "Terjadi kesalahan. Silakan coba lagi.",
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-xl border bg-white p-6 shadow-sm"
        >
            {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            <div>
                <label
                    htmlFor="name"
                    className="mb-1 block text-sm font-medium"
                >
                    Nama lengkap
                </label>

                <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2"
                    placeholder="Nama lengkap"
                />
            </div>

            <div>
                <label
                    htmlFor="school"
                    className="mb-1 block text-sm font-medium"
                >
                    Sekolah
                </label>

                <input
                    id="school"
                    name="school"
                    type="text"
                    value={form.school}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2"
                    placeholder="Nama sekolah"
                />
            </div>

            <div>
                <label
                    htmlFor="major"
                    className="mb-1 block text-sm font-medium"
                >
                    Jurusan
                </label>

                <input
                    id="major"
                    name="major"
                    type="text"
                    value={form.major}
                    onChange={handleChange}
                    className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2"
                    placeholder="Contoh: Rekayasa Perangkat Lunak"
                />
            </div>

            <div>
                <label
                    htmlFor="class"
                    className="mb-1 block text-sm font-medium"
                >
                    Kelas
                </label>

                <input
                    id="class"
                    name="class"
                    type="text"
                    value={form.class}
                    onChange={handleChange}
                    className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2"
                    placeholder="Contoh: XII RPL 1"
                />
            </div>

            <div>
                <label
                    htmlFor="phone"
                    className="mb-1 block text-sm font-medium"
                >
                    Nomor HP
                </label>

                <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2"
                    placeholder="08xxxxxxxxxx"
                />
            </div>

            <div>
                <label
                    htmlFor="email"
                    className="mb-1 block text-sm font-medium"
                >
                    Email
                </label>

                <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2"
                    placeholder="nama@email.com"
                />
            </div>

            <div>
                <label
                    htmlFor="password"
                    className="mb-1 block text-sm font-medium"
                >
                    Password
                </label>

                <input
                    id="password"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    minLength={8}
                    className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2"
                    placeholder="Minimal 8 karakter"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
                {loading ? "Mendaftarkan..." : "Daftar"}
            </button>
        </form>
    );
}
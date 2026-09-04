"use client";

import { useState } from "react";

import { signIn, getSession } from "next-auth/react";

import { useRouter, useSearchParams } from "next/navigation";

import Link from "next/link";

export function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const registered = searchParams.get("registered");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

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

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-2xl border-2 border-navy bg-cream p-6 shadow-[8px_8px_0_#0B1F3A] sm:p-8"
        >
            {registered === "true" && (
                <div className="rounded-xl border-2 border-green-700/20 bg-green-100 px-4 py-3 text-sm font-medium text-green-800">
                    Registrasi berhasil. Silakan login.
                </div>
            )}

            {error && (
                <div className="rounded-xl border-2 border-red-700/20 bg-red-100 px-4 py-3 text-sm font-medium text-red-800">
                    {error}
                </div>
            )}

            <div>
                <label
                    htmlFor="email"
                    className="mb-2 block font-body text-sm font-bold text-navy"
                >
                    Email
                </label>

                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) =>
                        setEmail(event.target.value)
                    }
                    required
                    autoComplete="email"
                    placeholder="nama@email.com"
                    className="w-full rounded-lg border-2 border-navy/20 bg-white px-4 py-3 font-body text-sm text-navy outline-none transition focus:border-navy focus:ring-4 focus:ring-lime/40"
                />
            </div>

            <div>
                <label
                    htmlFor="password"
                    className="mb-2 block font-body text-sm font-bold text-navy"
                >
                    Password
                </label>

                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) =>
                        setPassword(event.target.value)
                    }
                    required
                    autoComplete="current-password"
                    placeholder="Masukkan password"
                    className="w-full rounded-lg border-2 border-navy/20 bg-white px-4 py-3 font-body text-sm text-navy outline-none transition focus:border-navy focus:ring-4 focus:ring-lime/40"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg border-2 border-navy bg-lime px-4 py-3 font-body text-sm font-bold text-navy shadow-[5px_5px_0_#0B1F3A] transition-[transform,box-shadow] duration-200 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[3px_3px_0_#0B1F3A] disabled:cursor-not-allowed disabled:opacity-60"
            >
                {loading ? "Memproses..." : "Login"}
            </button>

            <div className="border-t border-navy/10 pt-4 text-center">
                <p className="font-body text-sm text-navy/60">
                    Belum punya akun?
                </p>

                <Link
                    href="/register"
                    className="mt-1 inline-block font-body text-sm font-bold text-navy underline decoration-lime decoration-2 underline-offset-4 transition hover:text-navy/70"
                >
                    Daftar Sekarang →
                </Link>
            </div>
        </form>
    );
}
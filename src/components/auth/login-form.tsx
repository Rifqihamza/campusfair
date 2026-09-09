"use client";

import Link from "next/link";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { useLogin } from "@/hooks/auth/use-login";

export function LoginForm() {
    const searchParams = useSearchParams();
    const registered = searchParams.get("registered");

    const {
        email,
        password,
        error,
        loading,
        setEmail,
        setPassword,
        login,
    } = useLogin();

    const [showPassword, setShowPassword] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        await login();
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-2xl border-2 border-navy bg-cream p-7 shadow-[8px_8px_0_#0B1F3A]"
        >
            {/* Success message */}
            {registered === "true" && (
                <div className="rounded-xl border-2 border-green-700/20 bg-green-100 px-4 py-3 text-sm font-medium text-green-800">
                    Registrasi berhasil. Silakan login.
                </div>
            )}

            {/* Error message */}
            {error && (
                <div className="rounded-xl border-2 border-red-700/20 bg-red-100 px-4 py-3 text-sm font-medium text-red-800">
                    {error}
                </div>
            )}

            {/* Email */}
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
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    autoComplete="email"
                    placeholder="nama@email.com"
                    disabled={loading}
                    className="w-full rounded-lg border-2 border-navy/20 bg-white px-4 py-3 font-body text-sm text-navy outline-none transition focus:border-navy focus:ring-4 focus:ring-lime/40 disabled:cursor-not-allowed disabled:bg-white/70"
                />
            </div>

            {/* Password */}
            <div>
                <label
                    htmlFor="password"
                    className="mb-2 block font-body text-sm font-bold text-navy"
                >
                    Password
                </label>

                <div className="relative">
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                        autoComplete="current-password"
                        placeholder="Masukkan password"
                        disabled={loading}
                        className="w-full rounded-lg border-2 border-navy/20 bg-white px-4 py-3 pr-12 font-body text-sm text-navy outline-none transition focus:border-navy focus:ring-4 focus:ring-lime/40 disabled:cursor-not-allowed disabled:bg-white/70"
                    />

                    <button
                        type="button"
                        aria-label={
                            showPassword
                                ? "Sembunyikan password"
                                : "Tampilkan password"
                        }
                        onClick={() =>
                            setShowPassword((current) => !current)
                        }
                        disabled={loading}
                        className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-navy/60 transition hover:text-navy disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                        ) : (
                            <Eye className="h-5 w-5" />
                        )}
                    </button>
                </div>
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-navy bg-lime px-4 py-3 font-body text-sm font-bold text-navy shadow-[0px_5px_0_#0B1F3A] hover:translate-y-0.5 hover:shadow-[0px_3px_0_#0B1F3A] disabled:cursor-not-allowed disabled:opacity-60"
            >
                {loading ? (
                    <>
                        <LoaderCircle className="h-4 w-4 animate-spin" />
                        Memproses...
                    </>
                ) : (
                    "Login"
                )}
            </button>

            {/* Register Link */}
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
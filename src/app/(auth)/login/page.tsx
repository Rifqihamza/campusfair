import { Suspense } from "react";

import Link from "next/link";

import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-campus-blue px-4 py-12">
            {/* Decorative background */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-lime" />

            <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rotate-12 rounded-3xl border-4 border-navy bg-sky" />

            <div className="relative z-10 w-full max-w-md">
                {/* Logo / Back */}
                <div className="mb-6 text-center">
                    <Link
                        href="/"
                        className="inline-flex flex-col font-display leading-[0.8] tracking-wide text-white transition-opacity hover:opacity-80"
                    >
                        <span className="text-3xl">
                            IKAMAMIIND
                        </span>

                        <span className="text-4xl">
                            2100
                        </span>
                    </Link>

                    <p className="mt-4 font-body text-sm font-bold uppercase tracking-[0.2em] text-lime">
                        CAMPUS FAIR 2027
                    </p>

                    <h1 className="mt-3 font-display text-5xl leading-none tracking-tight text-white">
                        WELCOME BACK.
                    </h1>

                    <p className="mt-2 font-body text-md text-white/95">
                        Masuk ke akun Campus Fair kamu.
                    </p>
                </div>

                <Suspense fallback={null}>
                    <LoginForm />
                </Suspense>
            </div>
            <div
                className="
        pointer-events-none
        absolute
        inset-x-0
        bottom-0
        h-1/2
        bg-linear-to-b
        from-transparent
        via-campus-blue
        to-lime
    "
            />

            <div
                className="
        pointer-events-none
        absolute
        inset-x-0
        bottom-0
        h-1/2
        bg-linear-to-b
        from-transparent
        to-lime
    "
            />
        </main>
    );
}

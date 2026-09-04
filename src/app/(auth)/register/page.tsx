import Link from "next/link";

import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
    return (
        <main className="relative min-h-screen overflow-hidden bg-campus-blue px-4 py-10 sm:py-14">
            {/* Decorative background */}
            <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-lime" />

            <div className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rotate-12 rounded-3xl border-4 border-navy bg-sky" />

            <div className="relative z-10 mx-auto w-full max-w-2xl">
                {/* Header */}
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

                    <h1 className="mt-3 font-display text-5xl leading-none tracking-tight text-white sm:text-6xl">
                        JOIN THE TEAM.
                    </h1>

                    <p className="mx-auto mt-2 max-w-lg font-body text-sm leading-6 text-white/65">
                        Buat akun dan daftarkan dirimu
                        untuk mengikuti Campus Fair 2027.
                    </p>
                </div>

                <RegisterForm />
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
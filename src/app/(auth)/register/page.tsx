import Image from "next/image";
import Link from "next/link";

import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
    return (
        <main className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4 pb-10 text-white">
            {/* Texture Background */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-dvh bg-[url('/texture-background.jpg')] bg-repeat bg-size-[480px_auto] mix-blend-color-burn"
            />

            {/* Top Decorations */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-40 overflow-hidden sm:h-50">
                <div className="absolute -right-10 -top-14 h-32 w-32 rounded-full border-8 border-pink/80" />

                <div className="absolute right-7 top-24 h-3 w-3 rounded-full bg-lime" />

                <div className="absolute left-0 top-34 h-1 w-24 -rotate-6 bg-pink" />

                <div className="absolute right-10 top-27 grid grid-cols-3 gap-1.5">
                    {Array.from({ length: 9 }).map((_, index) => (
                        <span
                            key={index}
                            className="h-1.5 w-1.5 rounded-full bg-white/50"
                        />
                    ))}
                </div>
            </div>

            {/* Bottom Decorations */}
            <div className="pointer-events-none absolute inset-x-0 bottom-40 z-10 h-100 overflow-hidden md:bottom-30 md:h-full">
                <div className="absolute -bottom-10 -left-16 h-40 w-40 rounded-full border-10 border-lime/70 md:h-60 md:w-60" />

                <div className="absolute bottom-14 right-5 h-7 w-18 -rotate-6 bg-pink" />

                <div className="absolute bottom-7 right-22 h-4 w-4 rounded-full bg-navy" />

                <div className="absolute bottom-24 right-7 -rotate-12">
                    <span className="block h-1 w-10 rounded-full bg-white/70" />
                    <span className="ml-3 mt-2 block h-1 w-7 rounded-full bg-white/50" />
                </div>

                <div className="absolute bottom-7 left-1/4 flex gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                    <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                    <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-2xl">
                {/* Logos */}
                <Link
                    href="/"
                    className="my-5 inline-flex w-full items-center justify-center gap-4"
                >
                    <div className="flex items-center gap-3">
                        <Image
                            src="/cf-banner.png"
                            alt="Logo Campus Fair"
                            width={160}
                            height={100}
                            className="h-12 w-auto object-contain"
                        />

                        <div className="h-10 w-px bg-white/15" />

                        <Image
                            src="/logo.jpg"
                            alt="Logo IKAMAMIIND 2100"
                            width={60}
                            height={60}
                            className="h-11 w-11 rounded-full object-cover"
                        />

                        <Image
                            src="/logo-mm2100.png"
                            alt="Logo SMK Mitra Industri MM2100"
                            width={60}
                            height={60}
                            className="h-11 w-11 rounded-full object-contain"
                        />
                    </div>
                </Link>

                {/* Register Heading */}
                <div className="mb-6 text-center">
                    <p className="font-body text-sm font-bold uppercase tracking-[0.2em] text-lime">
                        CAMPUS FAIR 2027
                    </p>

                    <h1 className="mt-3 font-display text-5xl leading-none tracking-tight text-white sm:text-6xl">
                        JOIN THE TEAM.
                    </h1>

                    <p className="mx-auto mt-2 max-w-lg font-body text-sm leading-6 text-white/80">
                        Buat akun dan daftarkan dirimu
                        untuk mengikuti Campus Fair 2027.
                    </p>
                </div>

                {/* Register Form */}
                <RegisterForm />
            </div>

            {/* Bottom gradient */}
            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    inset-x-0
                    bottom-0
                    -z-10
                    h-1/2
                    bg-linear-to-b
                    from-transparent
                    via-campus-blue
                    to-lime
                "
            />
        </main>
    );
}
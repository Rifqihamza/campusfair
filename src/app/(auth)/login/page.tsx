import { Suspense } from "react";

import Image from "next/image";
import Link from "next/link";

import { LoginForm } from "@/components/auth/login-form";

import { Floating } from "@/components/shared/floating";

export default function LoginPage() {
    return (
        <main className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4 pb-10 text-white">
            {/* Texture background */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 -z-30 h-dvh bg-[url('/texture-background.jpg')] bg-repeat bg-size-[480px_auto] mix-blend-color-burn"
            />

            {/* Top decorations */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 z-10 h-40 overflow-hidden sm:h-50"
            >
                <Floating
                    duration={4}
                    distance={8}
                    className="absolute -right-10 -top-14 h-32 w-32 rounded-full border-8 border-pink/80"
                />

                <Floating
                    duration={3.5}
                    distance={6}
                    delay={0.4}
                    className="absolute right-7 top-24 h-3 w-3 rounded-full bg-lime"
                />

                <Floating
                    duration={4.5}
                    distance={7}
                    delay={0.8}
                    className="absolute left-0 top-34 h-1 w-24 -rotate-6 bg-pink"
                />

                <Floating
                    duration={4}
                    distance={6}
                    delay={0.6}
                    className="absolute right-10 top-27 grid grid-cols-3 gap-1.5"
                >
                    {Array.from({ length: 9 }).map((_, index) => (
                        <span
                            key={index}
                            className="h-1.5 w-1.5 rounded-full bg-white/50"
                        />
                    ))}
                </Floating>
            </div>

            {/* Bottom decorations */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-40 z-10 h-100 overflow-hidden md:bottom-0 md:h-full"
            >
                <Floating
                    duration={5}
                    distance={10}
                    className="absolute -bottom-10 -left-16 h-40 w-40 rounded-full border-10 border-lime/70 md:h-60 md:w-60"
                />

                <Floating
                    duration={3.8}
                    distance={7}
                    delay={0.6}
                    className="absolute bottom-44 right-5 h-7 w-18 -rotate-6 bg-pink"
                />

                <Floating
                    duration={4.2}
                    distance={6}
                    delay={1}
                    className="absolute bottom-47 right-22 h-4 w-4 rounded-full bg-navy"
                />

                <Floating
                    duration={4.5}
                    distance={8}
                    delay={0.3}
                    className="absolute bottom-54 right-7 -rotate-12"
                >
                    <span className="block h-1 w-10 rounded-full bg-white/70" />
                    <span className="ml-3 mt-2 block h-1 w-7 rounded-full bg-white/50" />
                </Floating>

                <Floating
                    duration={3.5}
                    distance={6}
                    delay={1.2}
                    className="absolute bottom-47 left-1/4 flex gap-1.5"
                >
                    <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                    <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                    <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                </Floating>
            </div>

            {/* Main content */}
            <div className="relative z-10 w-full max-w-md">
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

                {/* Heading */}
                <div className="mb-6 text-center">
                    <p className="mb-1 text-sm font-bold tracking-[0.3em] text-lime">
                        CAMPUS FAIR 2027
                    </p>

                    <h1 className="text-4xl font-black uppercase leading-none tracking-tight">
                        WELCOME BACK.
                    </h1>

                    <p className="mt-3 text-sm leading-relaxed text-white/80">
                        Masuk untuk melanjutkan perjalananmu di Campus Fair.
                    </p>
                </div>

                {/* Login form */}
                <Suspense fallback={null}>
                    <LoginForm />
                </Suspense>
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
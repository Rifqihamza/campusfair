import { ArrowDown } from "lucide-react";
import Image from "next/image";


export function Hero() {
    return (
        <section
            id="hero"
            className="relative isolate min-h-dvh overflow-hidden text-white pb-10"
        >

            {/* Mobile top decorations */}
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


            {/* Main Container */}
            <div className="w-full max-w-7xl h-dvh mx-auto flex items-center justify-center relative">
                {/* Typography */}
                <span
                    className="text-[65px] md:text-[160px] tracking-tight text-sky font-display w-full absolute top-[30%] md:top-1/4 -translate-y-1/2 flex items-center justify-center">
                    YOUR NEXT CHAPTER
                </span>

                <span
                    className="z-10 text-[80px] md:text-[160px] tracking-wide text-sky font-display w-full absolute bottom-1/3 md:bottom-1/4 translate-y-1/2 flex items-center justify-center">
                    STARTS HERE.
                </span>

                <div className="relative z-30 w-[min(88vw,540px)] -rotate-2 md:w-[min(70vw,560px)] -mt-10">
                    {/* Offset shadow */}
                    <div className="absolute -bottom-1.5 -left-1.5 h-full w-full rotate-2 bg-lime sm:-bottom-3 sm:-left-3" />

                    {/* Frame */}
                    <div className="relative overflow-hidden border-2 border-navy bg-white p-1 shadow-[5px_5px_0_#0B1F3A] sm:border-4 sm:p-1.5 sm:shadow-[8px_8px_0_#0B1F3A]">
                        <Image
                            src="/bersama.jpg"
                            alt="Dokumentasi Campus Fair"
                            width={1280}
                            height={720}
                            priority
                            className="aspect-video w-full object-cover contrast-125"
                        />

                        {/* Halftone */}
                        <div className="pointer-events-none absolute inset-1 bg-[radial-gradient(circle_at_1px_1px,#0B1F3A_1px,transparent_0)] bg-size-[5px_5px] opacity-30 mix-blend-multiply sm:inset-1.5" />
                    </div>

                    {/* Tape top */}
                    <div className="absolute -left-4 -top-2 h-4 w-12 -rotate-8 bg-lime/90 md:-left-10 md:-top-5 md:h-10 md:w-22">
                        <div className="pointer-events-none absolute inset-1 bg-[radial-gradient(circle_at_1px_1px,#0B1F3A_1px,transparent_0)] bg-size-[5px_5px] opacity-30 mix-blend-multiply" />
                    </div>

                    {/* Tape bottom */}
                    <div className="absolute -bottom-2 -right-3 h-4 w-12 -rotate-8 bg-pink/90 md:-bottom-2 md:-right-6 md:h-6 md:w-24">
                        <div className="pointer-events-none absolute inset-1 bg-[radial-gradient(circle_at_1px_1px,#0B1F3A_1px,transparent_0)] bg-size-[5px_5px] opacity-30 mix-blend-multiply" />
                    </div>

                    {/* Right doodle */}
                    <div className="pointer-events-none absolute -left-24 top-[43%] z-20 hidden -translate-y-1/2 rotate-18 sm:block md:-left-1/2">
                        <Image
                            src="/arrow-drawing.png"
                            alt=""
                            width={1280}
                            height={720}
                            className="h-auto w-32 sm:w-36 md:w-44 lg:w-50"
                        />
                    </div>
                </div>
                {/* Bottom content */}
                <div className="flex justify-end absolute top-1/2 right-0">
                    {/* Alumni label */}
                    <div className="hidden -rotate-3 border-2 border-white/60 px-4 py-2 text-right sm:block">
                        <p className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                            ALUMNI
                        </p>

                        <p className="font-display text-xl leading-none">
                            SMK MITRA INDUSTRI
                        </p>

                        <p className="font-body text-xs font-bold text-lime">
                            MM2100
                        </p>
                    </div>
                </div>
            </div>


            {/* Scroll indicator */}
            <a
                href="#about"
                aria-label="Scroll ke bagian tentang"
                className="absolute bottom-30 left-1/2 z-50 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border-2 border-white/70 text-base transition hover:border-lime hover:text-lime sm:bottom-6 sm:h-11 sm:w-11 sm:text-lg"
            >
                <ArrowDown />
            </a>

            {/* Mobile bottom decorations */}
            <div className="pointer-events-none absolute inset-x-0 bottom-20 z-10 h-100 overflow-hidden md:h-full md:bottom-0">
                <div className="absolute -bottom-10 -left-16 h-40 w-40 md:h-60 md:w-60 rounded-full border-10 border-lime/70" />

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

            {/* Bottom gradient */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-70 bg-linear-to-b from-transparent via-sky/40 via-50% to-lime" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-12 bg-linear-to-b from-transparent via-lime/30 to-lime" />

        </section >
    );
}
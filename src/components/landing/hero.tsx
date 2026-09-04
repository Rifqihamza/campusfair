import { ArrowDown } from "lucide-react";
import Image from "next/image";

export function Hero() {
    return (
        <section
            id="hero"
            className="relative isolate min-h-dvh overflow-hidden bg-campus-blue text-white"
        >
            {/* Texture */}
            <Image
                src="/texture-background.jpg"
                alt="Texture Background"
                className="z-10 absolute top-0 left-0 mix-blend-color-burn w-full h-full object-cover"
                width={1920}
                height={1080}
            />

            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-50 overflow-hidden md:hidden ">
                <div className="absolute -right-10 -top-14 h-36 w-36 rounded-full border-10 border-pink/80" />
                <div className="absolute right-8 top-26 h-4 w-4 rounded-full bg-lime" />
                <div className="absolute left-0 top-42 h-1 w-28 -rotate-6 bg-pink" />

                <div className="absolute right-14 top-30 grid grid-cols-3 gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
                </div>
            </div>

            {/* Bottom gradient */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-80 bg-linear-to-b from-transparent via-sky/40 via-50% to-lime" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-32 bg-linear-to-b from-transparent via-lime/30 to-lime" />

            {/* Left doodle */}
            <div className="pointer-events-none absolute left-3 top-[42%] z-10 h-10 w-10 rotate-12 sm:left-8 sm:h-16 sm:w-16">
                <span className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 rotate-45 bg-pink" />
                <span className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 -rotate-45 bg-pink" />
                <span className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 rotate-12 bg-pink" />
                <span className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 -rotate-12 bg-pink" />
            </div>

            {/* Main container */}
            <div className="relative z-20 mx-auto flex min-h-dvh max-w-7xl flex-col px-4 pb-20 pt-28 sm:px-6 sm:pb-38 sm:pt-36 mb-10">
                {/* Small label */}
                <div className="absolute top-28 left-4 z-50 flex flex-col justify-end md:bottom-20 md:left-0 md:top-auto">
                    <p className="font-body text-xs font-bold uppercase tracking-[0.25em] text-lime sm:text-sm">
                        IKAMAMIIND 2100
                    </p>

                    <p className="mt-1 font-body text-[9px] font-bold uppercase tracking-[0.18em] text-white/60 sm:text-xs sm:tracking-[0.2em]">
                        ALUMNI SMK MITRA INDUSTRI MM2100
                    </p>
                </div>

                {/* Hero composition */}
                <div className="relative mt-6 flex flex-1 items-center justify-center sm:mt-4">
                    {/* Typography */}
                    {/* Typography */}
                    <h1 className="absolute inset-0 flex w-full flex-col items-center text-center font-display font-extrabold uppercase tracking-[6px] md:space-y-80">
                        {/* YOUR NEXT CHAPTER */}
                        <span className="absolute left-1/2 top-[30%] z-10 block -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[clamp(2.7rem,10vw,16rem)] leading-[0.85] md:relative md:left-auto md:top-auto md:translate-x-0 md:translate-y-0 md:text-[clamp(3.7rem,9vw,10rem)] md:leading-[0.3]">
                            YOUR NEXT CHAPTER
                        </span>

                        {/* STARTS HERE */}
                        <span className="absolute left-1/2 top-[78%] z-40 block -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[clamp(3rem,16vw,10rem)] leading-[0.8] md:relative md:left-auto md:top-auto md:translate-x-0 md:translate-y-0 md:mt-[-0.02em] md:text-[clamp(3rem,11vw,10rem)] md:leading-[0.8]">
                            STARTS HERE.
                        </span>
                    </h1>

                    {/* Main photo */}
                    <div className="relative z-30 w-[min(82vw,640px)] -rotate-2 sm:w-[min(70vw,640px)] mt-6">
                        {/* Offset shadow */}
                        <div className="absolute -bottom-2 -left-2 h-full w-full rotate-2 bg-lime sm:-bottom-3 sm:-left-3" />

                        {/* Frame */}
                        <div className="relative overflow-hidden border-3 border-navy bg-white p-1 shadow-[6px_6px_0_#0B1F3A] sm:border-4 sm:p-1.5 sm:shadow-[8px_8px_0_#0B1F3A]">
                            <Image
                                src="/bersama.jpg"
                                alt="Dokumentasi Campus Fair"
                                width={1280}
                                height={720}
                                priority
                                className="aspect-video w-full object-cover grayscale contrast-125"
                            />

                            {/* Halftone */}
                            <div className="pointer-events-none absolute inset-1 bg-[radial-gradient(circle_at_1px_1px,#0B1F3A_1px,transparent_0)] bg-size-[5px_5px] opacity-30 mix-blend-multiply sm:inset-1.5" />
                        </div>

                        {/* Tape top */}
                        <div className="absolute -left-6 -top-2 h-5 w-16 -rotate-8 bg-lime/90 sm:-left-20 sm:-top-5 sm:h-20 sm:w-50">
                            <div className="pointer-events-none absolute inset-1 bg-[radial-gradient(circle_at_1px_1px,#0B1F3A_1px,transparent_0)] bg-size-[5px_5px] opacity-30 mix-blend-multiply sm:inset-1.5" />
                        </div>

                        {/* Tape bottom */}
                        <div className="absolute -bottom-3 -right-4 h-5 w-16 -rotate-6 bg-pink/90 sm:-bottom-5 sm:-right-7 sm:h-8 sm:w-24" >
                            <div className="pointer-events-none absolute inset-1 bg-[radial-gradient(circle_at_1px_1px,#0B1F3A_1px,transparent_0)] bg-size-[5px_5px] opacity-30 mix-blend-multiply sm:inset-1.5" />
                        </div>
                    </div>

                    {/* Campus Fair sticker */}
                    <div className="absolute left-0 top-1/2 z-50 -translate-y-1/2 -rotate-6 sm:left-2 lg:left-[3%]">
                        <div className="w-fit bg-lime px-2.5 py-1 font-display text-lg leading-none text-navy shadow-[3px_3px_0_#0B1F3A] sm:px-4 sm:text-3xl sm:shadow-[5px_5px_0_#0B1F3A]">
                            CAMPUS
                        </div>

                        <div className="ml-2 mt-1 w-fit bg-pink px-2.5 py-1 font-display text-lg leading-none text-navy shadow-[3px_3px_0_#0B1F3A] sm:ml-4 sm:px-4 sm:text-3xl sm:shadow-[5px_5px_0_#0B1F3A]">
                            FAIR
                        </div>

                        <div className="mt-1 w-fit bg-navy px-2.5 py-1 font-display text-xl leading-none text-lime shadow-[3px_3px_0_#B7FF2A] sm:px-4 sm:text-4xl sm:shadow-[5px_5px_0_#B7FF2A]">
                            2027
                        </div>
                    </div>

                    {/* Right doodle */}
                    <div className="pointer-events-none absolute -right-40 md:right-0 top-1/3 -translate-y-1/2 scale-x-[-1] -rotate-18">
                        <Image
                            src="/arrow-drawing.png"
                            alt="Arrow Drawing Component"
                            width={1280}
                            height={720}
                            priority
                            className="w-50 h-auto"
                        />
                    </div>
                </div>

                {/* Bottom content */}
                <div className="relative z-50 mt-4 flex justify-end sm:mt-0">
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

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-48 overflow-hidden md:hidden">
                <div className="absolute -bottom-20 -left-16 h-44 w-44 rounded-full border-12 border-lime/70" />

                <div className="absolute bottom-16 right-5 h-8 w-20 -rotate-6 bg-pink" />

                <div className="absolute bottom-8 right-24 h-5 w-5 rounded-full bg-navy" />

                <div className="absolute bottom-28 right-8 -rotate-12">
                    <span className="block h-1 w-12 rounded-full bg-white/70" />
                    <span className="mt-2 ml-3 block h-1 w-8 rounded-full bg-white/50" />
                </div>

                <div className="absolute bottom-8 left-1/2 flex gap-2">
                    <span className="h-2 w-2 rounded-full bg-lime" />
                    <span className="h-2 w-2 rounded-full bg-lime" />
                    <span className="h-2 w-2 rounded-full bg-lime" />
                </div>
            </div>

            {/* Scroll indicator */}
            <a
                href="#about"
                aria-label="Scroll ke bagian tentang"
                className="absolute bottom-0 -translate-y-15 left-1/2 z-50 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-2 border-white/70 text-lg transition hover:border-lime hover:text-lime sm:bottom-6 sm:h-11 sm:w-11"
            >
                <ArrowDown />
            </a>
        </section>
    );
}
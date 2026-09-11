import Link from "next/link";

import { Reveal } from "../shared/reveal";
import { Floating } from "../shared/floating";

export function RegistrationCta() {
    return (
        <section className="relative isolate overflow-hidden py-8 text-white md:py-[144px]">
            {/* Decorative shapes */}
            <Floating
                duration={5}
                distance={10}
                className="pointer-events-none absolute -left-14 top-12 h-32 w-32 rounded-full border-4 border-lime/80 sm:-left-20 sm:top-16 sm:h-48 sm:w-48 sm:border-[5px] lg:h-64 lg:w-64"
            />

            <Floating
                duration={4.5}
                distance={9}
                delay={0.6}
                className="pointer-events-none absolute -right-14 bottom-0 h-36 w-36 rotate-12 rounded-xl border-3 border-yellow bg-pink sm:-right-20 sm:h-52 sm:w-52 sm:border-4 lg:-right-24 lg:h-72 lg:w-72"
            />

            <Floating
                duration={3.5}
                distance={7}
                delay={0.4}
                className="pointer-events-none absolute left-5 top-[18%] rotate-12 font-display text-3xl font-black text-yellow sm:left-[12%] sm:text-5xl"
            >
                ✦
            </Floating>

            <Floating
                duration={4}
                distance={8}
                delay={0.8}
                className="pointer-events-none absolute right-5 top-[22%] -rotate-12 font-display text-4xl font-black text-lime sm:right-[14%] sm:text-6xl"
            >
                +
            </Floating>

            <Floating
                duration={4.2}
                distance={8}
                delay={0.5}
                className="pointer-events-none absolute right-4 top-[48%] h-10 w-10 -rotate-12 rounded-full border-3 border-lime bg-campus-blue sm:right-[6%] sm:h-12 sm:w-12"
            />

            <Floating
                duration={3.5}
                distance={6}
                delay={1}
                className="pointer-events-none absolute left-[18%] bottom-[18%] h-3 w-3 rounded-full bg-pink sm:h-5 sm:w-5"
            />

            <Floating
                duration={4}
                distance={7}
                delay={0.7}
                className="pointer-events-none absolute right-[24%] bottom-[14%] h-3 w-3 rounded-full bg-yellow sm:h-4 sm:w-4"
            />

            <Floating
                duration={4.5}
                distance={8}
                delay={1.1}
                className="pointer-events-none absolute left-5 bottom-[8%] h-7 w-7 rotate-45 border-3 border-lime sm:left-[6%] sm:h-10 sm:w-10"
            />

            {/* Decorative sticker */}
            <Floating
                duration={4}
                distance={7}
                delay={0.3}
                className="pointer-events-none absolute left-[8%] top-[48%] hidden -rotate-6 border-2 border-navy bg-yellow px-4 py-2 shadow-[4px_4px_0_#B5FF2C] lg:block"
            >
                <span className="font-body text-xs font-black uppercase tracking-[0.15em] text-navy">
                    LET&apos;S GO! ↗
                </span>
            </Floating>

            {/* Main content */}
            <Reveal>
                <div className="relative z-10 mx-auto max-w-5xl px-6 text-center lg:px-8">
                    <div className="mx-auto mb-5 inline-flex -rotate-2 border-2 border-navy bg-lime px-4 py-2 shadow-[4px_4px_0_#F7F3E8]">
                        <span className="font-body text-xs font-black uppercase tracking-[0.18em] text-navy">
                            ✦ CAMPUS FAIR 2027 ✦
                        </span>
                    </div>

                    <p className="font-body text-sm font-bold uppercase tracking-[0.2em] text-lime">
                        READY?
                    </p>

                    <h2 className="mt-5 font-display text-[clamp(4.5rem,12vw,9rem)] leading-[0.78] tracking-tight">
                        YOUR NEXT
                        <br />
                        CHAPTER
                        <br />
                        STARTS HERE.
                    </h2>

                    <p className="mx-auto mt-6 max-w-xl font-body text-xl leading-6 text-white/90">
                        Jangan lewatkan kesempatan untuk
                        menjadi bagian dari Campus Fair.
                        Daftarkan dirimu dan mulai langkah
                        berikutnya.
                    </p>

                    <Link
                        href="/register"
                        className="mt-6 inline-flex rounded-lg border-2 border-navy bg-lime px-7 py-3.5 font-body font-bold text-navy shadow-[0px_6px_0_#0B1F3A] transition-[transform,box-shadow] duration-200 hover:translate-y-0.5 hover:shadow-[0px_4px_0_#0B1F3A]"
                    >
                        Daftar Sekarang →
                    </Link>
                </div>
            </Reveal>
        </section>
    );
}
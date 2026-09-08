import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "../shared/reveal";

export function EventInfoSection() {
    return (
        <section
            id="info"
            className="relative overflow-hidden bg-yellow py-7 md:py-8"
        >
            {/* Decorative shapes */}
            <div className="pointer-events-none absolute left-[4%] top-20 z-0 hidden h-14 w-14 rotate-12 rounded-full border-4 border-navy bg-pink lg:block" />

            <div className="pointer-events-none absolute right-[7%] top-16 z-0 hidden -rotate-12 font-display text-6xl font-black text-campus-blue lg:block">
                ✦
            </div>

            <div className="pointer-events-none absolute left-[4%] bottom-[25%] z-0 hidden rotate-[-8deg] border-2 border-navy bg-lime px-4 py-2 shadow-[4px_4px_0_#0B1F3A] lg:block">
                <span className="font-body text-xs font-black uppercase tracking-[0.15em] text-navy">
                    DON&apos;T MISS IT!
                </span>
            </div>

            <div className="pointer-events-none absolute right-[4%] top-[48%] z-0 hidden h-20 w-20 -rotate-12 rounded-2xl border-4 border-navy bg-pink lg:block" />

            <div className="pointer-events-none absolute right-[15%] bottom-[20%] z-0 hidden rotate-12 font-display text-5xl font-black text-navy lg:block">
                +
            </div>

            <div className="pointer-events-none absolute left-[5%] bottom-[14%] z-0 hidden h-10 w-10 rotate-45 border-4 border-navy bg-sky lg:block" />

            {/* Decorative dots */}
            <div className="pointer-events-none absolute left-[24%] top-12 z-0 hidden h-3 w-3 rounded-full bg-campus-blue lg:block" />

            <div className="pointer-events-none absolute right-[22%] top-[30%] z-0 hidden h-4 w-4 rounded-full bg-lime lg:block" />

            <div className="relative z-10 mx-auto mb-9 max-w-7xl px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-end lg:gap-8">
                    <Reveal>
                        {/* Date sticker */}
                        <div className="mb-5 inline-flex -rotate-2 items-center border-2 border-navy bg-navy px-4 py-2 shadow-[4px_4px_0_#F7F3E8]">
                            <span className="font-body text-xs font-black uppercase tracking-[0.18em] text-lime">
                                ✦ SAVE THE DATE ✦
                            </span>
                        </div>

                        <p className="font-body text-sm font-bold uppercase tracking-[0.2em] text-navy/80">
                            OUR BIG DAY
                        </p>

                        <h2 className="mt-5 font-display text-[clamp(6rem,15vw,11rem)] leading-[0.72] tracking-tight text-navy">
                            20
                            <br />
                            JAN
                            <br />
                            2027
                        </h2>
                    </Reveal>

                    <Reveal delay={120}>
                        {/* Info blocks */}
                        <div className="border-t-2 border-navy py-5">
                            <p className="font-body text-xs font-bold uppercase tracking-[0.15em] text-navy/50">
                                Event
                            </p>

                            <p className="mt-2 font-heading text-2xl font-bold text-navy">
                                Campus Fair 2027
                            </p>
                        </div>
                        <div className="border-t-2 border-navy py-5">
                            <p className="font-body text-xs font-bold uppercase tracking-[0.15em] text-navy/50">
                                WAKTU
                            </p>

                            <p className="mt-2 font-heading text-2xl font-bold text-navy">
                                08.00 — Selesai
                            </p>
                        </div>

                        <div className="border-t-2 border-navy py-5">
                            <p className="font-body text-xs font-bold uppercase tracking-[0.15em] text-navy/50">
                                LOKASI
                            </p>

                            <p className="mt-2 font-heading text-2xl font-bold text-navy">
                                SMK Mitra Industri MM2100 (Aula Gd. F)
                            </p>
                        </div>

                        <div className="border-t-2 border-navy py-5">
                            <p className="font-body text-xs font-bold uppercase tracking-[0.15em] text-navy/50">
                                STATUS
                            </p>

                            <div className="mt-2 inline-flex max-w-full items-center gap-2 rounded-full border-2 border-navy bg-lime px-3 py-1.5 shadow-[3px_3px_0_#0B1F3A] sm:px-4">
                                <span className="h-2.5 w-2.5 shrink-0 rounded-full border border-navy bg-campus-blue" />

                                <span className="font-heading text-base font-bold text-navy sm:text-lg">
                                    Pendaftaran Dibuka
                                </span>
                            </div>
                        </div>

                        <Link
                            href="/register"
                            className="mt-4 flex items-center justify-center gap-2 rounded-lg border-2 border-navy bg-navy px-6 py-3 font-body font-bold text-white shadow-[0px_6px_0_#F7F3E8] hover:translate-y-0.5 hover:shadow-[0px_3px_0_#F7F3E8]"
                        >
                            Daftar Sekarang
                            <ArrowRight size={20} />
                        </Link>
                    </Reveal>
                </div>
            </div>

            {/* Decorative shapes */}
            <div className="pointer-events-none absolute right-20 top-46 z-0 h-10 w-10 rotate-12 rounded-full border-3 border-navy bg-pink sm:left-6 sm:h-12 sm:w-12 lg:left-[4%] lg:top-20 lg:h-14 lg:w-14" />

            <div className="pointer-events-none absolute right-4 top-14 z-0 -rotate-12 font-display text-4xl font-black text-campus-blue sm:right-8 sm:text-5xl lg:right-[7%] lg:top-16 lg:text-6xl">
                ✦
            </div>

            <div className="pointer-events-none absolute right-2 top-[55%] z-0 h-12 w-12 -rotate-12 rounded-2xl border-3 border-navy bg-pink sm:right-6 sm:h-16 sm:w-16 lg:right-[4%] lg:top-[48%] lg:h-20 lg:w-20" />

            <div className="pointer-events-none absolute left-4 bottom-[10%] z-0 h-8 w-8 rotate-45 border-3 border-navy bg-sky sm:left-8 sm:h-10 sm:w-10 lg:left-[5%] lg:bottom-[14%]" />

            <div className="pointer-events-none absolute right-[20%] bottom-[14%] z-0 rotate-12 font-display text-4xl font-black text-navy sm:text-5xl lg:right-[15%] lg:bottom-[20%]">
                +
            </div>

            {/* Bottom transition */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-linear-to-b from-transparent via-yellow to-campus-blue" />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-linear-to-b from-transparent to-campus-blue" />
        </section>
    );
}
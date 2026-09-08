import { GraphicCard } from "@/components/shared/graphic-card";
import { highlightsData } from "@/data/highlights";
import { Reveal } from "../shared/reveal";
export function HighlightsSection() {
    return (
        <section
            id="highlights"
            className="relative overflow-hidden bg-sky py-16 text-navy md:py-20"
        >
            {/* Decorative shapes */}
            <div className="pointer-events-none absolute left-[4%] top-24 z-0 hidden h-12 w-12 rotate-12 rounded-full border-4 border-navy bg-lime lg:block" />

            <div className="pointer-events-none absolute right-[6%] top-20 z-0 hidden rotate-12 font-display text-6xl font-black text-pink lg:block">
                ✦
            </div>

            <div className="pointer-events-none absolute left-[8%] top-[48%] z-0 hidden -rotate-12 border-3 border-navy bg-yellow px-4 py-2 shadow-[4px_4px_0_#0B1F3A] lg:block">
                <span className="font-body text-xs font-black uppercase tracking-[0.15em]">
                    EXPLORE!
                </span>
            </div>

            <div className="pointer-events-none absolute right-[5%] top-[52%] z-0 hidden h-16 w-16 -rotate-12 rounded-2xl border-4 border-navy bg-pink lg:block" />

            <div className="pointer-events-none absolute bottom-[18%] left-[4%] z-0 hidden rotate-[-15deg] font-display text-5xl font-black text-campus-blue lg:block">
                +
            </div>

            <div className="pointer-events-none absolute bottom-[12%] right-[8%] z-0 hidden h-10 w-10 rotate-45 border-4 border-navy bg-lime lg:block" />

            {/* Small decorative dots */}
            <div className="pointer-events-none absolute left-[18%] top-16 z-0 hidden h-3 w-3 rounded-full bg-pink lg:block" />
            <div className="pointer-events-none absolute right-[20%] top-[34%] z-0 hidden h-4 w-4 rounded-full bg-lime lg:block" />

            <Reveal className="relative z-10 mx-auto mb-9 max-w-7xl px-6 lg:px-8">
                <div className="max-w-3xl">
                    {/* Sticker */}
                    <div className="mb-5 inline-flex -rotate-2 items-center border-2 border-navy bg-lime px-3 py-1.5 shadow-[3px_3px_0_#0B1F3A]">
                        <span className="font-body text-[10px] font-black uppercase tracking-[0.18em] text-navy">
                            ✦ CAMPUS FAIR ✦
                        </span>
                    </div>

                    <p className="font-body text-sm font-bold uppercase tracking-[0.2em] text-navy/60">
                        WHAT&apos;S WAITING FOR YOU? 👀
                    </p>

                    <h2 className="mt-4 max-w-4xl font-display text-[clamp(4rem,10vw,8rem)] leading-[0.78] tracking-tight text-navy">
                        FIND YOUR
                        <br />
                        NEXT STEP.
                    </h2>

                    <p className="mt-6 max-w-2xl font-body text-base leading-6 text-navy md:text-xl">
                        Campus Fair bukan cuma tentang datang
                        dan melihat-lihat. Ini kesempatan buat kamu
                        untuk mencari tahu, mengeksplorasi, dan mulai
                        memikirkan langkahmu setelah lulus sekolah.
                    </p>
                </div>

                <div className="relative mt-10 grid gap-6 md:grid-cols-3">
                    {highlightsData.map((item, index) => (
                        <Reveal
                            key={item.number}
                            delay={index * 90}
                        >
                            <GraphicCard
                                accent={
                                    item.accent as
                                    | "lime"
                                    | "yellow"
                                    | "cyan"
                                    | "pink"
                                }
                                rotate={
                                    item.rotate as
                                    | "0"
                                    | "-2"
                                    | "-1"
                                    | "1"
                                    | "2"
                                }
                                className="p-6 md:p-7"
                            >
                                <span className="font-display text-6xl text-navy">
                                    {item.number}
                                </span>

                                <h3 className="mt-6 font-heading text-2xl font-bold text-navy">
                                    {item.title}
                                </h3>

                                <p className="mt-3 font-body text-lg leading-5 text-navy">
                                    {item.description}
                                </p>
                            </GraphicCard>
                        </Reveal>

                    ))}
                </div>
            </Reveal>

            {/* Decorative shapes */}
            <div className="pointer-events-none absolute right-3 top-20 z-0 h-7 w-7 rotate-12 rounded-full border-3 border-navy bg-lime sm:left-6 sm:h-11 sm:w-11 lg:left-[4%] lg:top-24" />

            <div className="pointer-events-none absolute right-4 top-16 z-0 rotate-12 font-display text-4xl font-black text-pink sm:right-8 sm:text-5xl lg:right-[6%] lg:top-20 lg:text-6xl">
                ✦
            </div>

            <div className="pointer-events-none absolute right-2 top-[42%] z-0 h-11 w-11 -rotate-12 rounded-xl border-3 border-navy bg-pink sm:right-6 sm:h-14 sm:w-14 lg:right-[5%] lg:top-[52%] lg:h-16 lg:w-16" />

            <div className="pointer-events-none absolute left-2 bottom-[20%] z-0 rotate-[-15deg] font-display text-4xl font-black text-campus-blue sm:left-6 sm:text-5xl lg:left-[4%] lg:bottom-[18%]" >
                +
            </div>

            <div className="pointer-events-none absolute right-5 bottom-[7%] z-0 h-8 w-8 rotate-45 border-3 border-navy bg-lime sm:right-10 sm:h-10 sm:w-10 lg:right-[8%] lg:bottom-[12%]" />

            <div className="pointer-events-none absolute left-[18%] top-14 z-0 h-2.5 w-2.5 rounded-full bg-pink sm:h-3 sm:w-3 lg:left-[18%] lg:top-16" />

            <div className="pointer-events-none absolute right-[22%] top-[32%] z-0 h-3 w-3 rounded-full bg-lime sm:h-4 sm:w-4 lg:right-[20%] lg:top-[34%]" />

            {/* Bottom transition */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-linear-to-b from-transparent via-sky to-yellow" />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-linear-to-b from-transparent to-yellow" />
        </section>
    );
}
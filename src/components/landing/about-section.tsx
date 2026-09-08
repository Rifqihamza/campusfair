import DriftWall from "@/components/shared/driftwall";
import Image from "next/image";
import { campusLogo } from "@/data/campusLogo";

export function AboutSection() {
    return (
        <section
            id="about"
            className="relative min-h-dvh overflow-hidden bg-cream py-16 md:py-40"
        >
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-22 bg-linear-to-t from-transparent via-cream/30 to-lime" />

            <div className="relative z-20 mx-auto w-full max-w-7xl px-6 lg:px-5">
                <div className="grid gap-10 lg:grid-cols-[0.6fr_0.5fr] lg:gap-16">
                    <div>
                        {/* Heading */}
                        <div>
                            <div className="relative">
                                <div className="mb-4 inline-flex -rotate-2 items-center gap-2 border-2 border-navy bg-lime px-3 py-1 shadow-[3px_3px_0_#0B1F3A]">
                                    <span className="font-body text-[10px] font-black uppercase tracking-[0.15em] text-navy">
                                        ✦ LET&apos;S TALK ✦
                                    </span>
                                </div>

                                <p className="font-body text-sm font-bold uppercase tracking-[0.2em] text-campus-blue">
                                    CAMPUS FAIR ITU APA SIH?
                                </p>

                                <h2 className="mt-4 font-heading text-4xl font-bold leading-tight text-navy md:text-5xl">
                                    Satu langkah kecil
                                    <br />
                                    menuju masa depanmu.
                                </h2>
                            </div>
                        </div>
                        <div className="relative mt-5 w-full max-w-full -rotate-1 overflow-hidden border-3 border-navy bg-white p-1 shadow-[6px_6px_0_#0B1F3A] sm:border-4 sm:shadow-[-8px_8px_0_#0B1F3A]">                            <div className="absolute right-5 top-5 z-20 rotate-6 border-2 border-navy bg-pink px-3 py-2 shadow-[3px_3px_0_#0B1F3A]">
                            <p className="font-body text-[10px] font-black uppercase tracking-wider text-navy">
                                MEMORIES ✦
                            </p>
                        </div>

                            <Image
                                src="/bersama.jpg"
                                alt="Dokumentasi Campus Fair"
                                width={1280}
                                height={720}
                                priority
                                className="mt-5 aspect-video w-full object-cover contrast-125"
                            />

                            <div className="pointer-events-none absolute inset-1 bg-[radial-gradient(circle_at_1px_1px,#0B1F3A_1px,transparent_0)] bg-size-[5px_5px] opacity-30 mix-blend-multiply sm:inset-1.5" />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="max-w-3xl">
                        <p className="font-body text-lg leading-6 text-navy/70 md:text-xl">
                            <b>Campus Fair</b> merupakan agenda tahunan
                            yang diadakan oleh <b>IKAMAMIIND 2100</b> untuk
                            membantu mempersiapkan siswa dalam
                            memasuki jenjang perkuliahan.
                        </p>

                        <p className="mt-5 font-body text-lg leading-6 text-navy/70 md:text-xl">
                            Lewat Campus Fair, kamu bisa mengenal
                            lebih jauh tentang dunia perkuliahan
                            dan mulai mendapatkan gambaran tentang
                            langkah yang ingin kamu ambil setelah
                            lulus.
                        </p>

                        <div className="relative mt-6 min-h-28">
                            <p className="max-w-full font-body text-lg font-semibold leading-6 text-navy md:text-xl">
                                Jadi, sudah siap menemukan pilihanmu?
                            </p>

                            <div className="absolute right-0 top-14 -rotate-12 border-2 border-navy bg-lime px-2 py-2.5 shadow-[4px_4px_0_#0B1F3A] sm:right-4 sm:top-10 sm:px-3 sm:py-3">
                                <p className="whitespace-nowrap font-heading text-xs font-bold text-navy sm:text-sm md:text-lg">
                                    FIND YOUR NEXT STEP! ↗
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Campus logo wall */}
            <div className="pointer-events-none z-10 mx-auto -mt-70 h-[35em] w-full sticky lg:absolute bottom-0 right-10 lg:bottom-0 lg:-right-1/4 lg:mt-0 lg:h-full lg:w-full">
                <DriftWall
                    items={campusLogo}
                    columns={3}
                    tileWidth={150}
                    tileHeight={150}
                    gap={22}
                    tilt={16}
                    turn={-14}
                    perspective={1200}
                    depth={120}
                    speed={42}
                    direction="up"
                    variance={0.45}
                    parallax={0.10}
                    lift={64}
                    fade={0.2}
                    dim={0.55}
                    overlayColor="#ffffff"
                    radius={100}
                    roll={6}
                    pauseOnHover={false}
                    grayscale={false}
                />
            </div>

            {/* Decorative shapes */}
            <div className="pointer-events-none absolute right-2 top-24 z-10 h-8 w-8 rotate-12 rounded-full border-3 border-navy bg-lime sm:left-4 sm:h-10 sm:w-10 lg:left-[4%] lg:top-24" />

            <div className="pointer-events-none absolute right-3 top-[18%] z-10 rotate-12 font-heading text-3xl font-black text-campus-blue sm:right-6 sm:text-4xl lg:right-auto lg:left-[48%] lg:top-28">
                ✦
            </div>

            <div className="pointer-events-none absolute right-3 top-[42%] z-10 h-10 w-10 -rotate-12 rounded-full border-3 border-navy bg-pink sm:right-6 sm:h-12 sm:w-12 lg:right-[2%] lg:top-auto lg:bottom-52" />

            <div className="pointer-events-none absolute left-2 top-[58%] z-10 -rotate-12 font-heading text-4xl font-black text-pink sm:left-5 sm:text-5xl lg:left-[5%] lg:top-auto lg:bottom-[28%]">
                ★
            </div>

            {/* Bottom transition */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-64 bg-linear-to-b from-transparent via-cream to-sky" />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-12 bg-linear-to-b from-transparent to-sky" />
        </section>
    );
}
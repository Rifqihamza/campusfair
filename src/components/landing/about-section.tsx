import DriftWall from "@/components/shared/driftwall";
import Image from "next/image";
import { campusLogo } from "@/data/campusLogo";

export function AboutSection() {
    return (
        <section
            id="about"
            className="relative overflow-hidden bg-cream py-16 md:py-40 min-h-dvh">

            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-22 bg-linear-to-t from-transparent via-cream/30 to-lime" />

            <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-5">
                <div className="grid gap-10 lg:grid-cols-[0.6fr_0.5fr] lg:gap-16">
                    <div>
                        {/* Heading */}
                        <div>
                            <p className="font-body text-sm font-bold uppercase tracking-[0.2em] text-campus-blue">
                                CAMPUS FAIR ITU APA SIH?
                            </p>

                            <h2 className="mt-4 font-heading text-4xl font-bold leading-tight text-navy md:text-5xl">
                                Satu langkah kecil
                                <br />
                                menuju masa depanmu.
                            </h2>
                        </div>
                        <div className="relative overflow-hidden border-3 border-navy bg-white mt-5 p-1 shadow-[6px_6px_0_#0B1F3A] sm:border-4 sm:shadow-[-8px_8px_0_#0B1F3A] w-[80%]">
                            <Image
                                src="/bersama.jpg"
                                alt="Dokumentasi Campus Fair"
                                width={1280}
                                height={720}
                                priority
                                className="aspect-video w-full mt-5 object-cover grayscale contrast-125"
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

                        <p className="mt-5 font-body text-lg font-semibold leading-8 text-navy">
                            Jadi, sudah siap menemukan pilihanmu?
                        </p>
                    </div>
                </div>
            </div>

            {/* Campus logo wall */}
            <div className="pointer-events-none z-10 mx-auto -mt-70 h-[35em] w-full sticky lg:absolute bottom-0 lg:bottom-0 lg:-right-1/4 lg:mt-0 lg:h-full lg:w-full">
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
                    parallax={0.6}
                    lift={64}
                    fade={0.6}
                    dim={0.55}
                    overlayColor="#ffffff"
                    radius={100}
                    roll={2}
                    pauseOnHover={false}
                    grayscale={false}
                />
            </div>

            {/* Bottom transition */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-64 bg-linear-to-b from-transparent via-cream to-sky" />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-12 bg-linear-to-b from-transparent to-sky" />
        </section>
    );
}
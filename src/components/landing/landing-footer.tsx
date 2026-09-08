import Image from "next/image";
import Link from "next/link";

export function LandingFooter() {
    const navigationLinks = [
        { title: "Tentang", url: "#about" },
        { title: "Kegiatan", url: "#highlights" },
        { title: "Informasi", url: "#info" },
    ];

    const accountLinks = [
        { title: "Login", url: "/login" },
        { title: "Registrasi", url: "/register" },
    ];

    return (
        <footer className="bg-navy px-6 py-12 text-white lg:px-8 lg:py-16">
            <div className="mx-auto max-w-7xl">
                {/* Main footer */}
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.7fr_1fr_1fr_1.2fr] lg:gap-12">
                    {/* Brand */}
                    <div>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-4"
                        >
                            {/* Logos */}
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

                        {/* Typography */}
                        <div className="mt-6">
                            <p className="font-body text-[10px] font-bold uppercase tracking-[0.22em] text-lime sm:text-xs">
                                YOUR NEXT CHAPTER
                            </p>

                            <h2 className="mt-1 font-display text-3xl font-extrabold uppercase leading-[0.85] tracking-wide text-sky sm:text-4xl">
                                STARTS HERE.
                            </h2>
                        </div>

                        {/* Description */}
                        <p className="mt-5 max-w-md font-body text-sm leading-6 text-white/50">
                            Campus Fair adalah ruang untuk mengenal pilihan,
                            menemukan arah, dan memulai langkah berikutnya
                            bersama IKAMAMIIND 2100.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-lime">
                            Navigasi
                        </p>

                        <ul className="mt-5 space-y-3">
                            {navigationLinks.map((item) => (
                                <li key={item.title}>
                                    <a
                                        href={item.url}
                                        className="font-body text-sm text-white/60 transition-colors hover:text-white"
                                    >
                                        {item.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Account */}
                    <div>
                        <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-lime">
                            Peserta
                        </p>

                        <ul className="mt-5 space-y-3">
                            {accountLinks.map((item) => (
                                <li key={item.title}>
                                    <Link
                                        href={item.url}
                                        className="font-body text-sm text-white/60 transition-colors hover:text-white"
                                    >
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-6">
                            <p className="font-body text-xs text-white/40">
                                Sudah punya akun?
                            </p>

                            <Link
                                href="/login"
                                className="mt-1 inline-block font-body text-sm font-bold text-pink transition-colors hover:text-white"
                            >
                                Masuk ke akun →
                            </Link>
                        </div>
                    </div>

                    {/* Event information */}
                    <div>
                        <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-lime">
                            Campus Fair
                        </p>

                        <div className="mt-5 space-y-4">
                            <div>
                                <p className="font-body text-[10px] font-bold uppercase tracking-[0.15em] text-white/30">
                                    Penyelenggara
                                </p>

                                <p className="mt-1 font-body text-sm text-white/70">
                                    IKAMAMIIND 2100
                                </p>
                            </div>

                            <div>
                                <p className="font-body text-[10px] font-bold uppercase tracking-[0.15em] text-white/30">
                                    Alumni
                                </p>

                                <p className="mt-1 font-body text-sm text-white/70">
                                    SMK Mitra Industri MM2100
                                </p>
                            </div>

                            <div>
                                <p className="font-body text-[10px] font-bold uppercase tracking-[0.15em] text-white/30">
                                    Tahun
                                </p>

                                <p className="mt-1 font-display text-xl text-sky">
                                    2027
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact / info strip */}
                <div className="mt-12 grid gap-6 border-y border-white/10 py-6 sm:grid-cols-3 sm:gap-8">
                    <div>
                        <p className="font-body text-[10px] font-bold uppercase tracking-[0.18em] text-white/30">
                            Informasi
                        </p>

                        <p className="mt-1 font-body text-sm text-white/60">
                            Temukan informasi Campus Fair melalui halaman
                            informasi yang tersedia.
                        </p>
                    </div>

                    <div>
                        <p className="font-body text-[10px] font-bold uppercase tracking-[0.18em] text-white/30">
                            Peserta
                        </p>

                        <p className="mt-1 font-body text-sm text-white/60">
                            Daftar, pilih kegiatan, dan simpan tiket QR
                            untuk digunakan saat acara.
                        </p>
                    </div>

                    <div>
                        <p className="font-body text-[10px] font-bold uppercase tracking-[0.18em] text-white/30">
                            Kehadiran
                        </p>

                        <p className="mt-1 font-body text-sm text-white/60">
                            Gunakan tiket QR yang telah didapat untuk
                            proses check-in dan check-out.
                        </p>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-body text-xs text-white/30">
                        © 2027 IKAMAMIIND 2100. All rights reserved.
                    </p>

                    <p className="font-body text-xs text-white/20">
                        Built for Campus Fair 2027.
                    </p>
                </div>
            </div>
        </footer>
    );
}
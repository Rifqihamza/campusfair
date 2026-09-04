import Link from "next/link";
import Image from "next/image";
export function LandingFooter() {
    const linkPage = [
        { title: "Tentang", url: "#about" },
        { title: "Kegiatan", url: "#highlights" },
        { title: "Informasi", url: "#info" },
        { title: "Login", url: "/login" },
        { title: "Registrasi", url: "/register" }
    ]
    return (
        <footer className="bg-navy px-6 py-10 text-white lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                    <div>
                        <Link
                            href="/"
                            className="flex flex-row items-center gap-4"
                        >
                            <Image
                                src="/logo.jpg"
                                alt="Logo IKAMAMIIND 2100"
                                width={50}
                                height={50}
                                priority
                                className="h-18 w-18 rounded-full object-cover md:h-12.5 md:w-12.5"
                            />
                            <span className="font-display text-4xl leading-[0.8]">
                                IKAMAMIIND
                                <br />
                                2100
                            </span>
                        </Link>

                        <p className="mt-5 max-w-sm font-body text-sm leading-6 text-white/50">
                            Campus Fair — ruang untuk
                            mengenal pilihan, menemukan
                            arah, dan memulai langkah
                            berikutnya.
                        </p>
                    </div>
                    <ul className="flex flex-wrap gap-x-6 gap-y-3">
                        {linkPage.map((item) => (
                            <li key={item.title}>
                                <a className="font-body text-sm text-white/60 transition-colors hover:text-white"
                                    href={item.url}>{item.title}</a>
                            </li>

                        ))}
                    </ul>
                </div>

                <div className="mt-10 border-t border-white/10 pt-6">
                    <p className="font-body text-xs text-white/30">
                        © 2027 IKAMAMIIND 2100. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
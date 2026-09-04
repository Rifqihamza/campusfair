import Link from "next/link";

export function RegistrationCta() {
    return (
        <section className="relative isolate overflow-hidden bg-campus-blue py-8 text-white md:py-[144px]">
            <div className="relative z-10 mx-auto max-w-5xl px-6 text-center lg:px-8">
                <p className="font-body text-sm font-bold uppercase tracking-[0.2em] text-lime">
                    READY?
                </p>

                <h2 className="mt-5 font-display text-[clamp(4.5rem,12vw,9rem)] leading-[0.78] tracking-tight">
                    YOUR NEXT
                    <br />
                    CHAPTER
                    <br />
                    STARTS NOW.
                </h2>

                <p className="mx-auto mt-6 max-w-xl font-body text-xl leading-6 text-white/90">
                    Jangan lewatkan kesempatan untuk
                    menjadi bagian dari Campus Fair.
                    Daftarkan dirimu dan mulai langkah
                    berikutnya.
                </p>

                <Link
                    href="/register"
                    className="mt-6 inline-flex rounded-lg border-2 border-navy bg-lime px-7 py-3.5 font-body font-bold text-navy shadow-[6px_6px_0_#0B1F3A] transition-[transform,box-shadow] duration-300 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[4px_4px_0_#0B1F3A]"
                >
                    Daftar Sekarang
                </Link>
            </div>

            {/* Temporary decorative shapes */}
            <div className="absolute -left-20 top-16 hidden h-64 w-64 rounded-full border-[5px] border-lime/80 lg:block" />

            <div className="absolute -right-24 bottom-0 hidden h-72 w-72 rotate-12 bg-pink lg:block rounded-xl border-4 border-yellow" />
        </section>
    );
}
type AdminHeroProps = {
    eyebrow: string;
    title: string;
    description: string;
    children?: React.ReactNode;
};

export function AdminHero({
    eyebrow,
    title,
    description,
    children,
}: AdminHeroProps) {
    return (
        <section className="relative mt-5 overflow-hidden rounded-3xl border-2 border-navy bg-navy px-7 py-8 shadow-[6px_6px_0_#B5FF2C] sm:px-10">
            <div className="relative z-10">
                <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-lime">
                    {eyebrow}
                </p>

                <h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.82] tracking-tight text-cream sm:text-6xl">
                    {title}
                </h1>

                <p className="mt-5 max-w-2xl font-body text-sm leading-6 text-sky sm:text-base">
                    {description}
                </p>

                {children}
            </div>

            {/* Decorative Circle */}
            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-lime sm:h-44 sm:w-44" />

            {/* Decorative Shape */}
            <div className="absolute -bottom-12 right-4 sm:right-28 h-28 w-36 rotate-12 rounded-2xl bg-sky/30" />

            {/* Small Circle */}
            <div className="absolute bottom-12 right-72 hidden h-10 w-10 rounded-full bg-pink lg:block" />
        </section>
    );
}
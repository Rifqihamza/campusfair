type ParticipantHeroProps = {
    eyebrow: string;
    title: React.ReactNode | string;
    description: string;
};

export function ParticipantHero({
    eyebrow,
    title,
    description,
}: ParticipantHeroProps) {
    return (
        <section className="relative mt-5 overflow-hidden rounded-3xl border-2 border-navy bg-navy px-7 py-10 shadow-[0px_6px_0_#B5FF2C] sm:px-10 sm:py-12">
            <div className="relative z-10 max-w-4xl">
                <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-lime">
                    {eyebrow}
                </p>

                <h1 className="mt-4 font-display text-5xl leading-[0.82] tracking-tight text-cream sm:text-6xl md:text-7xl">
                    {title}
                </h1>

                <p className="mt-2 max-w-2xl text-md font-semibold leading-5 text-sky md:leading-6 sm:text-base">
                    {description}
                </p>
            </div>

            {/* Decorative Circle */}
            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-lime sm:h-44 sm:w-44" />

            {/* Decorative Shape */}
            <div className="absolute -bottom-12 right-4 h-28 w-36 rotate-12 rounded-2xl bg-sky/30 sm:right-28" />

            {/* Small Circle */}
            <div className="absolute bottom-12 right-72 hidden h-10 w-10 rounded-full bg-pink lg:block" />
        </section>
    );
}
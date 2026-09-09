"use client";

import Image from "next/image";
import Link from "next/link";
import { LogoutButton } from "../auth/logout-button";
import { useState } from "react";
import { Menu, X } from "lucide-react";

type ParticipantHeaderProps = {
    activePage?: "dashboard" | "events";
};

export function ParticipantHeader({
    activePage,
}: ParticipantHeaderProps) {
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-5 z-50 mx-auto w-full max-w-7xl">
            <div className="rounded-xl bg-navy px-4 py-3 shadow-[0_2px_6px_0] shadow-navy/30 sm:px-5">
                {/* MAIN HEADER */}
                <div className="flex items-center justify-between">
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-3"
                        onClick={() => setOpen(false)}
                    >
                        <Image
                            src="/cf-banner.png"
                            alt="Banner Campus Fair 2027"
                            width={1080}
                            height={720}
                            priority
                            className="h-auto w-30"
                        />
                    </Link>

                    {/* DESKTOP NAV */}
                    <nav className="hidden items-center gap-2 sm:flex sm:gap-4">
                        <Link
                            href="/dashboard"
                            className={`px-3 py-2 font-body text-sm font-bold transition-colors sm:px-4 ${activePage === "dashboard"
                                ? "text-lime"
                                : "text-cream hover:text-lime"
                                }`}
                        >
                            Dashboard
                        </Link>

                        <Link
                            href="/events"
                            className={`px-3 py-2 font-body text-sm font-bold transition-colors sm:px-4 ${activePage === "events"
                                ? "text-lime"
                                : "text-cream hover:text-lime"
                                }`}
                        >
                            Event
                        </Link>
                        <LogoutButton
                            className="border-none bg-red-500 px-4 py-3 font-body font-bold text-white transition-colors duration-300 hover:bg-red-400 hover:text-white"
                        />
                    </nav>

                    {/* MOBILE MENU BUTTON */}
                    <button
                        type="button"
                        aria-label={open ? "Tutup menu" : "Buka menu"}
                        aria-expanded={open}
                        onClick={() => setOpen((value) => !value)}
                        className="inline-flex items-center justify-center rounded-lg border-2 border-navy bg-lime p-2 text-navy transition-transform hover:translate-y-0.5 sm:hidden"
                    >
                        {open ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                {/* MOBILE NAV */}
                {open && (
                    <nav className="mt-3 border-t-2 border-navy/20 pt-3 sm:hidden">
                        <div className="flex flex-col gap-1">
                            <Link
                                href="/dashboard"
                                onClick={() => setOpen(false)}
                                className={`rounded-lg px-4 py-3 font-body text-sm font-bold transition-colors ${activePage === "dashboard"
                                    ? "bg-lime text-navy"
                                    : "text-cream hover:bg-navy/10 hover:text-lime"
                                    }`}
                            >
                                Dashboard
                            </Link>

                            <Link
                                href="/events"
                                onClick={() => setOpen(false)}
                                className={`rounded-lg px-4 py-3 font-body text-sm font-bold transition-colors ${activePage === "events"
                                    ? "bg-lime text-navy"
                                    : "text-cream hover:bg-navy/10 hover:text-lime"
                                    }`}
                            >
                                Event
                            </Link>
                            <div className="mt-4 border-t border-dashed border-sky w-full flex flex-col">
                                <LogoutButton
                                    className="mt-4 border-none bg-red-500 px-4 py-3 font-body text-[14px] font-bold text-white transition-colors duration-300 hover:bg-red-400 hover:text-white"
                                />
                            </div>
                        </div>
                    </nav>
                )}
            </div>
        </header>
    );
}
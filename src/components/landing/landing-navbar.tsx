"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { X, Menu } from "lucide-react";

export function LandingNavbar() {
    const [scrolled, setIsScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        return () => {
            window.removeEventListener(
                "scroll",
                handleScroll,
            );
        };
    }, []);

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <header className="fixed inset-x-0 top-0 z-50">
            <div
                className={[
                    "mx-auto transition-all duration-500",
                    // Desktop
                    ,
                    scrolled
                        ? "px-4 py-3 md:px-6 md:py-4 md:w-7xl"
                        : "px-4 py-2 md:px-6 md:py-2 md:w-full",
                ].join(" ")}
            >
                <div
                    className={[
                        "relative flex items-center justify-between",
                        "px-4 py-3 md:px-3 md:py-2",
                        "transition-all duration-500",
                        scrolled
                            ? "rounded-2xl bg-campus-blue shadow-[0_2px_6px_0] shadow-navy backdrop-blur-xl"
                            : "bg-campus-blue/5",
                    ].join(" ")}
                >
                    {/* Logo */}
                    <Link
                        href="/"
                        onClick={closeMenu}
                        className="flex items-center gap-2.5 md:gap-3"
                    >
                        <Image
                            src="/logo.jpg"
                            alt="Logo IKAMAMIIND 2100"
                            width={50}
                            height={50}
                            priority
                            className="h-10 w-10 rounded-full object-cover md:h-12.5 md:w-12.5"
                        />

                        <span
                            className={[
                                "flex flex-col -space-y-1.5 font-display tracking-wide md:-space-y-2",
                                "transition-colors duration-300",
                                scrolled
                                    ? "text-white"
                                    : "text-white",
                            ].join(" ")}
                        >
                            <span className="text-lg md:text-xl">
                                IKAMAMIIND
                            </span>

                            <span className="text-2xl md:text-2xl">
                                2100
                            </span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden items-center gap-8 md:flex">
                        <a
                            href="#hero"
                            className={[
                                "font-body text-sm font-semibold",
                                "transition-colors duration-300",
                                scrolled
                                    ? "text-white/90 hover:text-white"
                                    : "text-white/80 hover:text-white",
                            ].join(" ")}
                        >
                            Home
                        </a>
                        <a
                            href="#about"
                            className={[
                                "font-body text-sm font-semibold",
                                "transition-colors duration-300",
                                scrolled
                                    ? "text-white/90 hover:text-white"
                                    : "text-white/80 hover:text-white",
                            ].join(" ")}
                        >
                            Tentang
                        </a>

                        <a
                            href="#highlights"
                            className={[
                                "font-body text-sm font-semibold",
                                "transition-colors duration-300",
                                scrolled
                                    ? "text-white/70 hover:text-white"
                                    : "text-white/80 hover:text-white",
                            ].join(" ")}
                        >
                            Kegiatan
                        </a>

                        <a
                            href="#info"
                            className={[
                                "font-body text-sm font-semibold",
                                "transition-colors duration-300",
                                scrolled
                                    ? "text-white/70 hover:text-white"
                                    : "text-white/80 hover:text-white",
                            ].join(" ")}
                        >
                            Informasi
                        </a>
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden items-center gap-4 md:flex pr-5">
                        <Link
                            href="/login"
                            className={`rounded-lg bg-pink px-5 py-2.5 font-body text-sm font-bold text-cream hover:bg-navy hover:text-cream transition-all duration-300 ${scrolled ? "border-none" : "border-none"}`}                        >
                            Login
                        </Link>

                        <Link
                            href="/register"
                            className={`rounded-lg bg-lime px-5 py-2.5 font-body text-sm font-bold text-navy hover:bg-navy hover:text-cream transition-all duration-300 ${scrolled ? "border-none" : "border-none"}`}
                        >
                            Daftar
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        aria-label={
                            menuOpen
                                ? "Tutup menu"
                                : "Buka menu"
                        }
                        aria-expanded={menuOpen}
                        onClick={() =>
                            setMenuOpen((prev) => !prev)
                        }
                        className={[
                            "flex h-10 w-10 items-center justify-center rounded-lg md:hidden",
                            "transition-colors duration-300",
                            scrolled
                                ? "text-white hover:bg-navy/5"
                                : "text-white hover:bg-white/10",
                        ].join(" ")}
                    >
                        {menuOpen ? <X /> : <Menu />}
                    </button>

                    {/* Mobile Menu */}
                    <div
                        className={[
                            "absolute inset-x-0 top-full mt-2 overflow-hidden rounded-xl",
                            "bg-cream shadow-xl md:hidden",
                            "transition-all duration-300",
                            menuOpen
                                ? "visible max-h-105 translate-y-0 opacity-100"
                                : "invisible max-h-0 -translate-y-2 opacity-0",
                        ].join(" ")}
                    >
                        <nav className="flex flex-col p-4">
                            <a
                                href="#about"
                                onClick={closeMenu}
                                className="rounded-lg px-4 py-3 font-body text-sm font-semibold text-navy transition-colors hover:bg-navy/5"
                            >
                                Tentang
                            </a>

                            <a
                                href="#highlights"
                                onClick={closeMenu}
                                className="rounded-lg px-4 py-3 font-body text-sm font-semibold text-navy transition-colors hover:bg-navy/5"
                            >
                                Kegiatan
                            </a>

                            <a
                                href="#info"
                                onClick={closeMenu}
                                className="rounded-lg px-4 py-3 font-body text-sm font-semibold text-navy transition-colors hover:bg-navy/5"
                            >
                                Informasi
                            </a>

                            <div className="my-2 border-t border-navy/10" />

                            <div className="flex flex-row items-center justify-between w-full gap-3">
                                <Link
                                    href="/login"
                                    onClick={closeMenu}
                                    className="mt-2 w-full rounded-lg border-2 border-navy bg-pink px-4 py-3 text-center font-body text-sm font-bold text-cream shadow-[3px_3px_0_#0B1F3A]"
                                >
                                    Login
                                </Link>

                                <Link
                                    href="/register"
                                    onClick={closeMenu}
                                    className="mt-2 w-full rounded-lg border-2 border-navy bg-lime px-4 py-3 text-center font-body text-sm font-bold text-navy shadow-[3px_3px_0_#0B1F3A]"
                                >
                                    Daftar Sekarang
                                </Link>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </header >
    );
}
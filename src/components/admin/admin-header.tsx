import Image from "next/image";
import Link from "next/link";
import { LogoutButton } from "@/components/auth/logout-button";

export function AdminHeader() {
    return (
        <header className="sticky top-5 z-20 mx-auto w-full max-w-7xl rounded-full bg-navy text-cream shadow-[0_4px_0_rgba(11,31,58,0.25)]">
            <div className="flex items-center justify-between rounded-full bg-navy px-4 py-2 text-cream sm:px-5">
                <Link
                    href="/admin"
                    className="flex items-center gap-3"
                >
                    <Image
                        src="/logo.jpg"
                        alt="Logo IKAMAMIIND 2100"
                        width={50}
                        height={50}
                        priority
                        className="h-10 w-10 rounded-full object-cover sm:h-12 sm:w-12"
                    />

                    <div className="flex flex-col -space-y-2 font-display leading-none tracking-wide">
                        <span className="text-xl sm:text-2xl">
                            IKAMAMIIND
                        </span>

                        <span className="text-2xl sm:text-3xl">
                            2100
                        </span>
                    </div>
                </Link>

                <div className="flex items-center gap-4">
                    <span className="hidden font-body text-sm font-bold text-sky sm:block">
                        ADMIN PANEL
                    </span>

                    <LogoutButton
                        className="border-none bg-transparent pr-2 font-body text-[16px] font-bold text-white transition-colors duration-300 hover:bg-transparent hover:text-lime"
                    />
                </div>
            </div>
        </header>
    );
}
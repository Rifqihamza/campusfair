"use client";

import { signOut } from "next-auth/react";
import { LogOutIcon } from "lucide-react";
interface BtnPropsLogout {
    className?: string
}

export function LogoutButton({ className }: BtnPropsLogout) {
    const handleLogout = async () => {
        await signOut({
            callbackUrl: "/login",
        });
    };

    return (
        <button
            type="button"
            onClick={handleLogout}
            className={`${className} flex flex-row items-center justify-between gap-2 text-sm rounded-lg border p-3 font-semibold uppercase tracking-wider transition hover:bg-gray-100 cursor-pointer`}
        >
            Logout
            <LogOutIcon size={18} />
        </button>
    );
}
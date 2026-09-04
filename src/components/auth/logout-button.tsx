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
            className={`${className} rounded-lg border p-3 text-sm font-medium transition hover:bg-gray-100 cursor-pointer`}
        >
            <LogOutIcon size={18} />
        </button>
    );
}
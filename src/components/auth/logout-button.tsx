"use client";

import { signOut } from "next-auth/react";

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
            className={`${className} rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-gray-100 cursor-pointer`}
        >
            Logout →
        </button>
    );
}
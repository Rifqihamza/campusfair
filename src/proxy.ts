import { auth } from "@/lib/auth/auth";
import { NextResponse } from "next/server";

export const proxy = auth((request) => {
    const { pathname } = request.nextUrl;
    const isLoggedIn = !!request.auth;
    const role = request.auth?.user?.role;

    const isDashboard = pathname.startsWith("/dashboard");
    const isAdmin = pathname.startsWith("/admin");
    const isTicket = /^\/events\/[^/]+\/ticket$/.test(pathname);

    if (isDashboard && !isLoggedIn) {
        return NextResponse.redirect(
            new URL("/login", request.url),
        );
    }

    if (isTicket && !isLoggedIn) {
        return NextResponse.redirect(
            new URL("/login", request.url),
        );
    }

    if (isAdmin) {
        if (!isLoggedIn) {
            return NextResponse.redirect(
                new URL("/login", request.url),
            );
        }

        if (role !== "ADMIN") {
            return NextResponse.redirect(
                new URL("/dashboard", request.url),
            );
        }
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/admin/:path*",
        "/events/:path*/ticket",
    ],
};
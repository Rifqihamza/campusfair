"use client";

import type {
    ReactNode,
} from "react";

type ModalProps = {
    open: boolean;
    children: ReactNode;
};

export function Modal({
    open,
    children,
}: ModalProps) {
    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-navy/70 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
                {children}
            </div>
        </div>
    );
}
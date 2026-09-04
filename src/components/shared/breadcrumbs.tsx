"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type BreadcrumbItem = {
    label: string;
    href?: string;
};

type BreadcrumbsProps = {
    items: BreadcrumbItem[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <nav aria-label="Breadcrumb" className="font-body">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm font-bold text-lime/70">
                <li>
                    <Link
                        href="/dashboard"
                        className="transition-colors hover:text-lime"
                    >
                        Dashboard
                    </Link>
                </li>

                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
                            <ChevronRight className="h-4 w-4 shrink-0 text-lime" />

                            {item.href && !isLast ? (
                                <Link
                                    href={item.href}
                                    className="transition-colors hover:text-lime"
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span
                                    aria-current={isLast ? "page" : undefined}
                                    className={isLast ? "text-lime" : undefined}
                                >
                                    {item.label}
                                </span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
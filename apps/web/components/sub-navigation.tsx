"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export interface SubNavItem {
    label: string;
    href: string;
}

interface SubNavigationProps {
    items: SubNavItem[];
}

export function SubNavigation({ items }: SubNavigationProps) {
    const pathname = usePathname();

    return (
        <div className="border-b border-gray-200 bg-white">
            <nav className="flex space-x-8 px-6" aria-label="Sub navigation">
                {items.map((item) => {
                    // Exact match first
                    let isActive = pathname === item.href;

                    // Then check if it's a parent route with children
                    // But only if there are no other exact matches
                    if (!isActive) {
                        const exactMatch = items.some(i => i.href === pathname);
                        if (!exactMatch && pathname.startsWith(item.href + "/")) {
                            isActive = true;
                        }
                    }

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "border-b-2 py-4 px-1 text-sm font-medium transition-colors",
                                isActive
                                    ? "border-blue-600 text-blue-600"
                                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                            )}
                        >
                            {item.label}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}

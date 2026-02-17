"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProgramLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const navItems = [
        { name: "Dashboard", href: "/admin/academic/program" },
        { name: "Faculties", href: "/admin/academic/program/faculties" },
        { name: "Departments", href: "/admin/academic/program/departments" },
        { name: "Programs", href: "/admin/academic/program/programs" },
        { name: "Courses", href: "/admin/academic/program/courses" },
    ];

    return (
        <div>
            <nav className="border-b border-gray-200 bg-white">
                <div className="container mx-auto flex space-x-8 px-4">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`border-b-2 px-3 py-4 text-sm font-medium transition-colors ${isActive
                                    ? "border-blue-500 text-blue-600"
                                    : "border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-900"
                                    }`}
                            >
                                {item.name}
                            </Link>
                        );
                    })}
                </div>
            </nav>
            <main>{children}</main>
        </div>
    );
}

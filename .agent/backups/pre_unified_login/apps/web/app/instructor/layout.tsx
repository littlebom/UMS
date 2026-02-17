"use client";
import Link from "next/link";
import { logoutInstructor, getInstructorSession } from "@/actions/instructor-auth";
import { LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function InstructorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const isLoginPage = pathname === "/instructor/login";
    const [isLoading, setIsLoading] = useState(!isLoginPage);

    useEffect(() => {
        if (!isLoginPage) {
            getInstructorSession()
                .then((session) => {
                    if (!session || session.role !== "INSTRUCTOR") {
                        router.push("/instructor/login");
                    } else {
                        setIsLoading(false);
                    }
                })
                .catch(() => {
                    router.push("/instructor/login");
                });
        }
    }, [isLoginPage, router]);

    if (isLoginPage) {
        return <>{children}</>;
    }

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <nav className="bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex flex-shrink-0 items-center">
                                <span className="text-xl font-bold text-blue-600">UMS Instructor</span>
                            </div>
                            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                <Link
                                    href="/instructor/dashboard"
                                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                >
                                    Dashboard
                                </Link>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <form action={logoutInstructor}>
                                <button
                                    type="submit"
                                    className="rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    <LogOut className="mr-2 inline-block h-4 w-4" />
                                    Sign out
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                {children}
            </main>
        </div>
    );
}

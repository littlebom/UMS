"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { LogOut, GraduationCap, Calendar, BookOpen } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/contexts/language-context";

export default function StudentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const { data: session, status } = useSession();
    const isLoginPage = pathname === "/student/login";
    const isLoading = status === "loading";
    const { t } = useLanguage();

    useEffect(() => {
        if (!isLoginPage && status === "unauthenticated") {
            router.push("/api/auth/signin");
        } else if (!isLoginPage && status === "authenticated") {
            const role = (session?.user as any)?.role;
            if (role !== "STUDENT") {
                router.push("/");
            }
        }
    }, [isLoginPage, status, session, router]);

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
                                <span className="text-xl font-bold text-blue-600">UMS Student</span>
                            </div>
                            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                <Link
                                    href="/student/dashboard"
                                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                >
                                    {t.menu.dashboard}
                                </Link>
                                <Link
                                    href="/student/registration"
                                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                >
                                    {t.student.registration}
                                </Link>
                                <Link
                                    href="/student/schedule"
                                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                >
                                    {t.student.schedule}
                                </Link>
                                <Link
                                    href="/student/transcript"
                                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                >
                                    {t.student.transcript}
                                </Link>
                                <Link
                                    href="/student/finance"
                                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                >
                                    {t.student.finance}
                                </Link>
                                <Link
                                    href="/student/announcements"
                                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                >
                                    {t.student.announcements}
                                </Link>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <LanguageSwitcher />
                            <button
                                onClick={() => signOut({ callbackUrl: "/student/login" })}
                                className="rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                <LogOut className="mr-2 inline-block h-4 w-4" />
                                {t.common.signOut}
                            </button>
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

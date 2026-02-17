"use client";
import Link from "next/link";
import { GraduationCap, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getApplicantSession, logoutApplicant } from "@/actions/auth";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/contexts/language-context";

export default function ApplicantLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();

    // Public pages that don't require authentication
    const publicPages = ["/admissions", "/login", "/admissions/register"];
    const isPublicPage = publicPages.includes(pathname);

    const [isLoading, setIsLoading] = useState(!isPublicPage);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { t } = useLanguage();

    useEffect(() => {
        // Check session on all pages to show correct navigation
        getApplicantSession()
            .then((session) => {
                if (session && session.role === "APPLICANT") {
                    setIsAuthenticated(true);
                }
                if (!isPublicPage && (!session || session.role !== "APPLICANT")) {
                    router.push("/login");
                }
                setIsLoading(false);
            })
            .catch(() => {
                if (!isPublicPage) {
                    router.push("/login");
                }
                setIsLoading(false);
            });
    }, [isPublicPage, router]);

    if (!isPublicPage && isLoading) {
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
            {/* Navbar - Consistent with Homepage */}
            <nav className="bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <Link href="/admissions" className="flex flex-shrink-0 items-center">
                                <GraduationCap className="h-8 w-8 text-blue-600" />
                                <span className="ml-2 text-xl font-bold text-gray-900">
                                    {t.applicant.title}
                                </span>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <LanguageSwitcher />
                            {isAuthenticated ? (
                                <>
                                    <Link
                                        href="/admissions/dashboard"
                                        className="text-sm font-medium text-gray-500 hover:text-gray-900"
                                    >
                                        {t.menu.dashboard}
                                    </Link>
                                    <form action={logoutApplicant}>
                                        <button
                                            type="submit"
                                            className="flex items-center gap-2 rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            {t.common.signOut}
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="text-sm font-medium text-gray-500 hover:text-gray-900"
                                    >
                                        {t.applicant.login}
                                    </Link>
                                    <Link
                                        href="/admissions/register"
                                        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                                    >
                                        {t.applicant.register}
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            <main>{children}</main>
            <footer className="border-t border-gray-200 bg-white py-8">
                <div className="container mx-auto px-4 text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} University Management System. All rights reserved.
                </div>
            </footer>
        </div>
    );
}

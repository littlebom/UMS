"use client";
import { Sidebar } from "@/components/sidebar";
import { TopNav } from "@/components/top-nav";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAdminSession } from "@/actions/auth";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const isLoginPage = pathname === "/admin/login";
    const [isLoading, setIsLoading] = useState(!isLoginPage);

    useEffect(() => {
        if (!isLoginPage) {
            getAdminSession()
                .then((session) => {
                    if (!session || session.role !== "ADMIN") {
                        router.push("/admin/login");
                    } else {
                        setIsLoading(false);
                    }
                })
                .catch(() => {
                    router.push("/admin/login");
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
        <div className="min-h-screen bg-[#f5f7fa]">
            <TopNav />
            <div className="flex">
                <Sidebar />
                <main className="flex-1 p-6 pt-24 md:p-10 md:pl-72">
                    <div className="mx-auto max-w-6xl">{children}</div>
                </main>
            </div>
        </div>
    );
}

"use client";
import { Sidebar } from "@/components/sidebar";
import { TopNav } from "@/components/top-nav";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const { data: session, status } = useSession();
    const isLoginPage = pathname === "/admin/login";
    const isLoading = status === "loading";

    useEffect(() => {
        if (!isLoginPage && status === "unauthenticated") {
            router.push("/api/auth/signin"); // Redirect to NextAuth signin
        } else if (!isLoginPage && status === "authenticated") {
            // Check role
            const role = (session?.user as any)?.role;
            if (role !== "ADMIN" && role !== "STAFF") {
                router.push("/"); // Unauthorized
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

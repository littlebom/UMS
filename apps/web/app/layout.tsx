import "./globals.css";
import type { Metadata } from "next";
import { Inter, Raleway } from "next/font/google";

// Initialize rate limit cleanup scheduler
import "@/lib/rate-limit-cleanup";

const inter = Inter({ subsets: ["latin"] });
const raleway = Raleway({
    subsets: ["latin"],
    variable: '--font-raleway',
    display: 'swap',
});

export const metadata: Metadata = {
    title: "UMS - University Management System",
    description: "Comprehensive University Management System",
};

import { LanguageProvider } from "@/contexts/language-context";
import { Providers } from "@/components/providers";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.className} ${raleway.variable}`} suppressHydrationWarning>
                <Providers>
                    <LanguageProvider>
                        {children}
                    </LanguageProvider>
                </Providers>
            </body>
        </html>
    );
}

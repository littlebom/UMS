"use client";

import { PublicNavbar } from "@/components/public-navbar";
import { ChatWidget } from "@/components/chat-widget";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { HeroSlider } from "@/components/hero-slider";

interface HomeClientProps {
    banners: any[];
    announcements: any[];
    aiSettings: any;
}

const MOCK_NEWS = [
    {
        id: "mock-1",
        title: "University Rankings 2024 Released",
        content: "Our university has been ranked among the top 50 institutions worldwide for academic excellence and research impact.",
        publishedAt: new Date("2024-03-15"),
    },
    {
        id: "mock-2",
        title: "New Science Center Opening",
        content: "The state-of-the-art Science and Innovation Center will open its doors to students and faculty next month.",
        publishedAt: new Date("2024-03-10"),
    },
    {
        id: "mock-3",
        title: "International Exchange Program",
        content: "Applications are now open for the Spring 2025 international exchange program with partner universities in Europe.",
        publishedAt: new Date("2024-03-05"),
    },
    {
        id: "mock-4",
        title: "Student Achievement Awards",
        content: "Congratulations to our students who received national recognition for their outstanding community service projects.",
        publishedAt: new Date("2024-03-01"),
    },
];

export function HomeClient({ banners, announcements, aiSettings }: HomeClientProps) {
    const { t } = useLanguage();

    // specific logic: use mock news if no announcements from DB
    const activeNews = announcements && announcements.length > 0 ? announcements : MOCK_NEWS;

    return (
        <div className="min-h-screen bg-gray-50">
            <PublicNavbar />

            {/* Hero Section / Slider */}
            <HeroSlider banners={banners} />

            {/* News Section */}
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="mb-8 flex items-center justify-between">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                        {t.landing.latestNews}
                    </h2>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {activeNews.length === 0 ? (
                        <div className="col-span-full text-center text-gray-500">
                            {t.landing.noNews}
                        </div>
                    ) : (
                        activeNews.map((news) => (
                            <div
                                key={news.id}
                                className="flex flex-col overflow-hidden rounded-lg bg-white shadow-lg transition-shadow hover:shadow-xl"
                            >
                                <div className="flex-1 p-6">
                                    <div className="flex items-center text-sm text-gray-500">
                                        <time dateTime={news.publishedAt?.toString()}>
                                            {formatDate(news.publishedAt || new Date())}
                                        </time>
                                    </div>
                                    <h3 className="mt-2 text-xl font-semibold text-gray-900 line-clamp-2">
                                        {news.title}
                                    </h3>
                                    <p className="mt-3 text-base text-gray-500 line-clamp-3">
                                        {news.content}
                                    </p>
                                </div>
                                <div className="bg-gray-50 px-6 py-4">
                                    <div className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-500">
                                        {t.landing.readMore} <ArrowRight className="ml-1 h-4 w-4" />
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <p className="text-center text-base text-gray-400">
                        &copy; {new Date().getFullYear()} {t.landing.copyright}
                    </p>
                </div>
            </footer>

            {/* Chat Widget */}
            <ChatWidget isEnabled={aiSettings.isActive} />
        </div>
    );
}

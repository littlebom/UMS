"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowDown, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Banner {
    id: string | number;
    imageUrl: string;
    title: string;
    description: string;
    linkUrl?: string;
}

interface HeroSliderProps {
    banners: Banner[];
}

const DEFAULT_BANNERS: Banner[] = [
    {
        id: "demo-1",
        imageUrl: "/images/hero/bg01.jpg",
        title: "UNIVERSITY MS",
        description: "Experience the future of education with our modern learning platform.",
        linkUrl: "/register",
    },
    {
        id: "demo-2",
        imageUrl: "/images/hero/bg02.jpg",
        title: "EMPOWERING STUDENTS",
        description: "Join a community of learners and achieve your academic goals.",
        linkUrl: "/register",
    },
    {
        id: "demo-3",
        imageUrl: "/images/hero/bg03.jpg",
        title: "INNOVATIVE RESEARCH",
        description: "Discover ground-breaking research and world-class facilities.",
        linkUrl: "/register",
    },
    {
        id: "demo-4",
        imageUrl: "/images/hero/bg04.jpg",
        title: "GLOBAL CONNECTION",
        description: "Connect with students and alumni from around the world.",
        linkUrl: "/register",
    },
];

export function HeroSlider({ banners }: HeroSliderProps) {
    // specific logic: if no banners provided (or empty array), use default demo banners to match the archive look
    const activeBanners = banners && banners.length > 0 ? banners : DEFAULT_BANNERS;

    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Auto-advance
    useEffect(() => {
        if (activeBanners.length <= 1 || !isAutoPlaying) return;

        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % activeBanners.length);
        }, 6000); // 6 seconds per slide

        return () => clearInterval(timer);
    }, [activeBanners.length, isAutoPlaying]);

    const nextSlide = () => {
        setIsAutoPlaying(false);
        setCurrentSlide((prev) => (prev + 1) % activeBanners.length);
    };

    const prevSlide = () => {
        setIsAutoPlaying(false);
        setCurrentSlide((prev) => (prev === 0 ? activeBanners.length - 1 : prev - 1));
    };

    if (!activeBanners || activeBanners.length === 0) return null;

    return (
        <div className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full overflow-hidden bg-gray-900 text-white group">
            {/* Slides */}
            {activeBanners.map((banner, index) => (
                <div
                    key={banner.id}
                    className={cn(
                        "absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out",
                        index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                    )}
                >
                    {/* Background Image with Zoom Effect */}
                    <div className="absolute inset-0 overflow-hidden">
                        <img
                            src={banner.imageUrl}
                            alt={banner.title}
                            className={cn(
                                "h-full w-full object-cover transition-transform duration-[10000ms] ease-linear",
                                index === currentSlide ? "scale-110" : "scale-100"
                            )}
                        />
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/60" />

                        {/* Dotted Pattern Overlay */}
                        <div
                            className="absolute inset-0 opacity-20 pointer-events-none"
                            style={{
                                backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
                                backgroundSize: '4px 4px'
                            }}
                        />
                    </div>

                    {/* Content */}
                    <div className="relative z-20 flex h-full flex-col items-center justify-center space-y-6 md:space-y-8 px-4 text-center">
                        {/* Title */}
                        <h1
                            className={cn(
                                "font-extrabold uppercase tracking-widest transition-all duration-1000 delay-300 transform",
                                index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
                                "text-4xl sm:text-6xl md:text-7xl lg:text-9xl drop-shadow-2xl"
                            )}
                            style={{ fontFamily: "var(--font-raleway), sans-serif" }} // Using CSS variable if available, else standard sans
                        >
                            {banner.title}
                        </h1>

                        {/* Decorator Line */}
                        <div
                            className={cn(
                                "h-1 bg-white shadow-lg transition-all duration-1000 delay-500",
                                index === currentSlide ? "w-24 md:w-48 opacity-100" : "w-0 opacity-0"
                            )}
                        />

                        {/* Description */}
                        <p
                            className={cn(
                                "max-w-2xl text-base sm:text-xl md:text-2xl font-light tracking-wide transition-all duration-1000 delay-700 transform text-gray-100",
                                index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                            )}
                        >
                            {banner.description}
                        </p>

                        {/* Buttons */}
                        <div
                            className={cn(
                                "flex flex-col sm:flex-row gap-4 mt-8 transition-all duration-1000 delay-1000 transform",
                                index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                            )}
                        >
                            {/* Primary Button */}
                            <Link
                                href={banner.linkUrl || "#"}
                                className="group/btn relative flex items-center justify-center gap-2 overflow-hidden rounded bg-white px-8 py-3.5 text-sm md:text-base font-bold uppercase tracking-widest text-black shadow-xl transition-all hover:bg-black hover:text-white ring-2 ring-white"
                            >
                                <span className="relative z-10">Registration</span>
                                <ArrowDown className="relative z-10 h-4 w-4 transition-transform group-hover/btn:translate-y-1" />
                            </Link>

                            {/* Secondary Button */}
                            <Link
                                href="/courses"
                                className="group/btn relative flex items-center justify-center gap-2 overflow-hidden rounded bg-white px-8 py-3.5 text-sm md:text-base font-bold uppercase tracking-widest text-black shadow-xl transition-all hover:bg-black hover:text-white ring-2 ring-white"
                            >
                                <span className="relative z-10">Find Courses</span>
                                <Search className="relative z-10 h-4 w-4 transition-transform group-hover/btn:scale-110" />
                            </Link>
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/20 bg-black/20 p-3 text-white transition-all hover:bg-black/60 hover:scale-110 backdrop-blur-sm hidden md:flex"
            >
                <ChevronLeft className="h-8 w-8" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/20 bg-black/20 p-3 text-white transition-all hover:bg-black/60 hover:scale-110 backdrop-blur-sm hidden md:flex"
            >
                <ChevronRight className="h-8 w-8" />
            </button>

            {/* Pagination Indicators */}
            <div className="absolute bottom-10 left-1/2 z-30 flex -translate-x-1/2 gap-3">
                {activeBanners.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            setCurrentSlide(i);
                            setIsAutoPlaying(false);
                        }}
                        className={cn(
                            "h-3 w-3 rounded-full transition-all duration-300 border border-white/60 shadow-sm",
                            i === currentSlide ? "bg-white scale-125 w-8" : "bg-transparent hover:bg-white/40"
                        )}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

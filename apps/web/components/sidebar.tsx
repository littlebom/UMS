"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAdmin } from "@/actions/admin-auth";
import {
    LayoutDashboard,
    BookOpen,
    Users,
    GraduationCap,
    Settings,
    LogOut,
    Menu,
    ChevronRight,
    FileText,
    Calendar,
    DollarSign,
    Megaphone,
    BarChart3,
    Image,
    Bot,
    HelpCircle,
    FolderOpen,
    Globe,
    Target,
    Tags,
    Building2,
    Building,
    BookMarked,
    CalendarDays,
    CalendarCheck,
    DoorOpen,
    ClipboardList,
    Wallet,
    UserPlus,
    Briefcase,
    Shield,
    UserCog,
} from "lucide-react";
import * as Icons from "lucide-react";
import { useState } from "react";

const navigation = [
    {
        category: "Overview",
        items: [
            {
                title: "Dashboard",
                href: "/admin",
                icon: LayoutDashboard,
            },
        ],
    },
    {
        category: "Academic",
        items: [
            {
                title: "Faculties",
                href: "/admin/academic/program/faculties",
                icon: Building2,
            },
            {
                title: "Departments",
                href: "/admin/academic/program/departments",
                icon: Building,
            },
            {
                title: "Programs",
                href: "/admin/academic/program/programs",
                icon: BookOpen,
            },
            {
                title: "Courses",
                href: "/admin/academic/program/courses",
                icon: BookMarked,
            },
            {
                title: "Student Groups",
                href: "/admin/academic/groups",
                icon: Users,
            },
        ],
    },
    {
        category: "Admissions",
        items: [
            {
                title: "Dashboard",
                href: "/admin/admissions",
                icon: LayoutDashboard,
            },
            {
                title: "Applications",
                href: "/admin/admissions/applications",
                icon: FileText,
            },
            {
                title: "Interviews",
                href: "/admin/admissions/interviews",
                icon: Calendar,
            },
            {
                title: "Admission Tracks",
                href: "/admin/admissions/tracks",
                icon: Target,
            },
            {
                title: "Track Types",
                href: "/admin/admissions/track-types",
                icon: Icons.Tags,
            },
        ],
    },
    {
        category: "Schedule Management",
        items: [
            {
                title: "Class Timetable",
                href: "/admin/schedule/timetable",
                icon: CalendarDays,
            },
            {
                title: "Teaching Schedule",
                href: "/admin/schedule/teaching",
                icon: CalendarCheck,
            },
            {
                title: "Room Allocation",
                href: "/admin/schedule/rooms",
                icon: DoorOpen,
            },
            {
                title: "Exam Schedule",
                href: "/admin/schedule/exams",
                icon: ClipboardList,
            },
        ],
    },
    {
        category: "Finance & Accounting",
        items: [
            {
                title: "Student Billing",
                href: "/admin/finance/billing",
                icon: Wallet,
            },
            {
                title: "Payments",
                href: "/admin/finance/payments",
                icon: DollarSign,
            },
            {
                title: "Scholarships",
                href: "/admin/finance/scholarships",
                icon: Icons.Award,
            },
            {
                title: "Financial Aid",
                href: "/admin/finance/aid",
                icon: Icons.HandHeart,
            },
            {
                title: "Fee Structure",
                href: "/admin/finance/fees",
                icon: Icons.Receipt,
            },
            {
                title: "Reports",
                href: "/admin/finance/reports",
                icon: BarChart3,
            },
        ],
    },
    {
        category: "User Management",
        items: [
            {
                title: "Applicants",
                href: "/admin/users/applicants",
                icon: UserPlus,
            },
            {
                title: "Students",
                href: "/admin/users/students",
                icon: GraduationCap,
            },
            {
                title: "Alumni",
                href: "/admin/users/alumni",
                icon: Icons.Award,
            },
            {
                title: "Instructors",
                href: "/admin/users/instructors",
                icon: BookOpen,
            },
            {
                title: "Staff",
                href: "/admin/users/staff",
                icon: Briefcase,
            },
            {
                title: "Administrators",
                href: "/admin/users/administrators",
                icon: Shield,
            },
            {
                title: "Roles & Permissions",
                href: "/admin/users/roles",
                icon: UserCog,
            },
        ],
    },
    {
        category: "Web Management",
        items: [
            {
                title: "Announcements",
                href: "/admin/announcements",
                icon: Megaphone,
            },
            {
                title: "Website Banners",
                href: "/admin/cms/banners",
                icon: Image,
            },
        ],
    },
    {
        category: "System",
        items: [
            {
                title: "Academic Terms",
                href: "/admin/academic",
                icon: Calendar,
            },
            {
                title: "Reports & Analytics",
                href: "/admin/analytics",
                icon: BarChart3,
            },
            {
                title: "AI Agent",
                href: "/admin/ai-agent",
                icon: Bot,
            },
            {
                title: "Help Center",
                href: "/admin/help-center",
                icon: HelpCircle,
            },
            {
                title: "File Management",
                href: "/admin/files",
                icon: FolderOpen,
            },
            {
                title: "Settings",
                href: "/admin/settings",
                icon: Settings,
            },
            {
                title: "Translations",
                href: "/admin/settings/translations",
                icon: Globe,
            },
        ],
    },
];

export function Sidebar() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                className="fixed left-4 top-20 z-40 rounded-lg bg-white p-2 shadow-md md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                <Menu className="h-6 w-6 text-gray-600" />
            </button>

            {/* Sidebar Container */}
            <aside
                className={`fixed inset-y-0 left-0 top-16 z-30 w-64 transform border-r border-gray-200 bg-white pb-10 transition-transform duration-200 ease-in-out md:translate-x-0 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="h-full overflow-y-auto py-6 pl-4 pr-2">
                    {navigation.map((section) => (
                        <div key={section.category} className="mb-8">
                            <h3 className="mb-3 px-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                                {section.category}
                            </h3>
                            <div className="space-y-1">
                                {section.items.map((item) => {
                                    const isActive =
                                        pathname === item.href ||
                                        (item.href !== "/admin" && pathname.startsWith(`${item.href}/`));
                                    // Special case for Dashboard
                                    const isExactActive =
                                        item.href === "/admin" ? pathname === "/admin" : isActive;

                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={`group flex items-center justify-between rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 ${isExactActive
                                                ? "bg-blue-50 text-blue-700"
                                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                                }`}
                                        >
                                            <div className="flex items-center">
                                                <item.icon
                                                    className={`mr-3 h-4 w-4 ${isExactActive
                                                        ? "text-blue-600"
                                                        : "text-gray-400 group-hover:text-gray-500"
                                                        }`}
                                                />
                                                {item.title}
                                            </div>
                                            {isExactActive && (
                                                <ChevronRight className="h-4 w-4 text-blue-500" />
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}

                    {/* Bottom Actions */}
                    <div className="mt-auto px-4 pt-6">
                        <form action={logoutAdmin} className="w-full">
                            <button
                                type="submit"
                                className="flex w-full items-center rounded-md px-4 py-2 text-sm font-medium text-red-600 transition-all hover:bg-red-50"
                            >
                                <LogOut className="mr-3 h-4 w-4" />
                                Sign Out
                            </button>
                        </form>
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 z-20 bg-gray-600 bg-opacity-50 transition-opacity md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </>
    );
}

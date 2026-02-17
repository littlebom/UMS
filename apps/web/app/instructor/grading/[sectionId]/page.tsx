import { getSectionStudents } from "@/actions/grading";
import { getInstructorSession } from "@/actions/instructor-auth";
import { redirect } from "next/navigation";
import { GradingForm } from "./grading-form";
import { prisma } from "@ums/lib";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default async function GradingPage({
    params,
}: {
    params: Promise<{ sectionId: string }>;
}) {
    const session = await getInstructorSession();
    if (!session) {
        redirect("/instructor/login");
    }

    const { sectionId } = await params;

    // Fetch section details for header
    const section = await prisma.classSection.findUnique({
        where: { id: sectionId },
        include: { course: true },
    });

    if (!section) {
        return <div>Section not found</div>;
    }

    // Fetch students with profiles
    // Note: getSectionStudents in actions/grading.ts needs to include studentProfile
    // Let's update the action or fetch here properly.
    // The action currently includes: student: { include: { user: { select: { email: true } } } }
    // We need studentProfile.

    // Let's use the action but we might need to update it if it doesn't return profile.
    // Checking actions/grading.ts... it fetches enrollment -> student -> user.
    // Student profile is on User model as `studentProfile`.
    // Wait, schema says: User -> StudentProfile (1-1).
    // Enrollment -> Student (User).
    // So Enrollment.student is User.
    // So we need Enrollment.student.studentProfile.

    // Let's update the action in next step if needed, but for now let's try to fetch here directly to be safe or rely on action.
    // Actually, let's fix the action first to ensure data consistency.

    const enrollments = await prisma.enrollment.findMany({
        where: { sectionId },
        include: {
            student: true,
        },
        orderBy: {
            student: { studentId: "asc" },
        },
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link
                    href="/instructor/dashboard"
                    className="rounded-full p-2 hover:bg-gray-100"
                >
                    <ChevronLeft className="h-5 w-5 text-gray-600" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Grading: {section.course.code}</h1>
                    <p className="text-sm text-gray-500">
                        {section.course.nameEn} - Section {section.sectionNumber}
                    </p>
                </div>
            </div>

            <GradingForm sectionId={sectionId} enrollments={enrollments} />
        </div>
    );
}

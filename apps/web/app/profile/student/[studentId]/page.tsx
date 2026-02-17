import { getPublicStudentProfile } from "@/actions/student-profile";
import { notFound } from "next/navigation";
import { QRCode } from "@/components/qr-code";
import { Mail, Award, BookOpen, Target, Code } from "lucide-react";
import Link from "next/link";
import { ProfileActions } from "./profile-actions";

export default async function StudentProfilePage({
    params,
}: {
    params: Promise<{ studentId: string }>;
}) {
    const { studentId } = await params;
    const student = await getPublicStudentProfile(studentId);

    if (!student) {
        notFound();
    }

    // Parse social links if available
    let socialLinks: Record<string, string> = {};
    if (student.socialLinks) {
        try {
            socialLinks = JSON.parse(student.socialLinks);
        } catch (e) {
            // Invalid JSON, ignore
        }
    }

    // Generate QR code value (URL to this profile)
    const profileUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/profile/student/${student.studentId}`;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-8">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">Student e-Profile</h1>
                            <p className="text-blue-200 mt-1">Digital Identity Card</p>
                        </div>
                        <ProfileActions
                            profileUrl={profileUrl}
                            studentName={`${student.firstName} ${student.lastName}`}
                        />
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Left Column: Profile Card */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-4 space-y-6">
                            {/* Main Profile Card */}
                            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
                                <div className="text-center">
                                    {/* Profile Image */}
                                    <div className="mx-auto mb-4 flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-4xl font-bold text-white shadow-xl">
                                        {student.profileImageUrl ? (
                                            <img
                                                src={student.profileImageUrl}
                                                alt={`${student.firstName} ${student.lastName}`}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <>
                                                {student.firstName[0]}
                                                {student.lastName[0]}
                                            </>
                                        )}
                                    </div>

                                    {/* Name */}
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {student.firstName} {student.lastName}
                                    </h2>

                                    {/* Student ID */}
                                    <p className="mt-1 text-lg font-mono font-semibold text-blue-600">
                                        {student.studentId}
                                    </p>

                                    {/* Status Badge */}
                                    <div className="mt-3">
                                        <span
                                            className={`inline-block rounded-full px-4 py-1 text-sm font-semibold ${student.status === "STUDYING"
                                                ? "bg-green-100 text-green-800"
                                                : student.status === "GRADUATED"
                                                    ? "bg-blue-100 text-blue-800"
                                                    : "bg-gray-100 text-gray-800"
                                                }`}
                                        >
                                            {student.status === "STUDYING" && "🎓 Currently Studying"}
                                            {student.status === "GRADUATED" && "🎉 Graduated"}
                                            {student.status === "ON_LEAVE" && "⏸️ On Leave"}
                                            {student.status === "WITHDRAWN" && "Withdrawn"}
                                        </span>
                                    </div>

                                    {/* GPAX (if allowed) */}
                                    {student.gpax !== null && (
                                        <div className="mt-4 rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50 p-4">
                                            <p className="text-sm font-medium text-gray-600">
                                                Grade Point Average
                                            </p>
                                            <p className="text-3xl font-bold text-orange-600">
                                                {student.gpax.toFixed(2)}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Contact Info */}
                                <div className="mt-6 space-y-3 border-t pt-4">
                                    <div className="flex items-center gap-3 text-sm">
                                        <Mail className="h-4 w-4 text-gray-400" />
                                        <span className="text-gray-700">{student.user.email}</span>
                                    </div>
                                </div>
                            </div>

                            {/* QR Code Card */}
                            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
                                <h3 className="mb-4 text-center text-sm font-semibold text-gray-700">
                                    Scan to Verify Identity
                                </h3>
                                <QRCode value={profileUrl} size={200} />
                                <p className="mt-3 text-center text-xs text-gray-500">
                                    Scan this QR code to verify student identity
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Academic Information */}
                        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
                            <div className="mb-4 flex items-center gap-2">
                                <BookOpen className="h-5 w-5 text-blue-600" />
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Academic Information
                                </h3>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500">
                                        Faculty
                                    </label>
                                    <p className="mt-1 font-medium text-gray-900">
                                        {student.program.faculty.nameEn}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {student.program.faculty.nameTh}
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500">
                                        Department
                                    </label>
                                    <p className="mt-1 font-medium text-gray-900">
                                        {student.program.department.nameEn}
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500">
                                        Program
                                    </label>
                                    <p className="mt-1 font-medium text-gray-900">
                                        {student.program.nameEn}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {student.program.nameTh}
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500">
                                        Degree Level
                                    </label>
                                    <p className="mt-1 font-medium text-gray-900">
                                        {student.program.degreeLevel}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Bio */}
                        {student.bio && (
                            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
                                <div className="mb-4 flex items-center gap-2">
                                    <Target className="h-5 w-5 text-blue-600" />
                                    <h3 className="text-lg font-semibold text-gray-900">About Me</h3>
                                </div>
                                <p className="text-gray-700 leading-relaxed">{student.bio}</p>
                            </div>
                        )}

                        {/* Interests */}
                        {student.interests && (
                            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
                                <div className="mb-4 flex items-center gap-2">
                                    <Award className="h-5 w-5 text-blue-600" />
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Interests
                                    </h3>
                                </div>
                                <p className="text-gray-700">{student.interests}</p>
                            </div>
                        )}

                        {/* Skills */}
                        {student.skills && (
                            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
                                <div className="mb-4 flex items-center gap-2">
                                    <Code className="h-5 w-5 text-blue-600" />
                                    <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {student.skills.split(",").map((skill, index) => (
                                        <span
                                            key={index}
                                            className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
                                        >
                                            {skill.trim()}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Social Links */}
                        {Object.keys(socialLinks).length > 0 && (
                            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
                                <h3 className="mb-4 text-lg font-semibold text-gray-900">
                                    Connect With Me
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {Object.entries(socialLinks).map(([platform, url]) => (
                                        <Link
                                            key={platform}
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition"
                                        >
                                            {platform.charAt(0).toUpperCase() + platform.slice(1)}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Current Enrollments */}
                        {student.enrollments.length > 0 && (
                            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
                                <h3 className="mb-4 text-lg font-semibold text-gray-900">
                                    Current Courses
                                </h3>
                                <div className="space-y-2">
                                    {student.enrollments.slice(0, 5).map((enrollment) => (
                                        <div
                                            key={enrollment.id}
                                            className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                                        >
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {enrollment.section.course.code}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {enrollment.section.course.nameEn}
                                                </p>
                                            </div>
                                            <span className="text-sm font-medium text-gray-500">
                                                {enrollment.section.course.credits} credits
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-12 border-t bg-gray-50 py-6">
                <div className="container mx-auto px-4 text-center text-sm text-gray-600">
                    <p>This is an official digital student profile</p>
                    <p className="mt-1">Generated on {new Date().toLocaleDateString()}</p>
                </div>
            </div>
        </div>
    );
}

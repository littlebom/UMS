import { getPublicInstructorProfile } from "@/actions/instructor-profile";
import { notFound } from "next/navigation";
import { Mail, Phone, MapPin, Clock, BookOpen, Award, FileText, GraduationCap, Lightbulb } from "lucide-react";

export default async function InstructorProfilePage({
    params,
}: {
    params: Promise<{ personnelId: string }>;
}) {
    const { personnelId } = await params;
    const instructor = await getPublicInstructorProfile(personnelId);

    if (!instructor) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-2xl font-bold">Instructor Profile</h1>
                    <p className="text-indigo-200 mt-1">Faculty Member</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Left Column: Profile Card */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
                            <div className="text-center">
                                {/* Profile Image */}
                                <div className="mx-auto mb-4 flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-4xl font-bold text-white shadow-xl">
                                    {instructor.profileImageUrl ? (
                                        <img
                                            src={instructor.profileImageUrl}
                                            alt={`${instructor.firstName} ${instructor.lastName}`}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <>
                                            {instructor.firstName[0]}
                                            {instructor.lastName[0]}
                                        </>
                                    )}
                                </div>

                                {/* Name with Title */}
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {instructor.title && `${instructor.title} `}
                                    {instructor.firstName} {instructor.lastName}
                                </h2>

                                {/* Position */}
                                {instructor.position && (
                                    <p className="mt-1 text-gray-600">{instructor.position}</p>
                                )}

                                {/* Faculty/Department */}
                                <div className="mt-3 text-sm text-gray-500">
                                    {instructor.faculty && (
                                        <p className="font-medium">{instructor.faculty.nameEn}</p>
                                    )}
                                    {instructor.department && (
                                        <p>{instructor.department.nameEn}</p>
                                    )}
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="mt-6 space-y-3 border-t pt-4">
                                <div className="flex items-center gap-3 text-sm">
                                    <Mail className="h-4 w-4 text-gray-400 flex-shrink-0" />
                                    <span className="text-gray-700 break-all">{instructor.user.email}</span>
                                </div>
                                {instructor.phone && (
                                    <div className="flex items-center gap-3 text-sm">
                                        <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
                                        <span className="text-gray-700">{instructor.phone}</span>
                                    </div>
                                )}
                                {instructor.officeLocation && (
                                    <div className="flex items-center gap-3 text-sm">
                                        <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                                        <span className="text-gray-700">{instructor.officeLocation}</span>
                                    </div>
                                )}
                                {instructor.officeHours && (
                                    <div className="flex items-start gap-3 text-sm">
                                        <Clock className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-medium text-gray-700">Office Hours</p>
                                            <p className="text-gray-600 whitespace-pre-line">{instructor.officeHours}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Bio */}
                        {instructor.bio && (
                            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
                                <h3 className="mb-4 text-lg font-semibold text-gray-900">About</h3>
                                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{instructor.bio}</p>
                            </div>
                        )}

                        {/* Education */}
                        {instructor.education && (
                            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
                                <div className="mb-4 flex items-center gap-2">
                                    <GraduationCap className="h-5 w-5 text-indigo-600" />
                                    <h3 className="text-lg font-semibold text-gray-900">Education</h3>
                                </div>
                                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{instructor.education}</p>
                            </div>
                        )}

                        {/* Expertise */}
                        {instructor.expertise && (
                            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
                                <div className="mb-4 flex items-center gap-2">
                                    <Lightbulb className="h-5 w-5 text-indigo-600" />
                                    <h3 className="text-lg font-semibold text-gray-900">Areas of Expertise</h3>
                                </div>
                                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{instructor.expertise}</p>
                            </div>
                        )}

                        {/* Publications */}
                        {instructor.publications && (
                            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
                                <div className="mb-4 flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-indigo-600" />
                                    <h3 className="text-lg font-semibold text-gray-900">Publications & Research</h3>
                                </div>
                                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{instructor.publications}</p>
                            </div>
                        )}

                        {/* Courses Teaching */}
                        {instructor.instructedSections.length > 0 && (
                            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
                                <div className="mb-4 flex items-center gap-2">
                                    <BookOpen className="h-5 w-5 text-indigo-600" />
                                    <h3 className="text-lg font-semibold text-gray-900">Courses Teaching</h3>
                                </div>
                                <div className="space-y-2">
                                    {instructor.instructedSections.slice(0, 8).map((section: any) => (
                                        <div
                                            key={section.id}
                                            className="flex items-center justify-between rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 p-3"
                                        >
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {section.course.code}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {section.course.nameEn}
                                                </p>
                                            </div>
                                            <span className="text-sm font-medium text-indigo-600">
                                                {section.course.credits} credits
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
                    <p>Faculty Member Profile</p>
                </div>
            </div>
        </div>
    );
}

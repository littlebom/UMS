import { getPublicStaffProfile } from "@/actions/staff-directory";
import { notFound } from "next/navigation";
import { Mail, Phone, MapPin, Briefcase, Building2 } from "lucide-react";

export default async function StaffProfilePage({
    params,
}: {
    params: Promise<{ personnelId: string }>;
}) {
    const { personnelId } = await params;
    const staff = await getPublicStaffProfile(personnelId);

    if (!staff) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-900 to-cyan-900 text-white py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-2xl font-bold">Staff Profile</h1>
                    <p className="text-blue-200 mt-1">Administrative Personnel</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Left Column: Profile Card */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
                            <div className="text-center">
                                {/* Profile Image */}
                                <div className="mx-auto mb-4 flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 text-4xl font-bold text-white shadow-xl">
                                    {staff.profileImageUrl ? (
                                        <img
                                            src={staff.profileImageUrl}
                                            alt={`${staff.firstName} ${staff.lastName}`}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <>
                                            {staff.firstName[0]}
                                            {staff.lastName[0]}
                                        </>
                                    )}
                                </div>

                                {/* Name with Title */}
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {staff.title && `${staff.title} `}
                                    {staff.firstName} {staff.lastName}
                                </h2>

                                {/* Position */}
                                {staff.position && (
                                    <p className="mt-1 text-gray-600">{staff.position}</p>
                                )}

                                {/* Department/Faculty */}
                                <div className="mt-3 text-sm text-gray-500">
                                    {staff.department && (
                                        <p className="font-medium">{staff.department.nameEn}</p>
                                    )}
                                    {staff.faculty && (
                                        <p>{staff.faculty.nameEn}</p>
                                    )}
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="mt-6 space-y-3 border-t pt-4">
                                <div className="flex items-center gap-3 text-sm">
                                    <Mail className="h-4 w-4 text-gray-400 flex-shrink-0" />
                                    <span className="text-gray-700 break-all">{staff.user.email}</span>
                                </div>
                                {staff.phone && (
                                    <div className="flex items-center gap-3 text-sm">
                                        <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
                                        <span className="text-gray-700">{staff.phone}</span>
                                    </div>
                                )}
                                {staff.officeLocation && (
                                    <div className="flex items-center gap-3 text-sm">
                                        <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                                        <span className="text-gray-700">{staff.officeLocation}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Bio */}
                        {staff.bio && (
                            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
                                <h3 className="mb-4 text-lg font-semibold text-gray-900">About</h3>
                                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{staff.bio}</p>
                            </div>
                        )}

                        {/* Responsibilities */}
                        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
                            <div className="mb-4 flex items-center gap-2">
                                <Briefcase className="h-5 w-5 text-blue-600" />
                                <h3 className="text-lg font-semibold text-gray-900">Role & Responsibilities</h3>
                            </div>
                            <div className="space-y-3">
                                {staff.position && (
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Position</p>
                                        <p className="text-gray-900">{staff.position}</p>
                                    </div>
                                )}
                                {staff.department && (
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Department</p>
                                        <p className="text-gray-900">{staff.department.nameEn}</p>
                                        <p className="text-sm text-gray-600">{staff.department.nameTh}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Office Hours */}
                        {staff.officeHours && (
                            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
                                <div className="mb-4 flex items-center gap-2">
                                    <Building2 className="h-5 w-5 text-blue-600" />
                                    <h3 className="text-lg font-semibold text-gray-900">Office Hours</h3>
                                </div>
                                <p className="text-gray-700 whitespace-pre-line">{staff.officeHours}</p>
                            </div>
                        )}

                        {/* Contact Card */}
                        <div className="rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
                            <h3 className="mb-3 text-lg font-semibold text-gray-900">Get in Touch</h3>
                            <p className="text-sm text-gray-700">
                                For inquiries related to {staff.department?.nameEn || "administrative services"},
                                please feel free to contact via email or visit during office hours.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-12 border-t bg-gray-50 py-6">
                <div className="container mx-auto px-4 text-center text-sm text-gray-600">
                    <p>Administrative Staff Profile</p>
                </div>
            </div>
        </div>
    );
}

import Link from "next/link";
import { getStudentByStudentId } from "@/actions/student";
import { notFound } from "next/navigation";
import { User, Mail, Phone, MapPin, Calendar, GraduationCap, BookOpen } from "lucide-react";
import StudentTypeBadge from "@/components/student-type-badge";
import { type StudentType } from "@/lib/student-type";

export default async function StudentDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const student = await getStudentByStudentId(id);

    if (!student) {
        notFound();
    }

    return (
        <div className="container mx-auto py-10">
            <div className="mb-8">
                <Link
                    href="/admin/students"
                    className="text-sm text-gray-600 hover:text-gray-900"
                >
                    ← Back to Roster
                </Link>
                <h1 className="mt-2 text-3xl font-bold">Student Profile</h1>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Left Column: Personal Info */}
                <div className="space-y-6 md:col-span-1">
                    {/* Profile Card */}
                    <div className="rounded-lg border border-gray-200 bg-white p-6">
                        <div className="mb-6 text-center">
                            <div className="mx-auto mb-4 flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-gray-200">
                                {student.profileImageUrl ? (
                                    <img src={student.profileImageUrl} alt="Profile" className="h-full w-full object-cover" />
                                ) : (
                                    <User className="h-16 w-16 text-gray-400" />
                                )}
                            </div>
                            <h2 className="text-xl font-bold">
                                {student.title} {student.firstName} {student.lastName}
                            </h2>
                            {student.firstNameTh && student.lastNameTh && (
                                <p className="text-gray-600">{student.firstNameTh} {student.lastNameTh}</p>
                            )}
                            <p className="text-gray-500">{student.studentId}</p>
                            <div className="mt-2 flex flex-wrap justify-center gap-2">
                                <StudentTypeBadge type={student.studentType as StudentType} showLabel="both" />
                                <span
                                    className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${student.status === "STUDYING"
                                        ? "bg-green-100 text-green-800"
                                        : student.status === "GRADUATED"
                                            ? "bg-blue-100 text-blue-800"
                                            : "bg-gray-100 text-gray-800"
                                        }`}
                                >
                                    {student.status}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-4 border-t pt-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-500">
                                    <Mail className="inline h-3 w-3 mr-1" />
                                    Email
                                </label>
                                <p className="text-sm">{student.user.email}</p>
                            </div>

                            {student.phone && (
                                <div>
                                    <label className="block text-xs font-medium text-gray-500">
                                        <Phone className="inline h-3 w-3 mr-1" />
                                        Phone
                                    </label>
                                    <p className="text-sm">{student.phone}</p>
                                </div>
                            )}

                            <div>
                                <label className="block text-xs font-medium text-gray-500">
                                    <Calendar className="inline h-3 w-3 mr-1" />
                                    Birth Date
                                </label>
                                <p className="text-sm">
                                    {new Date(student.birthDate).toLocaleDateString()}
                                </p>
                            </div>

                            {student.gender && (
                                <div>
                                    <label className="block text-xs font-medium text-gray-500">
                                        Gender
                                    </label>
                                    <p className="text-sm">{student.gender}</p>
                                </div>
                            )}

                            {student.nationality && (
                                <div>
                                    <label className="block text-xs font-medium text-gray-500">
                                        Nationality
                                    </label>
                                    <p className="text-sm">{student.nationality}</p>
                                </div>
                            )}

                            {student.citizenId && (
                                <div>
                                    <label className="block text-xs font-medium text-gray-500">
                                        Citizen ID / Passport
                                    </label>
                                    <p className="text-sm font-mono">{student.citizenId}</p>
                                </div>
                            )}

                            <div>
                                <label className="block text-xs font-medium text-gray-500">
                                    GPAX
                                </label>
                                <p className="text-2xl font-bold text-blue-600">
                                    {student.gpax.toFixed(2)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Address Card */}
                    <div className="rounded-lg border border-gray-200 bg-white p-6">
                        <h3 className="mb-4 flex items-center text-lg font-semibold">
                            <MapPin className="mr-2 h-5 w-5" />
                            Address
                        </h3>
                        {(student.address || student.subDistrict || student.district || student.province || student.zipCode) ? (
                            <div className="space-y-2 text-sm text-gray-700">
                                {student.address && <p>{student.address}</p>}
                                {student.subDistrict && <p>Sub-district: {student.subDistrict}</p>}
                                {student.district && <p>District: {student.district}</p>}
                                {student.province && <p>Province: {student.province}</p>}
                                {student.zipCode && <p>Zip Code: {student.zipCode}</p>}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500 italic">No address information available</p>
                        )}
                    </div>
                </div>

                {/* Right Column: Academic Info */}
                <div className="space-y-6 md:col-span-2">
                    {/* Academic Information */}
                    <div className="rounded-lg border border-gray-200 bg-white p-6">
                        <h3 className="mb-4 flex items-center text-lg font-semibold">
                            <GraduationCap className="mr-2 h-5 w-5" />
                            Academic Information
                        </h3>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <label className="block text-xs font-medium text-gray-500">
                                    Program
                                </label>
                                <p className="font-medium">{student.program.nameEn}</p>
                                <p className="text-sm text-gray-500">
                                    {student.program.nameTh}
                                </p>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500">
                                    Faculty
                                </label>
                                <p className="font-medium">
                                    {student.program.faculty.nameEn}
                                </p>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500">
                                    Department
                                </label>
                                <p className="font-medium">
                                    {student.program.department.nameEn}
                                </p>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500">
                                    Degree Level
                                </label>
                                <p className="font-medium">{student.program.degreeLevel}</p>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500">
                                    Student Type
                                </label>
                                <div className="mt-1">
                                    <StudentTypeBadge type={student.studentType as StudentType} showLabel="both" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Current Enrollments */}
                    <div className="rounded-lg border border-gray-200 bg-white p-6">
                        <h3 className="mb-4 flex items-center text-lg font-semibold">
                            <BookOpen className="mr-2 h-5 w-5" />
                            Current Enrollments
                        </h3>
                        {student.enrollments.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b text-left text-xs font-medium text-gray-500">
                                            <th className="pb-2">Course Code</th>
                                            <th className="pb-2">Course Name</th>
                                            <th className="pb-2">Section</th>
                                            <th className="pb-2">Credits</th>
                                            <th className="pb-2">Grade</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {student.enrollments.map((enrollment) => (
                                            <tr key={enrollment.id} className="border-b last:border-0">
                                                <td className="py-3 text-sm font-medium">
                                                    {enrollment.section.course.code}
                                                </td>
                                                <td className="py-3 text-sm">
                                                    {enrollment.section.course.nameEn}
                                                </td>
                                                <td className="py-3 text-sm">
                                                    {enrollment.section.sectionNumber}
                                                </td>
                                                <td className="py-3 text-sm">
                                                    {enrollment.section.course.credits}
                                                </td>
                                                <td className="py-3 text-sm font-bold">
                                                    {enrollment.grade || "-"}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">
                                No active enrollments found.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

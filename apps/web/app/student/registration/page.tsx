import { getAvailableSections, getStudentEnrollments } from "@/actions/enrollment";
import { getStudentSession } from "@/actions/student-auth";
import { redirect } from "next/navigation";
import { EnrollButton } from "./enroll-button";

export default async function RegistrationPage() {
    const session = await getStudentSession();
    if (!session) {
        redirect("/student/login");
    }

    const sections = await getAvailableSections();
    const myEnrollments = await getStudentEnrollments();
    const enrolledSectionIds = new Set(myEnrollments.map((e) => e.sectionId));

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold text-gray-900">Course Registration</h1>
                <p className="text-gray-500">Select courses to enroll for the current term.</p>
            </header>

            <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                <div className="overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Course</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Section</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Instructor</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Schedule</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Seats</th>
                                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {sections.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                                        No courses available for registration at this time.
                                    </td>
                                </tr>
                            ) : (
                                sections.map((section) => {
                                    const isEnrolled = enrolledSectionIds.has(section.id);
                                    const isFull = section._count.enrollments >= section.capacity;

                                    return (
                                        <tr key={section.id}>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {section.course.code}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {section.course.nameEn}
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                {section.sectionNumber}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                {section.instructor
                                                    ? `${section.instructor.firstName} ${section.instructor.lastName}`
                                                    : "TBA"}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                {section.schedules.map((s) => (
                                                    <div key={s.id}>
                                                        {s.day} {s.startTime}-{s.endTime}
                                                    </div>
                                                ))}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                {section._count.enrollments} / {section.capacity}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                                {isEnrolled ? (
                                                    <span className="text-green-600">Enrolled</span>
                                                ) : isFull ? (
                                                    <span className="text-red-600">Full</span>
                                                ) : (
                                                    <EnrollButton sectionId={section.id} />
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

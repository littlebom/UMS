import { getInstructorSections } from "@/actions/grading";
import { getInstructorSession } from "@/actions/instructor-auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function InstructorDashboard() {
    const session = await getInstructorSession();
    if (!session) {
        redirect("/instructor/login");
    }

    const sections = await getInstructorSections();

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold text-gray-900">Instructor Dashboard</h1>
                <p className="text-gray-500">Welcome, {session.firstName} {session.lastName}</p>
            </header>

            <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                <div className="border-b border-gray-200 px-6 py-4">
                    <h2 className="text-lg font-medium text-gray-900">My Classes</h2>
                </div>
                <div className="p-6">
                    {sections.length === 0 ? (
                        <div className="text-center text-gray-500">
                            <p>You are not teaching any classes this term.</p>
                        </div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {sections.map((section) => (
                                <div key={section.id} className="rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                                    <div className="mb-4">
                                        <h3 className="text-lg font-bold text-gray-900">{section.course.code}</h3>
                                        <p className="text-sm text-gray-500">{section.course.nameEn}</p>
                                    </div>

                                    <div className="mb-4 space-y-2 text-sm text-gray-600">
                                        <div className="flex justify-between">
                                            <span>Section:</span>
                                            <span className="font-medium">{section.sectionNumber}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Term:</span>
                                            <span className="font-medium">{section.term.year}/{section.term.semester}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Students:</span>
                                            <span className="font-medium">{section._count.enrollments} / {section.capacity}</span>
                                        </div>
                                    </div>

                                    <Link
                                        href={`/instructor/grading/${section.id}`}
                                        className="block w-full rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-700"
                                    >
                                        Manage Grades
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

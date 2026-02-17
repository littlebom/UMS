import { getStudentEnrollments } from "@/actions/enrollment";
import { getStudentSession } from "@/actions/student-auth";
import { redirect } from "next/navigation";

// Grade to Point mapping
const GRADE_POINTS: Record<string, number> = {
    "A": 4.0,
    "B+": 3.5,
    "B": 3.0,
    "C+": 2.5,
    "C": 2.0,
    "D+": 1.5,
    "D": 1.0,
    "F": 0.0,
};

export default async function StudentTranscriptPage() {
    const session = await getStudentSession();
    if (!session) {
        redirect("/student/login");
    }

    const enrollments = await getStudentEnrollments();

    // Filter only graded courses
    const gradedEnrollments = enrollments.filter(e => e.grade && GRADE_POINTS[e.grade] !== undefined);

    // Calculate GPA
    let totalPoints = 0;
    let totalCredits = 0;

    gradedEnrollments.forEach(e => {
        const credits = e.section.course.credits;
        const points = GRADE_POINTS[e.grade!] || 0;
        totalPoints += points * credits;
        totalCredits += credits;
    });

    const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold text-gray-900">Academic Transcript</h1>
                <p className="text-gray-500">Your academic performance record.</p>
            </header>

            {/* GPA Summary */}
            <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500">Cumulative GPA</h3>
                    <p className="mt-2 text-3xl font-bold text-blue-600">{gpa}</p>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500">Total Credits Earned</h3>
                    <p className="mt-2 text-3xl font-bold text-gray-900">{totalCredits}</p>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500">Courses Completed</h3>
                    <p className="mt-2 text-3xl font-bold text-gray-900">{gradedEnrollments.length}</p>
                </div>
            </div>

            {/* Course List */}
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                <div className="border-b border-gray-200 px-6 py-4">
                    <h2 className="text-lg font-medium text-gray-900">Course History</h2>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Term</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Course Code</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Course Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Credits</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Grade</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {gradedEnrollments.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                                    No graded courses found.
                                </td>
                            </tr>
                        ) : (
                            gradedEnrollments.map((enrollment) => (
                                <tr key={enrollment.id}>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                        {enrollment.section.term.year}/{enrollment.section.term.semester}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                        {enrollment.section.course.code}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                        {enrollment.section.course.nameEn}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                        {enrollment.section.course.credits}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-bold text-blue-600">
                                        {enrollment.grade}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

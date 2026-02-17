import { getStudentCardData } from "@/actions/student-card";
import { notFound } from "next/navigation";
import StudentCard from "@/app/admin/students/[id]/card/student-card";

export default async function StudentCardPage({
    searchParams,
}: {
    searchParams: Promise<{ id?: string }>;
}) {
    const { id } = await searchParams;

    if (!id) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="rounded-lg bg-white p-8 shadow">
                    <h1 className="mb-4 text-xl font-bold text-red-600">Student ID Required</h1>
                    <p className="text-gray-600">Please provide a student ID in the URL.</p>
                    <p className="mt-2 text-sm text-gray-500">
                        Example: /student/card?id=25010001
                    </p>
                </div>
            </div>
        );
    }

    const student = await getStudentCardData(id);

    if (!student) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto max-w-4xl">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Student ID Card
                    </h1>
                    <p className="text-sm text-gray-500">
                        {student.firstName} {student.lastName} ({student.studentId})
                    </p>
                </div>

                {/* Instructions */}
                <div className="mb-6 rounded-lg bg-blue-50 p-4 print:hidden">
                    <p className="text-sm text-blue-800">
                        <strong>Printing Instructions:</strong> Use Ctrl+P (Cmd+P on Mac) to print.
                        Make sure to select "Print backgrounds" in your browser settings for best results.
                    </p>
                </div>

                {/* Student Card */}
                <StudentCard student={student} />
            </div>
        </div>
    );
}

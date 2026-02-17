import { getStudentCardData } from "@/actions/student-card";
import { notFound } from "next/navigation";
import StudentCard from "../student-card";

export default async function StudentCardPreviewPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
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
                        Student ID Card Preview
                    </h1>
                    <p className="text-sm text-gray-500">
                        {student.firstName} {student.lastName} ({student.studentId})
                    </p>
                </div>

                {/* Instructions */}
                <div className="mb-6 rounded-lg bg-blue-50 p-4 print:hidden">
                    <p className="text-sm text-blue-800">
                        <strong>Printing Instructions:</strong> Click "Print Card" button or use Ctrl+P (Cmd+P on Mac).
                        Make sure to select "Print backgrounds" in your browser settings for best results.
                    </p>
                </div>

                {/* Student Card */}
                <StudentCard student={student} />
            </div>
        </div>
    );
}

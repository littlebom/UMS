import { getStudentCardData } from "@/actions/student-card";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import StudentCard from "./student-card";
import PrintButton from "./print-button";
import PhotoUpload from "./photo-upload";

export default async function StudentCardPage({
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
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/admin/students"
                            className="rounded-full p-2 hover:bg-gray-200"
                        >
                            <ChevronLeft className="h-5 w-5 text-gray-600" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Student ID Card
                            </h1>
                            <p className="text-sm text-gray-500">
                                {student.firstName} {student.lastName} ({student.studentId})
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <PhotoUpload
                            studentId={student.studentId}
                            currentPhotoUrl={student.profileImageUrl}
                        />
                        <PrintButton />
                    </div>
                </div>

                {/* Instructions */}
                <div className="mb-6 rounded-lg bg-blue-50 p-4 print:hidden">
                    <p className="text-sm text-blue-800">
                        <strong>Printing Instructions:</strong> Click "Print Card" button or use Ctrl+P (Cmd+P on Mac).
                        Make sure to select "Print backgrounds" in your browser's print settings for best results.
                    </p>
                </div>

                {/* Student Card */}
                <StudentCard student={student} />
            </div>
        </div>
    );
}

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { getPrograms } from "@/actions/program";
import StudentForm from "./student-form";

export default async function CreateStudentPage() {
    const programs = await getPrograms();

    return (
        <div className="flex h-full flex-col">
            {/* Header */}
            <div className="border-b bg-white p-6">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/users/students"
                        className="rounded-full p-2 hover:bg-gray-100"
                    >
                        <ChevronLeft className="h-5 w-5 text-gray-600" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Add New Student
                        </h1>
                        <p className="text-sm text-gray-500">
                            Register a new student account.
                        </p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-8">
                <div className="mx-auto max-w-2xl">
                    <div className="rounded-lg border bg-white p-6 shadow-sm">
                        <StudentForm programs={programs} />
                    </div>
                </div>
            </div>
        </div>
    );
}

import { getStudentGroupById } from "@/actions/student-group";
import { getPrograms } from "@/actions/program";
import { getInstructors } from "@/actions/user-instructors";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { EditGroupForm } from "./edit-group-form";
import { notFound } from "next/navigation";

interface EditStudentGroupPageProps {
    params: Promise<{ id: string }>;
}

export default async function EditStudentGroupPage({ params }: EditStudentGroupPageProps) {
    const { id } = await params;

    const [groupResult, programs, instructorsResult] = await Promise.all([
        getStudentGroupById(id),
        getPrograms(),
        getInstructors(),
    ]);

    if (!groupResult.success || !groupResult.group) {
        notFound();
    }

    const group = groupResult.group;
    const instructors = instructorsResult.success ? instructorsResult.instructors : [];

    // Generate year options (current year - 10 to current year + 1)
    const currentYear = new Date().getFullYear();
    const yearOptions = Array.from({ length: 12 }, (_, i) => currentYear - 10 + i).reverse();

    return (
        <div className="container mx-auto max-w-2xl py-10">
            <div className="mb-6">
                <Link
                    href="/admin/academic/groups"
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Groups
                </Link>
            </div>

            <div className="rounded-lg border bg-white p-6 shadow-sm">
                <h1 className="mb-6 text-2xl font-bold">Edit Student Group</h1>
                <EditGroupForm
                    group={group}
                    programs={programs}
                    instructors={instructors}
                    yearOptions={yearOptions}
                />
            </div>
        </div>
    );
}

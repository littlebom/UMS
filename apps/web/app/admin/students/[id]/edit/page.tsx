import { notFound, redirect } from "next/navigation";
import { getStudentByStudentId, updateStudent } from "@/actions/student";
import { getPrograms } from "@/actions/program";
import EditStudentForm from "./edit-student-form";

interface EditStudentPageProps {
    params: {
        id: string;
    };
}

export default async function EditStudentPage({ params }: EditStudentPageProps) {
    const student = await getStudentByStudentId(params.id);

    if (!student) {
        notFound();
    }

    const programs = await getPrograms();

    return (
        <div className="container mx-auto py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Edit Student</h1>
                <p className="mt-2 text-gray-600">
                    Update information for {student.firstName} {student.lastName} ({student.studentId})
                </p>
            </div>

            <EditStudentForm student={student} programs={programs} />
        </div>
    );
}

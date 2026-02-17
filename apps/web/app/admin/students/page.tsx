import Link from "next/link";
import { getStudents } from "@/actions/student";
import StudentActionsMenu from "./student-actions-menu";
import { getStudentTypeColor, getStudentTypeLabel, type StudentType } from "@/lib/student-type";

export default async function StudentRosterPage() {
    const students = await getStudents();

    return (
        <div className="container mx-auto py-10">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Student Roster</h1>
                    <p className="mt-2 text-gray-600">
                        Total: {students.length} students
                    </p>
                </div>
                <Link
                    href="/admin/students/create"
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                    + Add Student
                </Link>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white">
                <div className="overflow-visible">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b bg-gray-50 text-left text-sm text-gray-600">
                                <th className="p-4">Student ID</th>
                                <th className="p-4">Name</th>
                                <th className="p-4">Program</th>
                                <th className="p-4">Faculty</th>
                                <th className="p-4">Student Type</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">GPAX</th>
                                <th className="p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student.id} className="border-b hover:bg-gray-50">
                                    <td className="p-4 font-mono text-sm">{student.studentId}</td>
                                    <td className="p-4">
                                        <div className="font-medium">
                                            {student.firstName} {student.lastName}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {student.user.email}
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm text-gray-600">
                                        {student.program.nameEn}
                                    </td>
                                    <td className="p-4 text-sm text-gray-600">
                                        {student.program.faculty.nameEn}
                                    </td>
                                    <td className="p-4">
                                        <span
                                            className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${getStudentTypeColor(student.studentType as StudentType)}`}
                                        >
                                            {getStudentTypeLabel(student.studentType as StudentType)}
                                        </span>
                                    </td>
                                    <td className="p-4">
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
                                    </td>
                                    <td className="p-4 text-sm font-medium">
                                        {student.gpax.toFixed(2)}
                                    </td>
                                    <td className="p-4">
                                        <StudentActionsMenu
                                            studentId={student.studentId}
                                            studentName={`${student.firstName} ${student.lastName}`}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {students.length === 0 && (
                        <div className="py-12 text-center text-gray-500">
                            <p className="mb-4 text-lg">No students found</p>
                            <Link
                                href="/admin/students/create"
                                className="text-blue-600 hover:underline"
                            >
                                Add your first student
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

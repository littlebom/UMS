import Link from "next/link";
import { getPersonnel } from "@/actions/personnel";

import StaffActionsMenu from "../staff/staff-actions-menu";

export default async function InstructorsPage() {
    const allPersonnel = await getPersonnel();
    const instructors = allPersonnel.filter((p) => p.user.role === "INSTRUCTOR");

    return (
        <div className="container mx-auto py-10">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Instructors</h1>
                    <p className="mt-2 text-gray-600">
                        Total: {instructors.length} instructors
                    </p>
                </div>
                <Link
                    href="/admin/personnel/create"
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                    + Add Instructor
                </Link>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white">
                <div className="overflow-visible">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b bg-gray-50 text-left text-sm text-gray-600">
                                <th className="p-4">Name</th>
                                <th className="p-4">Position</th>
                                <th className="p-4">Faculty</th>
                                <th className="p-4">Department</th>
                                <th className="p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {instructors.map((person) => (
                                <tr key={person.id} className="border-b hover:bg-gray-50">
                                    <td className="p-4">
                                        <div className="font-medium">
                                            {person.title} {person.firstName} {person.lastName}
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm text-gray-600">
                                        {person.position || "-"}
                                    </td>
                                    <td className="p-4 text-sm text-gray-600">
                                        {person.faculty?.nameEn || "-"}
                                    </td>
                                    <td className="p-4 text-sm text-gray-600">
                                        {person.department?.nameEn || "-"}
                                    </td>
                                    <td className="p-4">
                                        <StaffActionsMenu
                                            personnelId={person.id}
                                            fullName={`${person.firstName} ${person.lastName}`}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {instructors.length === 0 && (
                        <div className="py-12 text-center text-gray-500">
                            <p className="mb-4 text-lg">No instructors found</p>
                            <Link
                                href="/admin/personnel/create"
                                className="text-blue-600 hover:underline"
                            >
                                Add your first instructor
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

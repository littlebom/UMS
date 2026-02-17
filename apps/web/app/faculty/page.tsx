import { getAllInstructors } from "@/actions/instructor-profile";
import { prisma } from "@ums/lib";
import { FacultyDirectoryClient } from "./faculty-directory-client";

export default async function FacultyDirectoryPage() {
    const instructors = await getAllInstructors();
    const faculties = await prisma.faculty.findMany({
        orderBy: { nameEn: "asc" },
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold">Our Faculty</h1>
                    <p className="mt-2 text-indigo-200">
                        Meet our distinguished instructors and researchers
                    </p>
                    <div className="mt-4 flex items-center gap-6 text-sm">
                        <div>
                            <span className="text-3xl font-bold">{instructors.length}</span>
                            <p className="text-indigo-200">Instructors</p>
                        </div>
                        <div>
                            <span className="text-3xl font-bold">{faculties.length}</span>
                            <p className="text-indigo-200">Faculties</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <FacultyDirectoryClient instructors={instructors} faculties={faculties} />
            </div>
        </div>
    );
}

import { getPrograms } from "@/actions/program";
import Link from "next/link";
import { BookOpen, GraduationCap, ArrowRight } from "lucide-react";

export default async function ProgramsPage() {
    const programs = await getPrograms();

    // Group programs by Degree Level
    const groupedPrograms = programs.reduce((acc, program) => {
        const level = program.degreeLevel;
        if (!acc[level]) {
            acc[level] = [];
        }
        acc[level].push(program);
        return acc;
    }, {} as Record<string, typeof programs>);

    const degreeLevels = ["BACHELOR", "MASTER", "DOCTORATE"];

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-gray-900">Academic Programs</h1>
                    <p className="mt-4 text-lg text-gray-600">
                        Explore our wide range of programs designed to prepare you for success.
                    </p>
                </div>

                {programs.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-xl text-gray-500">No programs are currently available.</p>
                    </div>
                ) : (
                    <div className="space-y-16">
                        {degreeLevels.map((level) => {
                            const levelPrograms = groupedPrograms[level];
                            if (!levelPrograms || levelPrograms.length === 0) return null;

                            return (
                                <div key={level}>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="bg-blue-600 p-2 rounded-lg">
                                            <GraduationCap className="h-6 w-6 text-white" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-900 capitalize">
                                            {level.toLowerCase()} Degrees
                                        </h2>
                                    </div>

                                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                        {levelPrograms.map((program) => (
                                            <div
                                                key={program.id}
                                                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col"
                                            >
                                                <div className="p-6 flex-1">
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 mb-3">
                                                                {program.faculty.nameEn}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                                        {program.nameEn}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 mb-4">
                                                        {program.nameTh}
                                                    </p>
                                                    <p className="text-gray-600 text-sm line-clamp-3">
                                                        {program.description || "No description available."}
                                                    </p>
                                                </div>
                                                <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
                                                    <Link
                                                        href={`/admissions/apply?programId=${program.id}`}
                                                        className="flex items-center justify-center w-full rounded-lg bg-white px-4 py-2 text-sm font-semibold text-blue-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                    >
                                                        Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

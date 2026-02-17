import Link from "next/link";
import { PublicNavbar } from "@/components/public-navbar";
import { getPrograms, getFaculties } from "@/actions/curriculum";
import { CurriculumFilters } from "@/components/curriculum-filters";
import { BookOpen, GraduationCap, Building2 } from "lucide-react";

export default async function CurriculumPage({
    searchParams,
}: {
    searchParams: { facultyId?: string; degreeLevel?: string };
}) {
    const [allPrograms, faculties] = await Promise.all([
        getPrograms(),
        getFaculties(),
    ]);

    // Filter programs by faculty and degree level if provided
    let programs = allPrograms;

    if (searchParams.facultyId) {
        programs = programs.filter((p) => p.facultyId === searchParams.facultyId);
    }

    if (searchParams.degreeLevel) {
        programs = programs.filter((p) => p.degreeLevel === searchParams.degreeLevel);
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <PublicNavbar />

            {/* Hero Section */}
            <div className="bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                            Our Curriculum
                        </h1>
                        <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-500">
                            Explore our diverse range of academic programs designed to prepare you for the future.
                        </p>
                    </div>
                </div>
            </div>

            {/* Programs List */}
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                {/* Filters */}
                <CurriculumFilters faculties={faculties} />

                {/* Programs Grid */}
                {programs.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {programs.map((program) => (
                            <ProgramCard key={program.id} program={program} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No programs found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

function ProgramCard({ program }: { program: any }) {
    return (
        <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md border border-gray-200">
            <div className="p-6 flex-1">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <Building2 className="w-4 h-4" />
                    <span>{program.faculty.nameEn}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {program.nameEn}
                </h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                    {program.description || "No description available."}
                </p>
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                        {program.degreeLevel}
                    </span>
                </div>
            </div>
            <div className="bg-gray-50 px-6 py-4 flex gap-3">
                <Link
                    href={`/curriculum/${program.id}`}
                    className="flex-1 flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                    View Details
                </Link>
                <Link
                    href={`/admissions/register?program=${program.id}`}
                    className="flex-1 flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                    Apply Now
                </Link>
            </div>
        </div>
    );
}

// Icon component for Doctorate (since I forgot to import it in the main block)
import { Award } from "lucide-react";

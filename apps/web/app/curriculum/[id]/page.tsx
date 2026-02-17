import { getProgramById } from "@/actions/program";
import { PublicNavbar } from "@/components/public-navbar";
import { Button } from "@ums/ui";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    Building2,
    GraduationCap,
    BookOpen,
    ArrowRight,
    Clock,
    Award,
    CheckCircle2,
    Briefcase,
    FileText,
    ChevronRight,
    Home
} from "lucide-react";

export default async function ProgramDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const program = await getProgramById(id);

    if (!program) {
        notFound();
    }

    const degreeLevelMap: Record<string, { en: string; th: string; color: string }> = {
        BACHELOR: { en: "Bachelor's Degree", th: "ปริญญาตรี", color: "bg-emerald-500" },
        MASTER: { en: "Master's Degree", th: "ปริญญาโท", color: "bg-purple-500" },
        DOCTORAL: { en: "Doctoral Degree", th: "ปริญญาเอก", color: "bg-rose-500" },
        DOCTORATE: { en: "Doctorate Degree", th: "ปริญญาเอก", color: "bg-rose-500" },
    };

    const degreeInfo = degreeLevelMap[program.degreeLevel] || {
        en: program.degreeLevel,
        th: program.degreeLevel,
        color: "bg-blue-500"
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <PublicNavbar />

            {/* Hero Section */}
            <div className="relative bg-blue-900 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                    </svg>
                </div>
                <div className="relative container mx-auto px-4 py-16 sm:py-24 max-w-7xl">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-blue-200 mb-8">
                        <Link href="/" className="hover:text-white flex items-center gap-1">
                            <Home className="w-4 h-4" />
                            Home
                        </Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link href="/curriculum" className="hover:text-white">Curriculum</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white font-medium truncate max-w-[200px]">{program.nameEn}</span>
                    </nav>

                    <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
                        <div className="space-y-4 max-w-3xl">
                            <div className="flex items-center gap-3">
                                <span className={`${degreeInfo.color} px-3 py-1 rounded-[.2rem] text-xs font-bold uppercase tracking-wider shadow-sm`}>
                                    {degreeInfo.en}
                                </span>
                                <span className="bg-white/10 px-3 py-1 rounded-[.2rem] text-xs font-medium backdrop-blur-sm border border-white/20">
                                    {program.faculty.code}
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                                {program.nameTh}
                            </h1>
                            <p className="text-xl text-blue-100 font-light mb-6">
                                {program.nameEn}
                            </p>

                            {/* Stats moved here */}
                            <div className="flex flex-wrap gap-6 text-blue-100">
                                <div className="flex items-center gap-2">
                                    <BookOpen className="w-5 h-5" />
                                    <span className="font-medium">{program.credits || '-'} Credits</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5" />
                                    <span className="font-medium">{program.duration || '-'}</span>
                                </div>
                            </div>
                        </div>

                        {/* CTA Card moved to Hero (Desktop) */}
                        <div className="hidden md:block bg-white/10 backdrop-blur-md rounded-[.2rem] p-6 border border-white/20 w-full max-w-[400px] shadow-xl">
                            <h3 className="text-xl font-bold mb-2 text-white">Ready to Apply?</h3>
                            <p className="text-blue-100 text-sm mb-6">
                                Start your journey with us today. Applications are now open.
                            </p>
                            <Link href={`/admissions/register?program=${program.id}`} className="block">
                                <Button className="w-full bg-white text-blue-900 hover:bg-blue-50 font-bold py-4 text-lg shadow-sm transition-all hover:shadow-md rounded-[.2rem]">
                                    Apply Now
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-7xl -mt-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Overview Section */}
                        <div className="bg-white rounded-[.2rem] shadow-sm border border-gray-100 p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <FileText className="w-6 h-6 text-blue-600" />
                                About This Program
                            </h2>
                            <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed whitespace-pre-line">
                                {program.description || "No description available."}
                            </div>
                        </div>

                        {/* Objectives */}
                        {program.objectives && (
                            <div className="bg-white rounded-[.2rem] shadow-sm border border-gray-100 p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <Award className="w-6 h-6 text-amber-500" />
                                    Program Objectives
                                </h2>
                                <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed whitespace-pre-line">
                                    {program.objectives}
                                </div>
                            </div>
                        )}

                        {/* Curriculum Structure */}
                        {program.structure && (
                            <div className="bg-white rounded-[.2rem] shadow-sm border border-gray-100 p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <BookOpen className="w-6 h-6 text-indigo-600" />
                                    Curriculum Structure
                                </h2>
                                <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed whitespace-pre-line">
                                    {program.structure}
                                </div>
                            </div>
                        )}

                        {/* Courses Table */}
                        {program.courses && program.courses.length > 0 && (
                            <div className="bg-white rounded-[.2rem] shadow-sm border border-gray-100 overflow-hidden">
                                <div className="p-8 border-b border-gray-100">
                                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                        <GraduationCap className="w-6 h-6 text-emerald-600" />
                                        Courses
                                    </h2>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-100">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Code</th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Course Name</th>
                                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Credits</th>
                                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Semester</th>
                                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-100">
                                            {program.courses.map((pc) => (
                                                <tr key={pc.id} className="hover:bg-blue-50/50 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                                                        {pc.course.code}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm font-medium text-gray-900">{pc.course.nameEn}</div>
                                                        <div className="text-sm text-gray-500">{pc.course.nameTh}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-600">
                                                        {pc.course.credits}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-600">
                                                        {pc.semester || '-'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                                        <span className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-[.2rem] ${pc.isRequired
                                                            ? 'bg-blue-100 text-blue-800'
                                                            : 'bg-amber-100 text-amber-800'
                                                            }`}>
                                                            {pc.isRequired ? 'Required' : 'Elective'}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar Column */}
                    <div className="space-y-6">




                        {/* Department Info */}
                        <div className="bg-white rounded-[.2rem] shadow-sm border border-gray-100 p-6">
                            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Building2 className="w-5 h-5 text-gray-400" />
                                Department Info
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase mb-1">Faculty</p>
                                    <p className="font-medium text-gray-900">{program.faculty.nameEn}</p>
                                    <p className="text-sm text-gray-500">{program.faculty.nameTh}</p>
                                </div>
                                <div className="pt-4 border-t border-gray-100">
                                    <p className="text-xs text-gray-500 uppercase mb-1">Department</p>
                                    <p className="font-medium text-gray-900">{program.department.nameEn}</p>
                                    <p className="text-sm text-gray-500">{program.department.nameTh}</p>
                                </div>
                            </div>
                        </div>

                        {/* Admission Requirements */}
                        {program.admissionRequirements && (
                            <div className="bg-white rounded-[.2rem] shadow-sm border border-gray-100 p-6">
                                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                    Admission
                                </h3>
                                <div className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">
                                    {program.admissionRequirements}
                                </div>
                            </div>
                        )}

                        {/* Career Opportunities */}
                        {program.careerOpportunities && (
                            <div className="bg-white rounded-[.2rem] shadow-sm border border-gray-100 p-6">
                                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <Briefcase className="w-5 h-5 text-blue-500" />
                                    Career Paths
                                </h3>
                                <div className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">
                                    {program.careerOpportunities}
                                </div>
                            </div>
                        )}


                    </div>
                </div>
            </div>
        </div>
    );
}

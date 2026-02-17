import { getInstructorById } from "@/actions/user-instructors";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft,
    Mail,
    Phone,
    MapPin,
    Calendar,
    BookOpen,
    Users,
    Clock,
    Edit,
    Trash2,
    Building
} from "lucide-react";
import { format } from "date-fns";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function InstructorDetailPage({ params }: PageProps) {
    const { id } = await params;

    if (id === "create") {
        notFound();
    }

    const result = await getInstructorById(id);

    if (!result.success || !result.instructor) {
        notFound();
    }

    const instructor = result.instructor;
    const teachingHours = instructor.instructedSections?.length * 3 || 0; // Assume 3 hours per section

    return (
        <div className="flex h-full flex-col">
            {/* Header */}
            <div className="border-b bg-white p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/users/instructors">
                            <button className="rounded-md border p-2 hover:bg-gray-50">
                                <ArrowLeft className="h-5 w-5" />
                            </button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold">
                                {instructor.title} {instructor.firstName} {instructor.lastName}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                {instructor.position || "Instructor"}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Link href={`/admin/users/instructors/${instructor.id}/edit`}>
                            <button className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
                                <Edit className="h-4 w-4" />
                                Edit
                            </button>
                        </Link>
                        <button className="flex items-center gap-2 rounded-md border border-red-600 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                            Delete
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-6">
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Left Column - Main Info */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Personal Information */}
                        <div className="rounded-lg border bg-card p-6">
                            <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <p className="text-sm text-muted-foreground">Full Name</p>
                                    <p className="font-medium">
                                        {instructor.title} {instructor.firstName} {instructor.lastName}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Position</p>
                                    <p className="font-medium">{instructor.position || "Instructor"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Email</p>
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <p className="font-medium">{instructor.user?.email}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Phone</p>
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                        <p className="font-medium">{instructor.phone || "-"}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Office Location</p>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-muted-foreground" />
                                        <p className="font-medium">{instructor.officeLocation || "-"}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Office Hours</p>
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                        <p className="font-medium">{instructor.officeHours || "-"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Academic Affiliation */}
                        <div className="rounded-lg border bg-card p-6">
                            <h2 className="text-lg font-semibold mb-4">Academic Affiliation</h2>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <p className="text-sm text-muted-foreground">Faculty</p>
                                    <div className="flex items-center gap-2">
                                        <Building className="h-4 w-4 text-muted-foreground" />
                                        <p className="font-medium">{instructor.faculty?.nameEn || "-"}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Department</p>
                                    <div className="flex items-center gap-2">
                                        <Building className="h-4 w-4 text-muted-foreground" />
                                        <p className="font-medium">{instructor.department?.nameEn || "-"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Profile Information */}
                        {(instructor.bio || instructor.expertise || instructor.education) && (
                            <div className="rounded-lg border bg-card p-6">
                                <h2 className="text-lg font-semibold mb-4">Profile</h2>
                                <div className="space-y-4">
                                    {instructor.bio && (
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground mb-1">Biography</p>
                                            <p className="text-sm">{instructor.bio}</p>
                                        </div>
                                    )}
                                    {instructor.expertise && (
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground mb-1">Areas of Expertise</p>
                                            <p className="text-sm">{instructor.expertise}</p>
                                        </div>
                                    )}
                                    {instructor.education && (
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground mb-1">Education</p>
                                            <p className="text-sm">{instructor.education}</p>
                                        </div>
                                    )}
                                    {instructor.publications && (
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground mb-1">Publications</p>
                                            <p className="text-sm">{instructor.publications}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Teaching Assignments */}
                        <div className="rounded-lg border bg-card p-6">
                            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <BookOpen className="h-5 w-5" />
                                Teaching Assignments
                            </h2>
                            {instructor.instructedSections && instructor.instructedSections.length > 0 ? (
                                <div className="space-y-3">
                                    {instructor.instructedSections.map((section: any) => (
                                        <div key={section.id} className="flex items-center justify-between rounded-lg border p-3">
                                            <div>
                                                <p className="font-medium">{section.course?.nameEn}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {section.course?.code} - Section {section.sectionNumber}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {section.term?.year}/{section.term?.semester}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-medium">{section.course?.credits} credits</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {section._count?.enrollments || 0} students
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center py-8 text-muted-foreground">No teaching assignments</p>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Stats & Actions */}
                    <div className="space-y-6">
                        {/* Quick Stats */}
                        <div className="rounded-lg border bg-card p-6">
                            <h2 className="text-lg font-semibold mb-4">Teaching Load</h2>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <BookOpen className="h-4 w-4 text-blue-600" />
                                        <span className="text-sm">Courses</span>
                                    </div>
                                    <span className="font-bold">{instructor.instructedSections?.length || 0}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-green-600" />
                                        <span className="text-sm">Teaching Hours/Week</span>
                                    </div>
                                    <span className="font-bold">{teachingHours}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Users className="h-4 w-4 text-purple-600" />
                                        <span className="text-sm">Total Students</span>
                                    </div>
                                    <span className="font-bold">
                                        {instructor.instructedSections?.reduce((sum: number, s: any) =>
                                            sum + (s._count?.enrollments || 0), 0
                                        ) || 0}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Profile Visibility */}
                        <div className="rounded-lg border bg-card p-6">
                            <h2 className="text-lg font-semibold mb-4">Profile Settings</h2>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Public Profile</span>
                                    <span className={`rounded-full px-2 py-1 text-xs ${instructor.isProfilePublic
                                        ? "bg-green-100 text-green-700"
                                        : "bg-gray-100 text-gray-700"
                                        }`}>
                                        {instructor.isProfilePublic ? "Visible" : "Hidden"}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Role</span>
                                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700">
                                        {instructor.user?.role}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="rounded-lg border bg-card p-6">
                            <h2 className="text-lg font-semibold mb-4">Actions</h2>
                            <div className="space-y-2">
                                <button className="w-full rounded-md border p-2 text-sm hover:bg-gray-50 text-left">
                                    View Teaching Schedule
                                </button>
                                <button className="w-full rounded-md border p-2 text-sm hover:bg-gray-50 text-left">
                                    Assign Courses
                                </button>
                                <button className="w-full rounded-md border p-2 text-sm hover:bg-gray-50 text-left">
                                    View Student Evaluations
                                </button>
                                <button className="w-full rounded-md border p-2 text-sm hover:bg-gray-50 text-left">
                                    Toggle Profile Visibility
                                </button>
                                <button className="w-full rounded-md border border-red-600 p-2 text-sm text-red-600 hover:bg-red-50 text-left">
                                    Remove Instructor
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

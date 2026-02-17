import { getStudentById } from "@/actions/user-students";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft,
    Mail,
    Phone,
    MapPin,
    Calendar,
    GraduationCap,
    Award,
    BookOpen
} from "lucide-react";
import { format } from "date-fns";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function AlumniDetailPage({ params }: PageProps) {
    const { id } = await params;

    if (id === "create") notFound();

    const result = await getStudentById(id);

    if (!result.success || !result.student) {
        notFound();
    }

    const alumni = result.student;

    // Verify this is actually an alumni (GRADUATED status)
    if (alumni.status !== "GRADUATED") {
        notFound();
    }

    return (
        <div className="flex h-full flex-col">
            {/* Header */}
            <div className="border-b bg-white p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/users/alumni">
                            <button className="rounded-md border p-2 hover:bg-gray-50">
                                <ArrowLeft className="h-5 w-5" />
                            </button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold">
                                {alumni.firstName} {alumni.lastName}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Alumni ID: {alumni.studentId}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Award className="h-6 w-6 text-purple-600" />
                        <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
                            Graduate
                        </span>
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
                                    <p className="text-sm text-muted-foreground">First Name</p>
                                    <p className="font-medium">{alumni.firstName}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Last Name</p>
                                    <p className="font-medium">{alumni.lastName}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Email</p>
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <p className="font-medium">{alumni.user?.email}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Phone</p>
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                        <p className="font-medium">{alumni.phone || "-"}</p>
                                    </div>
                                </div>
                                <div className="md:col-span-2">
                                    <p className="text-sm text-muted-foreground">Address</p>
                                    <div className="flex items-start gap-2">
                                        <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                                        <p className="font-medium">{alumni.address || "-"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Academic Information */}
                        <div className="rounded-lg border bg-card p-6">
                            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <GraduationCap className="h-5 w-5" />
                                Academic Information
                            </h2>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <p className="text-sm text-muted-foreground">Program</p>
                                    <p className="font-medium">{alumni.program?.nameEn}</p>
                                    <p className="text-xs text-muted-foreground">{alumni.program?.nameTh}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Faculty</p>
                                    <p className="font-medium">{alumni.program?.faculty?.nameEn}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Admission Year</p>
                                    <p className="font-medium">{alumni.admissionYear || "-"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Status</p>
                                    <span className="inline-flex items-center rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700">
                                        {alumni.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Additional Info */}
                    <div className="space-y-6">
                        {/* Quick Stats */}
                        <div className="rounded-lg border bg-card p-6">
                            <h2 className="text-lg font-semibold mb-4">Quick Info</h2>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-muted-foreground">Student ID</p>
                                    <p className="font-medium">{alumni.studentId}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Joined</p>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <p className="text-sm">
                                            {format(new Date(alumni.createdAt), "MMM d, yyyy")}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Last Updated</p>
                                    <p className="text-sm">
                                        {format(new Date(alumni.updatedAt), "MMM d, yyyy")}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="rounded-lg border bg-card p-6">
                            <h2 className="text-lg font-semibold mb-4">Actions</h2>
                            <div className="space-y-2">
                                <button className="w-full rounded-md border p-2 text-sm hover:bg-gray-50 text-left">
                                    View Academic Records
                                </button>
                                <button className="w-full rounded-md border p-2 text-sm hover:bg-gray-50 text-left">
                                    Download Transcript
                                </button>
                                <button className="w-full rounded-md border p-2 text-sm hover:bg-gray-50 text-left">
                                    Contact Alumni
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

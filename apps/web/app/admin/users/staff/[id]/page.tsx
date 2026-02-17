import { prisma } from "@ums/lib";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft,
    Mail,
    Phone,
    MapPin,
    Building,
    Briefcase,
    Edit,
    Trash2,
    Calendar
} from "lucide-react";
import { format } from "date-fns";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

async function getStaffById(id: string) {
    if (!id || id === "create") return null;

    const staff = await prisma.personnel.findUnique({
        where: { id },
        include: {
            user: true,
            faculty: true,
            department: true,
        },
    });
    return staff;
}

export default async function StaffDetailPage({ params }: PageProps) {
    const { id } = await params;

    if (id === "create") {
        notFound();
    }

    const staff = await getStaffById(id);

    if (!staff || staff.user.role !== "STAFF") {
        notFound();
    }

    return (
        <div className="flex h-full flex-col">
            {/* Header */}
            <div className="border-b bg-white p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/users/staff">
                            <button className="rounded-md border p-2 hover:bg-gray-50">
                                <ArrowLeft className="h-5 w-5" />
                            </button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold">
                                {staff.title} {staff.firstName} {staff.lastName}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                {staff.position || "Staff Member"}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Link href={`/admin/users/staff/${staff.id}/edit`}>
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
                                        {staff.title} {staff.firstName} {staff.lastName}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Position</p>
                                    <div className="flex items-center gap-2">
                                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                                        <p className="font-medium">{staff.position || "Staff"}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Email</p>
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <p className="font-medium">{staff.user.email}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Phone</p>
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                        <p className="font-medium">{staff.phone || "-"}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Office Location</p>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-muted-foreground" />
                                        <p className="font-medium">{staff.officeLocation || "-"}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Joined</p>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <p className="font-medium">
                                            {format(new Date(staff.createdAt), "MMMM d, yyyy")}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Department Assignment */}
                        <div className="rounded-lg border bg-card p-6">
                            <h2 className="text-lg font-semibold mb-4">Department Assignment</h2>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <p className="text-sm text-muted-foreground">Faculty</p>
                                    <div className="flex items-center gap-2">
                                        <Building className="h-4 w-4 text-muted-foreground" />
                                        <p className="font-medium">{staff.faculty?.nameEn || "-"}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Department</p>
                                    <div className="flex items-center gap-2">
                                        <Building className="h-4 w-4 text-muted-foreground" />
                                        <p className="font-medium">{staff.department?.nameEn || "-"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Profile Information */}
                        {staff.bio && (
                            <div className="rounded-lg border bg-card p-6">
                                <h2 className="text-lg font-semibold mb-4">About</h2>
                                <p className="text-sm text-muted-foreground">{staff.bio}</p>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Info & Actions */}
                    <div className="space-y-6">
                        {/* Account Information */}
                        <div className="rounded-lg border bg-card p-6">
                            <h2 className="text-lg font-semibold mb-4">Account Information</h2>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Role</span>
                                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700">
                                        {staff.user.role}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Status</span>
                                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-700">
                                        Active
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Profile Visibility</span>
                                    <span className={`rounded-full px-2 py-1 text-xs ${staff.isProfilePublic
                                        ? "bg-green-100 text-green-700"
                                        : "bg-gray-100 text-gray-700"
                                        }`}>
                                        {staff.isProfilePublic ? "Public" : "Private"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="rounded-lg border bg-card p-6">
                            <h2 className="text-lg font-semibold mb-4">Contact</h2>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-xs text-muted-foreground mb-1">Email</p>
                                    <p className="text-sm font-medium">{staff.user.email}</p>
                                </div>
                                {staff.phone && (
                                    <div>
                                        <p className="text-xs text-muted-foreground mb-1">Phone</p>
                                        <p className="text-sm font-medium">{staff.phone}</p>
                                    </div>
                                )}
                                {staff.officeLocation && (
                                    <div>
                                        <p className="text-xs text-muted-foreground mb-1">Office</p>
                                        <p className="text-sm font-medium">{staff.officeLocation}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="rounded-lg border bg-card p-6">
                            <h2 className="text-lg font-semibold mb-4">Actions</h2>
                            <div className="space-y-2">
                                <button className="w-full rounded-md border p-2 text-sm hover:bg-gray-50 text-left">
                                    Send Email
                                </button>
                                <button className="w-full rounded-md border p-2 text-sm hover:bg-gray-50 text-left">
                                    View Activity Log
                                </button>
                                <button className="w-full rounded-md border p-2 text-sm hover:bg-gray-50 text-left">
                                    Change Department
                                </button>
                                <button className="w-full rounded-md border border-yellow-600 p-2 text-sm text-yellow-600 hover:bg-yellow-50 text-left">
                                    Deactivate Account
                                </button>
                                <button className="w-full rounded-md border border-red-600 p-2 text-sm text-red-600 hover:bg-red-50 text-left">
                                    Remove Staff
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

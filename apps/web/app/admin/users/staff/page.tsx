import { SubNavigation } from "@/components/sub-navigation";
import { getStaff, getStaffStats } from "@/actions/user-staff-admins";
import { Briefcase, Users, Building, Search } from "lucide-react";
import Link from "next/link";

const subNavItems = [
    { label: "All Staff", href: "/admin/users/staff" },
    { label: "Administrative", href: "/admin/users/staff/administrative" },
    { label: "Support Staff", href: "/admin/users/staff/support" },
    { label: "Directory", href: "/admin/users/staff/directory" },
];

export default async function StaffPage() {
    const [staffResult, statsResult] = await Promise.all([
        getStaff(),
        getStaffStats(),
    ]);

    const staff = staffResult.success ? staffResult.staff : [];
    const stats = statsResult.success ? statsResult.stats : {
        total: 0,
        administrative: 0,
        support: 0,
    };

    return (
        <div className="flex h-full flex-col">
            <SubNavigation items={subNavItems} />

            <div className="flex-1 space-y-6 p-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Staff</h1>
                    <p className="text-muted-foreground">
                        Manage administrative and support staff members
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-lg border bg-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total Staff</p>
                                <p className="text-2xl font-bold">{stats.total}</p>
                            </div>
                            <Users className="h-8 w-8 text-blue-600" />
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Administrative</p>
                                <p className="text-2xl font-bold">{stats.administrative}</p>
                            </div>
                            <Building className="h-8 w-8 text-green-600" />
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Support</p>
                                <p className="text-2xl font-bold">{stats.support}</p>
                            </div>
                            <Briefcase className="h-8 w-8 text-purple-600" />
                        </div>
                    </div>
                </div>

                {/* Search and Actions */}
                <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search by name..."
                            className="w-full rounded-md border border-input bg-background pl-10 pr-4 py-2 text-sm"
                        />
                    </div>
                    <Link href="/admin/users/staff/create">
                        <button className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
                            Add Staff Member
                        </button>
                    </Link>
                </div>

                {/* Staff Table */}
                <div className="rounded-lg border bg-card">
                    <div className="p-6">
                        <h2 className="text-lg font-semibold mb-4">Staff Directory ({staff?.length || 0})</h2>

                        {staff && staff.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="border-b">
                                        <tr className="text-left text-sm text-muted-foreground">
                                            <th className="pb-3 font-medium">Name</th>
                                            <th className="pb-3 font-medium">Position</th>
                                            <th className="pb-3 font-medium">Faculty</th>
                                            <th className="pb-3 font-medium">Department</th>
                                            <th className="pb-3 font-medium">Contact</th>
                                            <th className="pb-3 font-medium">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {staff.map((member: any) => (
                                            <tr key={member.id} className="text-sm">
                                                <td className="py-3">
                                                    <div>
                                                        <p className="font-medium">
                                                            {member.title} {member.firstName} {member.lastName}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">{member.user?.email}</p>
                                                    </div>
                                                </td>
                                                <td className="py-3">{member.position || "Staff"}</td>
                                                <td className="py-3">{member.faculty?.nameEn || "-"}</td>
                                                <td className="py-3">{member.department?.nameEn || "-"}</td>
                                                <td className="py-3">{member.phone || "-"}</td>
                                                <td className="py-3">
                                                    <Link
                                                        href={`/admin/users/staff/${member.id}`}
                                                        className="text-blue-600 hover:underline text-sm"
                                                    >
                                                        View
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-12 text-muted-foreground">
                                <Briefcase className="mx-auto h-12 w-12 mb-4 opacity-50" />
                                <p>No staff members found</p>
                                <p className="text-sm">Add staff members to get started</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

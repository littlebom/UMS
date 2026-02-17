"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Search, Building2 } from "lucide-react";

interface StaffDirectoryClientProps {
    staff: any[];
    departments: any[];
}

export function StaffDirectoryClient({ staff, departments }: StaffDirectoryClientProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState<string>("all");

    // Filter staff
    const filteredStaff = staff.filter((member) => {
        const matchesSearch =
            searchQuery === "" ||
            `${member.firstName} ${member.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
            member.position?.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesDepartment =
            selectedDepartment === "all" || member.departmentId === selectedDepartment;

        return matchesSearch && matchesDepartment;
    });

    // Group by department
    const groupedStaff = filteredStaff.reduce((acc, member) => {
        const deptName = member.department?.nameEn || "Other";
        if (!acc[deptName]) {
            acc[deptName] = [];
        }
        acc[deptName].push(member);
        return acc;
    }, {} as Record<string, any[]>);

    return (
        <>
            {/* Filters */}
            <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="grid gap-4 md:grid-cols-2">
                    {/* Search */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Search
                        </label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by name or position..."
                                className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Department Filter */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Filter by Department
                        </label>
                        <select
                            value={selectedDepartment}
                            onChange={(e) => setSelectedDepartment(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 py-2 px-4 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Departments</option>
                            {departments.map((dept) => (
                                <option key={dept.id} value={dept.id}>
                                    {dept.nameEn}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <p className="mt-4 text-sm text-gray-600">
                    Showing {filteredStaff.length} of {staff.length} staff members
                </p>
            </div>

            {/* Staff by Department */}
            {Object.keys(groupedStaff).length === 0 ? (
                <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
                    <p className="text-gray-500">No staff members found matching your criteria.</p>
                </div>
            ) : (
                <div className="space-y-8">
                    {Object.entries(groupedStaff).map(([deptName, members]) => (
                        <div key={deptName}>
                            <div className="mb-4 flex items-center gap-2">
                                <Building2 className="h-5 w-5 text-blue-600" />
                                <h2 className="text-xl font-semibold text-gray-900">{deptName}</h2>
                                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                                    {members.length}
                                </span>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {members.map((member) => (
                                    <Link
                                        key={member.id}
                                        href={`/profile/staff/${member.id}`}
                                        className="group rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-lg transition"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 text-lg font-bold text-white">
                                                {member.profileImageUrl ? (
                                                    <img
                                                        src={member.profileImageUrl}
                                                        alt=""
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <>
                                                        {member.firstName[0]}
                                                        {member.lastName[0]}
                                                    </>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition truncate">
                                                    {member.title && `${member.title} `}
                                                    {member.firstName} {member.lastName}
                                                </h3>
                                                {member.position && (
                                                    <p className="text-sm text-gray-600 truncate">
                                                        {member.position}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                                            <Mail className="h-3 w-3 flex-shrink-0" />
                                            <span className="truncate">{member.user.email}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

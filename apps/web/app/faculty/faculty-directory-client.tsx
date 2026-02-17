"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Search } from "lucide-react";

interface FacultyDirectoryClientProps {
    instructors: any[];
    faculties: any[];
}

export function FacultyDirectoryClient({ instructors, faculties }: FacultyDirectoryClientProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFaculty, setSelectedFaculty] = useState<string>("all");

    // Filter instructors
    const filteredInstructors = instructors.filter((instructor) => {
        const matchesSearch =
            searchQuery === "" ||
            `${instructor.firstName} ${instructor.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
            instructor.position?.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesFaculty =
            selectedFaculty === "all" || instructor.facultyId === selectedFaculty;

        return matchesSearch && matchesFaculty;
    });

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
                                className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    </div>

                    {/* Faculty Filter */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Filter by Faculty
                        </label>
                        <select
                            value={selectedFaculty}
                            onChange={(e) => setSelectedFaculty(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 py-2 px-4 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="all">All Faculties</option>
                            {faculties.map((faculty) => (
                                <option key={faculty.id} value={faculty.id}>
                                    {faculty.nameEn}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <p className="mt-4 text-sm text-gray-600">
                    Showing {filteredInstructors.length} of {instructors.length} instructors
                </p>
            </div>

            {/* Instructors Grid */}
            {filteredInstructors.length === 0 ? (
                <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
                    <p className="text-gray-500">No instructors found matching your criteria.</p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredInstructors.map((instructor) => (
                        <Link
                            key={instructor.id}
                            href={`/profile/instructor/${instructor.id}`}
                            className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg transition"
                        >
                            <div className="flex items-start gap-4">
                                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-xl font-bold text-white">
                                    {instructor.profileImageUrl ? (
                                        <img
                                            src={instructor.profileImageUrl}
                                            alt=""
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <>
                                            {instructor.firstName[0]}
                                            {instructor.lastName[0]}
                                        </>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition truncate">
                                        {instructor.title && `${instructor.title} `}
                                        {instructor.firstName} {instructor.lastName}
                                    </h3>
                                    {instructor.position && (
                                        <p className="text-sm text-gray-600 truncate">{instructor.position}</p>
                                    )}
                                    {instructor.faculty && (
                                        <p className="mt-1 text-xs text-gray-500 truncate">
                                            {instructor.faculty.nameEn}
                                        </p>
                                    )}
                                </div>
                            </div>
                            {instructor.expertise && (
                                <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                                    {instructor.expertise}
                                </p>
                            )}
                            <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                                <Mail className="h-3 w-3" />
                                <span className="truncate">{instructor.user.email}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </>
    );
}

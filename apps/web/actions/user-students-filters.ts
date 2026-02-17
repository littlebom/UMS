"use server";

import { prisma } from "@ums/lib";

// Get all faculties for dropdown
export async function getFaculties() {
    try {
        const faculties = await prisma.faculty.findMany({
            select: {
                id: true,
                nameEn: true,
                nameTh: true,
                code: true,
            },
            orderBy: {
                nameEn: "asc",
            },
        });

        return {
            success: true,
            faculties,
        };
    } catch (error) {
        console.error("Error fetching faculties:", error);
        return {
            success: false,
            error: "Failed to fetch faculties",
            faculties: [],
        };
    }
}

// Get departments (optionally filtered by faculty)
export async function getDepartments(facultyId?: string) {
    try {
        const where: any = {};
        if (facultyId) {
            where.facultyId = facultyId;
        }

        const departments = await prisma.department.findMany({
            where,
            select: {
                id: true,
                nameEn: true,
                nameTh: true,
                facultyId: true,
            },
            orderBy: {
                nameEn: "asc",
            },
        });

        return {
            success: true,
            departments,
        };
    } catch (error) {
        console.error("Error fetching departments:", error);
        return {
            success: false,
            error: "Failed to fetch departments",
            departments: [],
        };
    }
}

// Get programs (optionally filtered by faculty/department)
export async function getPrograms(filters?: {
    facultyId?: string;
    departmentId?: string;
}) {
    try {
        const where: any = {};
        if (filters?.facultyId) {
            where.facultyId = filters.facultyId;
        }
        if (filters?.departmentId) {
            where.departmentId = filters.departmentId;
        }

        const programs = await prisma.program.findMany({
            where,
            select: {
                id: true,
                nameEn: true,
                nameTh: true,
                degreeLevel: true,
                facultyId: true,
                departmentId: true,
                faculty: {
                    select: {
                        nameEn: true,
                    },
                },
                department: {
                    select: {
                        nameEn: true,
                    },
                },
            },
            orderBy: {
                nameEn: "asc",
            },
        });

        return {
            success: true,
            programs,
        };
    } catch (error) {
        console.error("Error fetching programs:", error);
        return {
            success: false,
            error: "Failed to fetch programs",
            programs: [],
        };
    }
}

// Get filtered students with advanced search
export async function getFilteredStudents(filters?: {
    search?: string;
    facultyId?: string;
    departmentId?: string;
    programId?: string;
    status?: "STUDYING" | "ON_LEAVE";
    admissionYear?: number;
}) {
    try {
        const where: any = {
            status: {
                in: ["STUDYING", "ON_LEAVE"],
            },
        };

        // Search filter
        if (filters?.search) {
            where.OR = [
                { firstName: { contains: filters.search, mode: "insensitive" } },
                { lastName: { contains: filters.search, mode: "insensitive" } },
                { studentId: { contains: filters.search } },
                { user: { email: { contains: filters.search, mode: "insensitive" } } },
            ];
        }

        // Status filter
        if (filters?.status) {
            where.status = filters.status;
        }

        // Program filter (direct)
        if (filters?.programId) {
            where.programId = filters.programId;
        } else {
            // Department filter (via program)
            if (filters?.departmentId) {
                where.program = {
                    departmentId: filters.departmentId,
                };
            } else if (filters?.facultyId) {
                // Faculty filter (via program)
                where.program = {
                    facultyId: filters.facultyId,
                };
            }
        }

        // Admission year filter
        if (filters?.admissionYear) {
            where.admissionYear = filters.admissionYear;
        }

        const students = await prisma.student.findMany({
            where,
            include: {
                user: {
                    select: {
                        email: true,
                    },
                },
                program: {
                    select: {
                        nameEn: true,
                        nameTh: true,
                        faculty: {
                            select: {
                                nameEn: true,
                            },
                        },
                        department: {
                            select: {
                                nameEn: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                studentId: "asc",
            },
        });

        return {
            success: true,
            students,
            count: students.length,
        };
    } catch (error) {
        console.error("Error fetching filtered students:", error);
        return {
            success: false,
            error: "Failed to fetch students",
            students: [],
            count: 0,
        };
    }
}

// Get unique admission years
export async function getAdmissionYears() {
    try {
        const students = await prisma.student.findMany({
            where: {
                admissionYear: {
                    not: null,
                },
            },
            select: {
                admissionYear: true,
            },
            distinct: ["admissionYear"],
            orderBy: {
                admissionYear: "desc",
            },
        });

        const years = students
            .map((s) => s.admissionYear)
            .filter((year): year is number => year !== null);

        return {
            success: true,
            years,
        };
    } catch (error) {
        console.error("Error fetching admission years:", error);
        return {
            success: false,
            error: "Failed to fetch admission years",
            years: [],
        };
    }
}

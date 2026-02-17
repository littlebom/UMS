"use server";

import { prisma } from "@ums/lib";
import { revalidatePath } from "next/cache";

// Get all student groups with filters
export async function getStudentGroups(filters?: {
    programId?: string;
    admissionYear?: number;
    search?: string;
}) {
    try {
        const where: any = {};

        if (filters?.programId) {
            where.programId = filters.programId;
        }

        if (filters?.admissionYear) {
            where.admissionYear = filters.admissionYear;
        }

        if (filters?.search) {
            where.name = { contains: filters.search };
        }

        const groups = await prisma.studentGroup.findMany({
            where,
            include: {
                program: {
                    select: {
                        id: true,
                        nameTh: true,
                        nameEn: true,
                        degreeLevel: true,
                        faculty: {
                            select: {
                                code: true,
                                nameTh: true,
                                nameEn: true,
                            },
                        },
                    },
                },
                advisor: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        title: true,
                    },
                },
                _count: {
                    select: {
                        students: true,
                        sections: true,
                    },
                },
            },
            orderBy: [
                { admissionYear: "desc" },
                { program: { nameEn: "asc" } },
                { name: "asc" },
            ],
        });

        return { success: true, groups };
    } catch (error) {
        console.error("Error fetching student groups:", error);
        return { success: false, error: "Failed to fetch student groups" };
    }
}

// Get a single student group by ID
export async function getStudentGroupById(id: string) {
    try {
        const group = await prisma.studentGroup.findUnique({
            where: { id },
            include: {
                program: {
                    select: {
                        id: true,
                        nameTh: true,
                        nameEn: true,
                        degreeLevel: true,
                        faculty: {
                            select: {
                                code: true,
                                nameTh: true,
                                nameEn: true,
                            },
                        },
                    },
                },
                advisor: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        title: true,
                    },
                },
                students: {
                    select: {
                        id: true,
                        studentId: true,
                        firstName: true,
                        lastName: true,
                        status: true,
                    },
                    orderBy: { studentId: "asc" },
                },
                sections: {
                    include: {
                        course: {
                            select: {
                                code: true,
                                nameEn: true,
                            },
                        },
                        term: {
                            select: {
                                year: true,
                                semester: true,
                            },
                        },
                    },
                },
            },
        });

        if (!group) {
            return { success: false, error: "Student group not found" };
        }

        return { success: true, group };
    } catch (error) {
        console.error("Error fetching student group:", error);
        return { success: false, error: "Failed to fetch student group" };
    }
}

// Get timetable/schedules for a specific student group
export async function getGroupTimetable(groupId: string) {
    try {
        // Get all sections assigned to this group
        const group = await prisma.studentGroup.findUnique({
            where: { id: groupId },
            include: {
                sections: {
                    select: { id: true }
                }
            }
        });

        if (!group) {
            return { success: false, error: "Student group not found" };
        }

        const sectionIds = group.sections.map(s => s.id);

        // Get all schedules for these sections
        const schedules = await prisma.classSchedule.findMany({
            where: {
                sectionId: { in: sectionIds }
            },
            include: {
                section: {
                    include: {
                        course: {
                            select: {
                                code: true,
                                nameEn: true,
                                nameTh: true,
                            }
                        }
                    }
                },
                course: {
                    select: {
                        code: true,
                        nameEn: true,
                        nameTh: true,
                    }
                },
                room: {
                    select: {
                        code: true,
                        name: true,
                        building: true,
                    }
                },
                instructor: {
                    select: {
                        firstName: true,
                        lastName: true,
                        title: true,
                    }
                },
                term: {
                    select: {
                        year: true,
                        semester: true,
                    }
                }
            },
            orderBy: [
                { day: 'asc' },
                { startTime: 'asc' }
            ]
        });

        return { success: true, schedules };
    } catch (error) {
        console.error("Error fetching group timetable:", error);
        return { success: false, error: "Failed to fetch timetable" };
    }
}

// Create a new student group
export async function createStudentGroup(data: {
    name: string;
    admissionYear: number;
    programId: string;
    advisorId?: string;
}) {
    try {
        // Check for duplicate
        const existing = await prisma.studentGroup.findUnique({
            where: {
                programId_admissionYear_name: {
                    programId: data.programId,
                    admissionYear: data.admissionYear,
                    name: data.name,
                },
            },
        });

        if (existing) {
            return {
                success: false,
                error: "A group with this name already exists for this program and year",
            };
        }

        const group = await prisma.studentGroup.create({
            data: {
                name: data.name,
                admissionYear: data.admissionYear,
                programId: data.programId,
                advisorId: data.advisorId || null,
            },
            include: {
                program: true,
                advisor: true,
            },
        });

        revalidatePath("/admin/academic/groups");
        return { success: true, group };
    } catch (error) {
        console.error("Error creating student group:", error);
        return { success: false, error: "Failed to create student group" };
    }
}

// Update a student group
export async function updateStudentGroup(
    id: string,
    data: {
        name?: string;
        admissionYear?: number;
        programId?: string;
        advisorId?: string | null;
    }
) {
    try {
        // If changing name/year/program, check for duplicate
        if (data.name || data.admissionYear || data.programId) {
            const current = await prisma.studentGroup.findUnique({
                where: { id },
            });

            if (current) {
                const checkData = {
                    programId: data.programId || current.programId,
                    admissionYear: data.admissionYear || current.admissionYear,
                    name: data.name || current.name,
                };

                const existing = await prisma.studentGroup.findFirst({
                    where: {
                        AND: [
                            { id: { not: id } },
                            { programId: checkData.programId },
                            { admissionYear: checkData.admissionYear },
                            { name: checkData.name },
                        ],
                    },
                });

                if (existing) {
                    return {
                        success: false,
                        error: "A group with this name already exists for this program and year",
                    };
                }
            }
        }

        const group = await prisma.studentGroup.update({
            where: { id },
            data: {
                name: data.name,
                admissionYear: data.admissionYear,
                programId: data.programId,
                advisorId: data.advisorId,
            },
            include: {
                program: true,
                advisor: true,
            },
        });

        revalidatePath("/admin/academic/groups");
        revalidatePath(`/admin/academic/groups/${id}`);
        return { success: true, group };
    } catch (error) {
        console.error("Error updating student group:", error);
        return { success: false, error: "Failed to update student group" };
    }
}

// Delete a student group
export async function deleteStudentGroup(id: string) {
    try {
        // Check if group has students
        const group = await prisma.studentGroup.findUnique({
            where: { id },
            include: {
                _count: {
                    select: {
                        students: true,
                        sections: true,
                    },
                },
            },
        });

        if (!group) {
            return { success: false, error: "Student group not found" };
        }

        if (group._count.students > 0) {
            return {
                success: false,
                error: `Cannot delete group with ${group._count.students} student(s). Please reassign them first.`,
            };
        }

        await prisma.studentGroup.delete({
            where: { id },
        });

        revalidatePath("/admin/academic/groups");
        return { success: true };
    } catch (error) {
        console.error("Error deleting student group:", error);
        return { success: false, error: "Failed to delete student group" };
    }
}

// Assign students to a group
export async function assignStudentsToGroup(
    groupId: string,
    studentIds: string[]
) {
    try {
        await prisma.student.updateMany({
            where: { id: { in: studentIds } },
            data: { studentGroupId: groupId },
        });

        revalidatePath("/admin/academic/groups");
        revalidatePath(`/admin/academic/groups/${groupId}`);
        return { success: true };
    } catch (error) {
        console.error("Error assigning students to group:", error);
        return { success: false, error: "Failed to assign students" };
    }
}

// Remove students from a group
export async function removeStudentsFromGroup(studentIds: string[]) {
    try {
        await prisma.student.updateMany({
            where: { id: { in: studentIds } },
            data: { studentGroupId: null },
        });

        revalidatePath("/admin/academic/groups");
        return { success: true };
    } catch (error) {
        console.error("Error removing students from group:", error);
        return { success: false, error: "Failed to remove students" };
    }
}

// Get students not assigned to any group (for assignment)
export async function getUnassignedStudents(filters?: {
    programId?: string;
    admissionYear?: number;
}) {
    try {
        const where: any = {
            studentGroupId: null,
        };

        if (filters?.programId) {
            where.programId = filters.programId;
        }

        if (filters?.admissionYear) {
            where.admissionYear = filters.admissionYear;
        }

        const students = await prisma.student.findMany({
            where,
            select: {
                id: true,
                studentId: true,
                firstName: true,
                lastName: true,
                admissionYear: true,
                program: {
                    select: {
                        nameEn: true,
                    },
                },
            },
            orderBy: { studentId: "asc" },
        });

        return { success: true, students };
    } catch (error) {
        console.error("Error fetching unassigned students:", error);
        return { success: false, error: "Failed to fetch students" };
    }
}

// Calculate year level from admission year (internal helper function)
function calculateYearLevel(admissionYear: number): number {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth(); // 0-11

    // Academic year typically starts in August (month 7)
    // If we're past August, we're in the new academic year
    const academicYear = currentMonth >= 7 ? currentYear : currentYear - 1;

    // +1 because first year students have yearLevel = 1
    return academicYear - admissionYear + 1;
}

// Get student groups with year level calculated
export async function getStudentGroupsWithYearLevel(filters?: {
    programId?: string;
    yearLevel?: number;
}) {
    const result = await getStudentGroups(filters);

    if (!result.success || !result.groups) {
        return result;
    }

    const groupsWithYearLevel = result.groups.map((group) => ({
        ...group,
        yearLevel: calculateYearLevel(group.admissionYear),
    }));

    // Filter by year level if specified
    if (filters?.yearLevel) {
        return {
            success: true,
            groups: groupsWithYearLevel.filter(
                (g) => g.yearLevel === filters.yearLevel
            ),
        };
    }

    return { success: true, groups: groupsWithYearLevel };
}

// Add a class section to a student group
export async function addSectionToGroup(groupId: string, sectionId: string) {
    try {
        await (prisma.studentGroup.update as any)({
            where: { id: groupId },
            data: {
                sections: {
                    connect: { id: sectionId }
                }
            }
        });

        revalidatePath(`/admin/academic/groups/${groupId}`);
        revalidatePath(`/admin/academic/groups/${groupId}/schedule`);
        return { success: true };
    } catch (error) {
        console.error("Error adding section to group:", error);
        return { success: false, error: "Failed to add section to group" };
    }
}

// Remove a class section from a student group
export async function removeSectionFromGroup(groupId: string, sectionId: string) {
    try {
        await (prisma.studentGroup.update as any)({
            where: { id: groupId },
            data: {
                sections: {
                    disconnect: { id: sectionId }
                }
            }
        });

        revalidatePath(`/admin/academic/groups/${groupId}`);
        revalidatePath(`/admin/academic/groups/${groupId}/schedule`);
        return { success: true };
    } catch (error) {
        console.error("Error removing section from group:", error);
        return { success: false, error: "Failed to remove section from group" };
    }
}

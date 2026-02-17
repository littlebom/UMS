"use server";

import { prisma } from "@ums/lib";
import { revalidatePath } from "next/cache";

// Get all rooms with filters
export async function getRooms(filters?: {
    search?: string;
    roomType?: string;
    building?: string;
    isAvailable?: boolean;
}) {
    try {
        const where: any = {};

        if (filters?.search) {
            where.OR = [
                { code: { contains: filters.search } },
                { name: { contains: filters.search } },
                { building: { contains: filters.search } },
            ];
        }

        if (filters?.roomType && filters.roomType !== "ALL") {
            where.roomType = filters.roomType;
        }

        if (filters?.building) {
            where.building = filters.building;
        }

        if (filters?.isAvailable !== undefined) {
            where.isAvailable = filters.isAvailable;
        }

        const rooms = await prisma.room.findMany({
            where,
            include: {
                schedules: {
                    select: {
                        id: true,
                        day: true,
                        startTime: true,
                        endTime: true,
                    },
                },
                examSlots: {
                    select: {
                        id: true,
                    },
                },
            },
            orderBy: [
                { building: "asc" },
                { floor: "asc" },
                { code: "asc" },
            ],
        });

        return { success: true, rooms };
    } catch (error) {
        console.error("Error fetching rooms:", error);
        return { success: false, error: "Failed to fetch rooms" };
    }
}

// Get room statistics
export async function getRoomStats() {
    try {
        const [total, available, inUse] = await Promise.all([
            prisma.room.count({ where: { isActive: true } }),
            prisma.room.count({ where: { isActive: true, isAvailable: true } }),
            prisma.room.count({ where: { isActive: true, isAvailable: false } }),
        ]);

        // Count by room type
        const roomsByType = await prisma.room.groupBy({
            by: ["roomType"],
            where: { isActive: true },
            _count: true,
        });

        const typeBreakdown: Record<string, number> = {};
        roomsByType.forEach((item) => {
            typeBreakdown[item.roomType] = item._count;
        });

        // Calculate utilization (rooms with schedules / total rooms)
        const roomsWithSchedules = await prisma.room.count({
            where: {
                isActive: true,
                schedules: {
                    some: {},
                },
            },
        });

        const utilization = total > 0 ? Math.round((roomsWithSchedules / total) * 100) : 0;

        return {
            success: true,
            stats: {
                total,
                available,
                inUse,
                utilization,
                byType: typeBreakdown,
            },
        };
    } catch (error) {
        console.error("Error fetching room stats:", error);
        return { success: false, error: "Failed to fetch statistics" };
    }
}

// Get room by ID
export async function getRoomById(id: string) {
    try {
        const room = await prisma.room.findUnique({
            where: { id },
            include: {
                schedules: {
                    include: {
                        section: {
                            include: {
                                course: {
                                    select: {
                                        code: true,
                                        nameEn: true,
                                    },
                                },
                                instructor: {
                                    select: {
                                        firstName: true,
                                        lastName: true,
                                    },
                                },
                            },
                        },
                    },
                },
                examSlots: {
                    include: {
                        examSchedule: {
                            include: {
                                course: {
                                    select: {
                                        code: true,
                                        nameEn: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        if (!room) {
            return { success: false, error: "Room not found" };
        }

        return { success: true, room };
    } catch (error) {
        console.error("Error fetching room:", error);
        return { success: false, error: "Failed to fetch room" };
    }
}

// Create room
export async function createRoom(data: {
    code: string;
    name: string;
    building: string;
    floor: number;
    capacity: number;
    roomType: string;
    facilities?: string;
}) {
    try {
        const room = await prisma.room.create({
            data: {
                code: data.code,
                name: data.name,
                building: data.building,
                floor: data.floor,
                capacity: data.capacity,
                roomType: data.roomType as any,
                facilities: data.facilities,
                isActive: true,
                isAvailable: true,
            },
        });

        revalidatePath("/admin/schedule/rooms");
        return { success: true, room };
    } catch (error) {
        console.error("Error creating room:", error);
        return { success: false, error: "Failed to create room" };
    }
}

// Update room
export async function updateRoom(
    id: string,
    data: {
        code?: string;
        name?: string;
        building?: string;
        floor?: number;
        capacity?: number;
        roomType?: string;
        facilities?: string;
        isAvailable?: boolean;
    }
) {
    try {
        const room = await prisma.room.update({
            where: { id },
            data: {
                ...(data.code && { code: data.code }),
                ...(data.name && { name: data.name }),
                ...(data.building && { building: data.building }),
                ...(data.floor !== undefined && { floor: data.floor }),
                ...(data.capacity !== undefined && { capacity: data.capacity }),
                ...(data.roomType && { roomType: data.roomType as any }),
                ...(data.facilities !== undefined && { facilities: data.facilities }),
                ...(data.isAvailable !== undefined && { isAvailable: data.isAvailable }),
            },
        });

        revalidatePath("/admin/schedule/rooms");
        return { success: true, room };
    } catch (error) {
        console.error("Error updating room:", error);
        return { success: false, error: "Failed to update room" };
    }
}

// Delete room
export async function deleteRoom(id: string) {
    try {
        await prisma.room.delete({
            where: { id },
        });

        revalidatePath("/admin/schedule/rooms");
        return { success: true };
    } catch (error) {
        console.error("Error deleting room:", error);
        return { success: false, error: "Failed to delete room" };
    }
}

// Check room availability
export async function checkRoomAvailability(
    roomId: string,
    day: string,
    startTime: string,
    endTime: string,
    excludeScheduleId?: string
) {
    try {
        const conflicts = await prisma.classSchedule.findMany({
            where: {
                roomId,
                day: day as any,
                ...(excludeScheduleId && { id: { not: excludeScheduleId } }),
                OR: [
                    {
                        AND: [
                            { startTime: { lte: startTime } },
                            { endTime: { gt: startTime } },
                        ],
                    },
                    {
                        AND: [
                            { startTime: { lt: endTime } },
                            { endTime: { gte: endTime } },
                        ],
                    },
                    {
                        AND: [
                            { startTime: { gte: startTime } },
                            { endTime: { lte: endTime } },
                        ],
                    },
                ],
            },
            include: {
                section: {
                    include: {
                        course: {
                            select: {
                                code: true,
                                nameEn: true,
                            },
                        },
                    },
                },
            },
        });

        return {
            success: true,
            isAvailable: conflicts.length === 0,
            conflicts,
        };
    } catch (error) {
        console.error("Error checking room availability:", error);
        return { success: false, error: "Failed to check availability" };
    }
}

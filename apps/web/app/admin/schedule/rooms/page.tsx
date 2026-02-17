import { DoorOpen, Plus, Search, Filter, Building, Users, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { getRooms, getRoomStats } from "@/actions/schedule-rooms";

export default async function RoomAllocationPage() {
    const [roomsResult, statsResult] = await Promise.all([
        getRooms(),
        getRoomStats(),
    ]);

    const rooms = roomsResult.success ? roomsResult.rooms : [];
    const stats = statsResult.success ? statsResult.stats : {
        totalRooms: 0,
        available: 0,
        inUse: 0,
        utilization: 0,
    };

    // Calculate counts by type
    const lectureRooms = rooms.filter((r: any) => r.roomType === "LECTURE").length;
    const labs = rooms.filter((r: any) => r.roomType === "LAB").length;
    const computerLabs = rooms.filter((r: any) => r.roomType === "COMPUTER_LAB").length;

    return (
        <div className="flex h-full flex-col">
            <div className="flex-1 space-y-6 p-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Room Allocation</h1>
                        <p className="text-muted-foreground">
                            Manage classrooms, labs, and room assignments
                        </p>
                    </div>
                    <Link href="/admin/schedule/rooms/create">
                        <button className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
                            <Plus className="h-4 w-4" />
                            Add Room
                        </button>
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                    <div className="rounded-lg border bg-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total Rooms</p>
                                <p className="text-2xl font-bold">{stats.totalRooms}</p>
                            </div>
                            <DoorOpen className="h-8 w-8 text-blue-600" />
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Available</p>
                                <p className="text-2xl font-bold">{stats.available}</p>
                            </div>
                            <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">In Use</p>
                                <p className="text-2xl font-bold">{stats.inUse}</p>
                            </div>
                            <DoorOpen className="h-8 w-8 text-orange-600" />
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Utilization</p>
                                <p className="text-2xl font-bold">{stats.utilization}%</p>
                            </div>
                            <Building className="h-8 w-8 text-purple-600" />
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search by room code or building..."
                            className="w-full rounded-md border border-input bg-background pl-10 pr-4 py-2 text-sm"
                        />
                    </div>
                    <button className="flex items-center gap-2 rounded-md border px-4 py-2 text-sm hover:bg-gray-50">
                        <Filter className="h-4 w-4" />
                        Filter
                    </button>
                </div>

                {/* Room Types */}
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-lg border bg-card p-6 hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-center gap-4">
                            <DoorOpen className="h-10 w-10 text-blue-600" />
                            <div>
                                <h3 className="font-semibold">Lecture Rooms</h3>
                                <p className="text-sm text-muted-foreground">{lectureRooms} rooms</p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card p-6 hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-center gap-4">
                            <DoorOpen className="h-10 w-10 text-green-600" />
                            <div>
                                <h3 className="font-semibold">Laboratories</h3>
                                <p className="text-sm text-muted-foreground">{labs} rooms</p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card p-6 hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-center gap-4">
                            <DoorOpen className="h-10 w-10 text-purple-600" />
                            <div>
                                <h3 className="font-semibold">Computer Labs</h3>
                                <p className="text-sm text-muted-foreground">{computerLabs} rooms</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Room List */}
                <div className="rounded-lg border bg-card">
                    <div className="p-6">
                        <h2 className="text-lg font-semibold mb-4">All Rooms</h2>

                        {rooms.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="border-b">
                                        <tr className="text-left text-sm text-muted-foreground">
                                            <th className="pb-3 font-medium">Room Code</th>
                                            <th className="pb-3 font-medium">Building</th>
                                            <th className="pb-3 font-medium">Floor</th>
                                            <th className="pb-3 font-medium">Type</th>
                                            <th className="pb-3 font-medium">Capacity</th>
                                            <th className="pb-3 font-medium">Status</th>
                                            <th className="pb-3 font-medium">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {rooms.map((room: any) => (
                                            <tr key={room.id} className="text-sm">
                                                <td className="py-3 font-medium">{room.code}</td>
                                                <td className="py-3">{room.building}</td>
                                                <td className="py-3">{room.floor}</td>
                                                <td className="py-3">
                                                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
                                                        {room.roomType.replace("_", " ")}
                                                    </span>
                                                </td>
                                                <td className="py-3">{room.capacity}</td>
                                                <td className="py-3">
                                                    {room.isAvailable ? (
                                                        <span className="inline-flex items-center gap-1 text-green-600">
                                                            <CheckCircle className="h-4 w-4" />
                                                            Available
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1 text-red-600">
                                                            <XCircle className="h-4 w-4" />
                                                            Maintenance
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="py-3">
                                                    <Link href={`/admin/schedule/rooms/${room.id}`} className="text-blue-600 hover:underline">
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
                                <DoorOpen className="mx-auto h-12 w-12 mb-4 opacity-50" />
                                <p className="text-lg font-medium">No rooms registered</p>
                                <p className="text-sm">Add rooms to start managing allocations</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createRoom } from "@/actions/schedule-rooms";
import { Loader2, Save, X } from "lucide-react";

export default function CreateRoomForm() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        code: "",
        name: "",
        building: "",
        floor: "",
        capacity: "",
        roomType: "LECTURE_ROOM",
        facilities: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!formData.code || !formData.name || !formData.building || !formData.floor || !formData.capacity) {
            setError("Please fill in all required fields");
            return;
        }

        startTransition(async () => {
            const result = await createRoom({
                code: formData.code,
                name: formData.name,
                building: formData.building,
                floor: parseInt(formData.floor),
                capacity: parseInt(formData.capacity),
                roomType: formData.roomType,
                facilities: formData.facilities,
            });

            if (result.success) {
                router.push("/admin/schedule/rooms");
                router.refresh();
            } else {
                setError(result.error || "Failed to create room");
            }
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="rounded-md bg-red-50 p-4 text-sm text-red-600">
                    {error}
                </div>
            )}

            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <label htmlFor="code" className="text-sm font-medium">
                        Room Code <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="code"
                        name="code"
                        value={formData.code}
                        onChange={handleChange}
                        placeholder="e.g. B101"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                        Room Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Computer Lab 1"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="building" className="text-sm font-medium">
                        Building <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="building"
                        name="building"
                        value={formData.building}
                        onChange={handleChange}
                        placeholder="e.g. Science Building"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="floor" className="text-sm font-medium">
                        Floor <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        id="floor"
                        name="floor"
                        value={formData.floor}
                        onChange={handleChange}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        required
                        min="1"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="capacity" className="text-sm font-medium">
                        Capacity <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        id="capacity"
                        name="capacity"
                        value={formData.capacity}
                        onChange={handleChange}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        required
                        min="1"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="roomType" className="text-sm font-medium">
                        Room Type <span className="text-red-500">*</span>
                    </label>
                    <select
                        id="roomType"
                        name="roomType"
                        value={formData.roomType}
                        onChange={handleChange}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        required
                    >
                        <option value="LECTURE_ROOM">Lecture Room</option>
                        <option value="LABORATORY">Laboratory</option>
                        <option value="COMPUTER_LAB">Computer Lab</option>
                        <option value="STUDIO">Studio</option>
                        <option value="SEMINAR_ROOM">Seminar Room</option>
                        <option value="AUDITORIUM">Auditorium</option>
                        <option value="SPORTS_FACILITY">Sports Facility</option>
                        <option value="OTHER">Other</option>
                    </select>
                </div>

                <div className="col-span-2 space-y-2">
                    <label htmlFor="facilities" className="text-sm font-medium">
                        Facilities (JSON)
                    </label>
                    <textarea
                        id="facilities"
                        name="facilities"
                        value={formData.facilities}
                        onChange={handleChange}
                        placeholder='{"projector": true, "computers": 40}'
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 min-h-[100px]"
                    />
                </div>
            </div>

            <div className="flex justify-end gap-4">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-50"
                    disabled={isPending}
                >
                    <X className="h-4 w-4" />
                    Cancel
                </button>
                <button
                    type="submit"
                    className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                    disabled={isPending}
                >
                    {isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <Save className="h-4 w-4" />
                    )}
                    Create Room
                </button>
            </div>
        </form>
    );
}

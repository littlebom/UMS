"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useState, useTransition } from "react";

interface TimetableFiltersProps {
    initialSearch: string;
    initialDay: string;
    viewMode: string;
}

const dayNames: { [key: string]: string } = {
    MON: "Monday",
    TUE: "Tuesday",
    WED: "Wednesday",
    THU: "Thursday",
    FRI: "Friday",
    SAT: "Saturday",
    SUN: "Sunday",
};

export default function TimetableFilters({
    initialSearch,
    initialDay,
    viewMode
}: TimetableFiltersProps) {
    const router = useRouter();
    const [search, setSearch] = useState(initialSearch);
    const [isPending, startTransition] = useTransition();

    const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const day = e.target.value;
        startTransition(() => {
            router.push(`/admin/schedule/timetable?view=${viewMode}&search=${search}&day=${day}`);
        });
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        startTransition(() => {
            router.push(`/admin/schedule/timetable?view=${viewMode}&search=${search}&day=${initialDay}`);
        });
    };

    return (
        <>
            <form onSubmit={handleSearchSubmit} className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Search by course or instructor..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-md border border-input bg-background pl-10 pr-4 py-2 text-sm"
                />
            </form>

            <select
                value={initialDay}
                onChange={handleDayChange}
                disabled={isPending}
                className="rounded-md border px-3 py-2 text-sm disabled:opacity-50"
            >
                <option value="ALL">All Days</option>
                {Object.entries(dayNames).map(([key, name]) => (
                    <option key={key} value={key}>{name}</option>
                ))}
            </select>
        </>
    );
}

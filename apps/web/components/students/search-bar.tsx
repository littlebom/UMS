"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { useState, useTransition, useEffect } from "react";

interface SearchBarProps {
    placeholder?: string;
}

export function SearchBar({ placeholder = "Search by name, student ID, or email..." }: SearchBarProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();
    const [searchValue, setSearchValue] = useState(searchParams.get("search") || "");

    useEffect(() => {
        setSearchValue(searchParams.get("search") || "");
    }, [searchParams]);

    const handleSearch = (value: string) => {
        setSearchValue(value);

        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set("search", value);
        } else {
            params.delete("search");
        }

        startTransition(() => {
            router.push(`?${params.toString()}`);
        });
    };

    const handleClear = () => {
        handleSearch("");
    };

    return (
        <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
                type="text"
                value={searchValue}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder={placeholder}
                className="w-full rounded-md border border-input bg-background pl-10 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {searchValue && (
                <button
                    onClick={handleClear}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                    <X className="h-4 w-4" />
                </button>
            )}
            {isPending && (
                <div className="absolute right-10 top-1/2 -translate-y-1/2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
                </div>
            )}
        </div>
    );
}

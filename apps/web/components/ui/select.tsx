"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming you have a utility for class merging, or I'll use simple string template

// Simple class merger if not available
function classNames(...classes: (string | undefined | null | false)[]) {
    return classes.filter(Boolean).join(" ");
}

export interface SelectOption {
    value: string;
    label: string;
    description?: string;
    status?: "success" | "warning" | "error" | "info" | "neutral";
}

interface SelectProps {
    label?: string;
    value: string;
    onChange: (value: string) => void;
    options: SelectOption[];
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    error?: string;
    className?: string;
    showDescriptionInValue?: boolean;
}

export function Select({
    label,
    value,
    onChange,
    options,
    placeholder = "Select an option",
    disabled = false,
    required = false,
    error,
    className,
    showDescriptionInValue = true,
}: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find((opt) => opt.value === value);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (optionValue: string) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    const getStatusColor = (status?: string) => {
        switch (status) {
            case "success": return "bg-green-400";
            case "warning": return "bg-yellow-400";
            case "error": return "bg-red-400";
            case "info": return "bg-blue-400";
            case "neutral": return "bg-gray-400";
            default: return null;
        }
    };

    return (
        <div className={classNames("relative", className)} ref={containerRef}>
            {label && (
                <label className="mb-1 block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}

            <button
                type="button"
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
                className={classNames(
                    "relative w-full cursor-default rounded-lg border bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm",
                    error ? "border-red-500 focus:ring-red-500" : "border-gray-300",
                    disabled ? "bg-gray-100 cursor-not-allowed opacity-50" : "hover:border-gray-400"
                )}
            >
                <span className="block truncate">
                    {selectedOption ? (
                        <span className="flex items-center gap-2">
                            {selectedOption.status && (
                                <span className={classNames("h-2 w-2 rounded-full", getStatusColor(selectedOption.status))} />
                            )}
                            <span className="font-medium text-gray-900">{selectedOption.label}</span>
                            {showDescriptionInValue && selectedOption.description && (
                                <span className="ml-2 truncate text-gray-500">{selectedOption.description}</span>
                            )}
                        </span>
                    ) : (
                        <span className="text-gray-500">{placeholder}</span>
                    )}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronDown className="h-4 w-4 text-gray-400" aria-hidden="true" />
                </span>
            </button>

            {isOpen && (
                <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {options.length === 0 ? (
                        <div className="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-500">
                            No options available
                        </div>
                    ) : (
                        options.map((option) => (
                            <div
                                key={option.value}
                                onClick={() => handleSelect(option.value)}
                                className={classNames(
                                    "relative cursor-default select-none py-2 pl-3 pr-9 hover:bg-blue-50 cursor-pointer",
                                    value === option.value ? "bg-blue-50" : "text-gray-900"
                                )}
                            >
                                <div className="flex items-center">
                                    {option.status && (
                                        <span className={classNames("mr-2 h-2 w-2 flex-shrink-0 rounded-full", getStatusColor(option.status))} />
                                    )}
                                    <span className={classNames("block truncate", value === option.value ? "font-semibold" : "font-normal")}>
                                        {option.label}
                                    </span>
                                    {option.description && (
                                        <span className="ml-2 truncate text-gray-500">
                                            - {option.description}
                                        </span>
                                    )}
                                </div>

                                {value === option.value && (
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600">
                                        <Check className="h-4 w-4" aria-hidden="true" />
                                    </span>
                                )}
                            </div>
                        ))
                    )}
                </div>
            )}
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
}

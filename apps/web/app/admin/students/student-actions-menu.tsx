"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MoreVertical, Eye, Trash2, Edit, Loader2 } from "lucide-react";
import { deleteStudent } from "@/actions/student";
import Link from "next/link";

interface StudentActionsMenuProps {
    studentId: string;
    studentName: string;
}

export default function StudentActionsMenu({ studentId, studentName }: StudentActionsMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [isOpen]);

    async function handleDelete() {
        const confirmed = confirm(
            `Are you sure you want to delete student "${studentName}" (${studentId})?\n\nThis will permanently delete:\n- Student record\n- User account\n- All enrollments\n\nThis action cannot be undone.`
        );

        if (!confirmed) return;

        setIsDeleting(true);
        setIsOpen(false);

        try {
            await deleteStudent(studentId);
            router.refresh();
        } catch (error: any) {
            alert(`Failed to delete student: ${error.message}`);
            setIsDeleting(false);
        }
    }

    return (
        <div className="relative" ref={menuRef}>
            {/* Menu Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                disabled={isDeleting}
                className="rounded p-1 hover:bg-gray-100 disabled:opacity-50"
                title="Actions"
            >
                {isDeleting ? (
                    <Loader2 className="h-5 w-5 animate-spin text-gray-600" />
                ) : (
                    <MoreVertical className="h-5 w-5 text-gray-600" />
                )}
            </button>

            {/* Dropdown Menu */}
            {isOpen && !isDeleting && (
                <div className="absolute right-0 z-50 mt-1 w-48 rounded-md border border-gray-200 bg-white shadow-lg">
                    <div className="py-1">
                        {/* View Details */}
                        <Link
                            href={`/admin/students/${studentId}`}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsOpen(false)}
                        >
                            <Eye className="h-4 w-4" />
                            View Details
                        </Link>

                        {/* Generate Student Card */}
                        <Link
                            href={`/admin/students/${studentId}/card`}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsOpen(false)}
                        >
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                                />
                            </svg>
                            Generate Student Card
                        </Link>

                        {/* Preview Card */}
                        <Link
                            href={`/student/card?id=${studentId}`}
                            target="_blank"
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsOpen(false)}
                        >
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                            </svg>
                            Preview Card
                        </Link>

                        {/* Edit */}
                        <Link
                            href={`/admin/students/${studentId}/edit`}
                            className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsOpen(false)}
                        >
                            <Edit className="h-4 w-4" />
                            Edit Student
                        </Link>

                        {/* Divider */}
                        <div className="my-1 border-t border-gray-200"></div>

                        {/* Delete */}
                        <button
                            onClick={handleDelete}
                            className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                            <Trash2 className="h-4 w-4" />
                            Delete Student
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

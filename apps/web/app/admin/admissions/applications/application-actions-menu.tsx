"use client";

import { Eye } from "lucide-react";
import Link from "next/link";

interface ApplicationActionsMenuProps {
    applicationId: string;
    applicantName: string;
    currentStatus: string;
}

export default function ApplicationActionsMenu({
    applicationId,
}: ApplicationActionsMenuProps) {
    return (
        <Link
            href={`/admin/admissions/${applicationId}`}
            className="flex items-center gap-1 font-medium text-blue-600 hover:underline"
        >
            <Eye className="h-4 w-4" />
            View Details
        </Link>
    );
}

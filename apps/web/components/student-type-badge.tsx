import { getStudentTypeColor, getStudentTypeLabel, type StudentType } from "@/lib/student-type";

interface StudentTypeBadgeProps {
    type: StudentType;
    showLabel?: "en" | "th" | "both";
    className?: string;
}

export default function StudentTypeBadge({
    type,
    showLabel = "en",
    className = ""
}: StudentTypeBadgeProps) {
    const colorClass = getStudentTypeColor(type);

    let label = "";
    if (showLabel === "en") {
        label = getStudentTypeLabel(type, "en");
    } else if (showLabel === "th") {
        label = getStudentTypeLabel(type, "th");
    } else {
        label = `${getStudentTypeLabel(type, "en")} (${getStudentTypeLabel(type, "th")})`;
    }

    return (
        <span
            className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${colorClass} ${className}`}
        >
            {label}
        </span>
    );
}

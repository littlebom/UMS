// Student Type utilities and constants

export const STUDENT_TYPE_LABELS = {
    REGULAR: { en: "Regular", th: "นักศึกษาปกติ" },
    EXCHANGE: { en: "Exchange", th: "นักศึกษาแลกเปลี่ยน" },
    SCHOLARSHIP: { en: "Scholarship", th: "นักศึกษาทุน" },
    SPECIAL: { en: "Special", th: "นักศึกษาพิเศษ" },
    TRANSFER: { en: "Transfer", th: "นักศึกษาโอนย้าย" },
    INTERNATIONAL: { en: "International", th: "นักศึกษานานาชาติ" },
} as const;

export const STUDENT_TYPE_COLORS = {
    REGULAR: "bg-blue-100 text-blue-800",
    EXCHANGE: "bg-purple-100 text-purple-800",
    SCHOLARSHIP: "bg-amber-100 text-amber-800",
    SPECIAL: "bg-pink-100 text-pink-800",
    TRANSFER: "bg-teal-100 text-teal-800",
    INTERNATIONAL: "bg-indigo-100 text-indigo-800",
} as const;

export type StudentType = keyof typeof STUDENT_TYPE_LABELS;

export function getStudentTypeLabel(type: StudentType, lang: "en" | "th" = "en"): string {
    return STUDENT_TYPE_LABELS[type]?.[lang] || type;
}

export function getStudentTypeColor(type: StudentType): string {
    return STUDENT_TYPE_COLORS[type] || "bg-gray-100 text-gray-800";
}

export function getStudentTypeDisplay(type: StudentType): string {
    const label = STUDENT_TYPE_LABELS[type];
    return label ? `${label.en} (${label.th})` : type;
}

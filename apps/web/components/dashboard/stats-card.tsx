import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface StatsCardProps {
    title: string;
    value: string | number;
    icon?: LucideIcon;
    trend?: string;
    trendUp?: boolean;
    color?: "blue" | "green" | "purple" | "orange" | "red" | "gray";
    description?: string;
}

const colorClasses = {
    blue: {
        icon: "text-blue-600",
        bg: "bg-blue-50",
        border: "border-blue-200",
    },
    green: {
        icon: "text-green-600",
        bg: "bg-green-50",
        border: "border-green-200",
    },
    purple: {
        icon: "text-purple-600",
        bg: "bg-purple-50",
        border: "border-purple-200",
    },
    orange: {
        icon: "text-orange-600",
        bg: "bg-orange-50",
        border: "border-orange-200",
    },
    red: {
        icon: "text-red-600",
        bg: "bg-red-50",
        border: "border-red-200",
    },
    gray: {
        icon: "text-gray-600",
        bg: "bg-gray-50",
        border: "border-gray-200",
    },
};

export function StatsCard({
    title,
    value,
    icon: Icon,
    trend,
    trendUp,
    color = "blue",
    description,
}: StatsCardProps) {
    const colors = colorClasses[color];

    return (
        <div className={`rounded-lg border ${colors.border} bg-card p-6 transition-all hover:shadow-md`}>
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">{title}</p>
                    <p className="text-2xl font-bold mt-2">{value}</p>
                    {description && (
                        <p className="text-xs text-muted-foreground mt-1">{description}</p>
                    )}
                    {trend && (
                        <p
                            className={`text-xs mt-2 ${trendUp ? "text-green-600" : "text-red-600"
                                }`}
                        >
                            {trend}
                        </p>
                    )}
                </div>
                {Icon && (
                    <div className={`rounded-full p-3 ${colors.bg}`}>
                        <Icon className={`h-6 w-6 ${colors.icon}`} />
                    </div>
                )}
            </div>
        </div>
    );
}

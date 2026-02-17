import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface Action {
    label: string;
    href?: string;
    onClick?: () => void;
    icon?: LucideIcon;
    variant?: "primary" | "secondary" | "outline";
}

interface QuickActionsProps {
    title?: string;
    actions: Action[];
}

export function QuickActions({ title = "Quick Actions", actions }: QuickActionsProps) {
    return (
        <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold mb-4">{title}</h3>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                {actions.map((action, index) => {
                    const buttonClass = `flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all ${action.variant === "primary"
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : action.variant === "secondary"
                                ? "bg-gray-100 text-gray-900 hover:bg-gray-200"
                                : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                        }`;

                    const content = (
                        <>
                            {action.icon && <action.icon className="h-4 w-4" />}
                            {action.label}
                        </>
                    );

                    if (action.href) {
                        return (
                            <Link key={index} href={action.href} className={buttonClass}>
                                {content}
                            </Link>
                        );
                    }

                    return (
                        <button key={index} onClick={action.onClick} className={buttonClass}>
                            {content}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

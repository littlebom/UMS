import { ReactNode } from "react";

interface ChartCardProps {
    title: string;
    description?: string;
    children: ReactNode;
}

export function ChartCard({ title, description, children }: ChartCardProps) {
    return (
        <div className="rounded-lg border bg-card p-6">
            <div className="mb-4">
                <h3 className="text-lg font-semibold">{title}</h3>
                {description && (
                    <p className="text-sm text-muted-foreground mt-1">{description}</p>
                )}
            </div>
            <div className="mt-4">{children}</div>
        </div>
    );
}

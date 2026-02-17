"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface StatusData {
    status: string;
    count: number;
    percentage: number;
    color: string;
}

interface StatusDistributionChartProps {
    data: StatusData[];
}

export function StatusDistributionChart({ data }: StatusDistributionChartProps) {
    return (
        <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data} layout="vertical" margin={{ left: 80, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" tick={{ fill: "#666", fontSize: 12 }} />
                <YAxis
                    type="category"
                    dataKey="status"
                    tick={{ fill: "#666", fontSize: 12 }}
                />
                <Tooltip
                    contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                    }}
                    formatter={(value: any, name: string, props: any) => [
                        `${value} students (${props.payload.percentage}%)`,
                        name,
                    ]}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}

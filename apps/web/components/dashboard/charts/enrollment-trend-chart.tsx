"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

interface EnrollmentData {
    month: string;
    students: number;
}

interface EnrollmentTrendChartProps {
    data: EnrollmentData[];
}

export function EnrollmentTrendChart({ data }: EnrollmentTrendChartProps) {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                    dataKey="month"
                    tick={{ fill: "#666", fontSize: 12 }}
                    stroke="#ccc"
                />
                <YAxis tick={{ fill: "#666", fontSize: 12 }} stroke="#ccc" />
                <Tooltip
                    contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                    }}
                />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="students"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: "#3b82f6", r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Students"
                />
            </LineChart>
        </ResponsiveContainer>
    );
}

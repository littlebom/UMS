import React from "react";

interface DataTableProps<T> {
    data: T[];
    columns: {
        header: string;
        accessorKey: keyof T | ((row: T) => React.ReactNode);
    }[];
    actions?: (row: T) => React.ReactNode;
}

export function DataTable<T extends { id: string }>({
    data,
    columns,
    actions,
}: DataTableProps<T>) {
    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="w-full divide-y divide-gray-200 bg-white text-sm">
                <thead className="bg-gray-50">
                    <tr>
                        {columns.map((col, idx) => (
                            <th
                                key={idx}
                                className="px-4 py-3 text-left font-medium text-gray-900"
                            >
                                {col.header}
                            </th>
                        ))}
                        {actions && <th className="px-4 py-3 text-right">Actions</th>}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {data.length === 0 ? (
                        <tr>
                            <td
                                colSpan={columns.length + (actions ? 1 : 0)}
                                className="px-4 py-8 text-center text-gray-500"
                            >
                                No data available
                            </td>
                        </tr>
                    ) : (
                        data.map((row) => (
                            <tr key={row.id} className="hover:bg-gray-50">
                                {columns.map((col, idx) => (
                                    <td key={idx} className="px-4 py-3 text-gray-700">
                                        {typeof col.accessorKey === "function"
                                            ? col.accessorKey(row)
                                            : (row[col.accessorKey] as React.ReactNode)}
                                    </td>
                                ))}
                                {actions && (
                                    <td className="px-4 py-3 text-right">{actions(row)}</td>
                                )}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

"use client";

import { getDepartments, deleteDepartment } from "@/actions/department";
import { DataTable, Button } from "@ums/ui";
import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { DeleteButton } from "@/components/delete-button";
import { useEffect, useState } from "react";

export default function DepartmentsPage() {
    const [departments, setDepartments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDepartments();
    }, []);

    async function loadDepartments() {
        const data = await getDepartments();
        setDepartments(data);
        setLoading(false);
    }

    if (loading) {
        return (
            <div className="container mx-auto py-10">
                <div className="text-center">Loading...</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-10">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold">Department Management</h1>
                <Link href="/admin/academic/program/departments/create">
                    <Button className="bg-blue-600 text-white hover:bg-blue-700 px-5 py-2.5 gap-2">
                        <Plus className="h-4 w-4" />
                        Add Department
                    </Button>
                </Link>
            </div>

            <DataTable
                data={departments}
                columns={[
                    {
                        header: "Faculty",
                        accessorKey: (row: any) => `${row.faculty.code} - ${row.faculty.nameEn}`
                    },
                    { header: "Name (TH)", accessorKey: "nameTh" },
                    { header: "Name (EN)", accessorKey: "nameEn" },
                    { header: "Description", accessorKey: "description" },
                ]}
                actions={(row) => (
                    <div className="flex items-center gap-2">
                        <Link href={`/admin/academic/program/departments/${row.id}/edit`}>
                            <Button className="h-8 w-8 p-0 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 flex items-center justify-center">
                                <Pencil className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                            </Button>
                        </Link>
                        <DeleteButton
                            itemName={row.nameEn}
                            onDelete={async () => {
                                await deleteDepartment(row.id);
                                await loadDepartments();
                            }}
                            size="sm"
                        />
                    </div>
                )}
            />
        </div>
    );
}

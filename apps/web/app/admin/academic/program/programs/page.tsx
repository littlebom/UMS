"use client";

import { getPrograms, deleteProgram } from "@/actions/program";
import { DataTable, Button } from "@ums/ui";
import Link from "next/link";
import { Plus, Pencil, Eye } from "lucide-react";
import { DeleteButton } from "@/components/delete-button";
import { useEffect, useState } from "react";

export default function ProgramsPage() {
    const [programs, setPrograms] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPrograms();
    }, []);

    async function loadPrograms() {
        const data = await getPrograms();
        setPrograms(data);
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
                <h1 className="text-2xl font-bold">Program Management</h1>
                <Link href="/admin/academic/program/programs/create">
                    <Button className="bg-blue-600 text-white hover:bg-blue-700 px-5 py-2.5 gap-2">
                        <Plus className="h-4 w-4" />
                        Add Program
                    </Button>
                </Link>
            </div>

            <DataTable
                data={programs}
                columns={[
                    { header: "Faculty", accessorKey: (row: any) => row.faculty.code },
                    { header: "Department", accessorKey: (row: any) => row.department.nameEn },
                    { header: "Level", accessorKey: "degreeLevel" },
                    { header: "Name (TH)", accessorKey: "nameTh" },
                    { header: "Name (EN)", accessorKey: "nameEn" },
                ]}
                actions={(row) => (
                    <div className="flex items-center gap-2">
                        <Link href={`/curriculum/${row.id}`} target="_blank">
                            <Button className="h-8 w-8 p-0 bg-white text-blue-600 border border-blue-300 hover:bg-blue-50 flex items-center justify-center">
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">Preview</span>
                            </Button>
                        </Link>
                        <Link href={`/admin/academic/program/programs/${row.id}/edit`}>
                            <Button className="h-8 w-8 p-0 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 flex items-center justify-center">
                                <Pencil className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                            </Button>
                        </Link>
                        <DeleteButton
                            itemName={row.nameEn}
                            onDelete={async () => {
                                await deleteProgram(row.id);
                                await loadPrograms();
                            }}
                            size="sm"
                        />
                    </div>
                )}
            />
        </div>
    );
}

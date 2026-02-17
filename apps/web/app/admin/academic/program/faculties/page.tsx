"use client";

import { getFaculties, deleteFaculty } from "@/actions/faculty";
import { DataTable, Button } from "@ums/ui";
import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { DeleteButton } from "@/components/delete-button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function FacultiesPage() {
    const [faculties, setFaculties] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        loadFaculties();
    }, []);

    async function loadFaculties() {
        const data = await getFaculties();
        setFaculties(data);
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
                <h1 className="text-2xl font-bold">Faculty Management</h1>
                <Link href="/admin/academic/program/faculties/create">
                    <Button className="bg-blue-600 text-white hover:bg-blue-700 px-5 py-2.5 gap-2">
                        <Plus className="h-4 w-4" />
                        Add Faculty
                    </Button>
                </Link>
            </div>

            <DataTable
                data={faculties}
                columns={[
                    {
                        header: "Logo",
                        accessorKey: (row: any) => row.logoUrl ? (
                            <img
                                src={row.logoUrl}
                                alt={row.nameEn}
                                className="h-10 w-10 object-contain rounded"
                            />
                        ) : (
                            <div className="h-10 w-10 bg-gray-100 rounded flex items-center justify-center">
                                <span className="text-xs text-gray-400">-</span>
                            </div>
                        )
                    },
                    { header: "Code", accessorKey: "code" },
                    { header: "Name (TH)", accessorKey: "nameTh" },
                    { header: "Name (EN)", accessorKey: "nameEn" },
                    { header: "Description", accessorKey: "description" },
                ]}
                actions={(row) => (
                    <div className="flex items-center gap-2">
                        <Link href={`/admin/academic/program/faculties/${row.id}/edit`}>
                            <Button className="h-8 w-8 p-0 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 flex items-center justify-center">
                                <Pencil className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                            </Button>
                        </Link>
                        <DeleteButton
                            itemName={row.nameEn}
                            onDelete={async () => {
                                await deleteFaculty(row.id);
                                await loadFaculties();
                            }}
                            size="sm"
                        />
                    </div >
                )}
            />
        </div >
    );
}

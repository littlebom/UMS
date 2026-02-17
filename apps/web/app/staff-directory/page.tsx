import { getAllStaff } from "@/actions/staff-directory";
import { prisma } from "@ums/lib";
import { StaffDirectoryClient } from "./staff-directory-client";

export default async function StaffDirectoryPage() {
    const staff = await getAllStaff();
    const departments = await prisma.department.findMany({
        orderBy: { nameEn: "asc" },
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-900 to-cyan-900 text-white py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold">Staff Directory</h1>
                    <p className="mt-2 text-blue-200">
                        Connect with our administrative and support staff
                    </p>
                    <div className="mt-4 flex items-center gap-6 text-sm">
                        <div>
                            <span className="text-3xl font-bold">{staff.length}</span>
                            <p className="text-blue-200">Staff Members</p>
                        </div>
                        <div>
                            <span className="text-3xl font-bold">{departments.length}</span>
                            <p className="text-blue-200">Departments</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <StaffDirectoryClient staff={staff} departments={departments} />
            </div>
        </div>
    );
}

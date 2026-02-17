import { Receipt, Plus, Search, Edit } from "lucide-react";
import Link from "next/link";

export default function FeeStructurePage() {
    return (
        <div className="flex h-full flex-col">
            <div className="flex-1 space-y-6 p-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Fee Structure</h1>
                        <p className="text-muted-foreground">
                            Configure tuition fees and other charges
                        </p>
                    </div>
                    <Link href="/admin/finance/fees/create">
                        <button className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
                            <Plus className="h-4 w-4" />
                            Add Fee Type
                        </button>
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-lg border bg-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Fee Types</p>
                                <p className="text-2xl font-bold">0</p>
                            </div>
                            <Receipt className="h-8 w-8 text-blue-600" />
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Programs</p>
                                <p className="text-2xl font-bold">0</p>
                            </div>
                            <Receipt className="h-8 w-8 text-green-600" />
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Active Rates</p>
                                <p className="text-2xl font-bold">0</p>
                            </div>
                            <Receipt className="h-8 w-8 text-purple-600" />
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search fee types..."
                            className="w-full rounded-md border border-input bg-background pl-10 pr-4 py-2 text-sm"
                        />
                    </div>
                </div>

                {/* Empty State */}
                <div className="rounded-lg border bg-card">
                    <div className="p-6">
                        <div className="text-center py-12 text-muted-foreground">
                            <Receipt className="mx-auto h-12 w-12 mb-4 opacity-50" />
                            <p className="text-lg font-medium">No fee structures defined</p>
                            <p className="text-sm">Set up tuition and other fees for your programs</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

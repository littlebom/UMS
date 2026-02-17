"use client";

import { generateInvoicesForTerm } from "@/actions/finance";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Select, SelectOption } from "@/components/ui/select";

interface Term {
    id: string;
    year: number;
    semester: number;
}

export function GenerateInvoiceForm({ terms }: { terms: Term[] }) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedTerm, setSelectedTerm] = useState("");

    async function handleSubmit(formData: FormData) {
        setIsSubmitting(true);
        setError(null);

        try {
            const termId = formData.get("termId") as string;
            const tuitionFee = parseFloat(formData.get("tuitionFee") as string);

            if (!termId || !tuitionFee) {
                throw new Error("Please fill in all fields");
            }

            await generateInvoicesForTerm(termId, tuitionFee);
            alert("Invoices generated successfully!");
            router.push("/admin/finance/invoices");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to generate invoices");
            setIsSubmitting(false);
        }
    }

    const termOptions: SelectOption[] = terms.map((term) => ({
        value: term.id,
        label: `${term.year}/${term.semester}`,
        status: "info",
    }));

    return (
        <form action={handleSubmit} className="space-y-6">
            {error && (
                <div className="rounded-lg bg-red-50 p-4 text-sm text-red-800">
                    {error}
                </div>
            )}

            <div>
                <Select
                    label="Academic Term"
                    value={selectedTerm}
                    onChange={(val) => setSelectedTerm(val)}
                    options={termOptions}
                    required
                />
                <input type="hidden" name="termId" value={selectedTerm} />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    Tuition Fee (฿)
                </label>
                <input
                    type="number"
                    name="tuitionFee"
                    required
                    min="0"
                    step="0.01"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                    placeholder="50000.00"
                />
            </div>

            <div className="flex gap-4">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:bg-gray-400"
                >
                    {isSubmitting ? "Generating..." : "Generate Invoices"}
                </button>
            </div>
        </form>
    );
}

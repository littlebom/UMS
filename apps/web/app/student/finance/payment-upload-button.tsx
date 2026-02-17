"use client";

import { submitPayment } from "@/actions/finance";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload } from "lucide-react";

export function PaymentUploadButton({
    invoiceId,
    amount
}: {
    invoiceId: string;
    amount: number;
}) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [slipUrl, setSlipUrl] = useState("");
    const [paymentAmount, setPaymentAmount] = useState(amount.toString());

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!slipUrl) {
            alert("Please enter slip URL");
            return;
        }

        setIsSubmitting(true);
        try {
            await submitPayment(invoiceId, parseFloat(paymentAmount), slipUrl);
            alert("Payment submitted successfully! Waiting for verification.");
            setIsOpen(false);
            router.refresh();
        } catch (error) {
            alert("Failed to submit payment: " + (error as Error).message);
            setIsSubmitting(false);
        }
    }

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
            >
                <Upload className="mr-2 inline-block h-4 w-4" />
                Upload Payment Slip
            </button>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
            <h4 className="font-medium text-gray-900">Submit Payment</h4>

            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Amount (฿)
                </label>
                <input
                    type="number"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    step="0.01"
                    min="0"
                    max={amount}
                    required
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                />
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Payment Slip URL
                </label>
                <input
                    type="url"
                    value={slipUrl}
                    onChange={(e) => setSlipUrl(e.target.value)}
                    placeholder="https://example.com/slip.jpg"
                    required
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                />
                <p className="mt-1 text-xs text-gray-500">
                    Upload your slip to an image hosting service and paste the URL here
                </p>
            </div>

            <div className="flex gap-2">
                <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:bg-gray-400"
                >
                    {isSubmitting ? "Submitting..." : "Submit Payment"}
                </button>
            </div>
        </form>
    );
}

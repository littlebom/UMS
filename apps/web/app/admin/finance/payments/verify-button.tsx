"use client";

import { verifyPayment } from "@/actions/finance";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";

export function VerifyPaymentButton({ paymentId }: { paymentId: string }) {
    const router = useRouter();
    const [isVerifying, setIsVerifying] = useState(false);

    async function handleVerify() {
        if (!confirm("Are you sure you want to verify this payment?")) {
            return;
        }

        setIsVerifying(true);
        try {
            await verifyPayment(paymentId);
            alert("Payment verified successfully!");
            router.refresh();
        } catch (error) {
            alert("Failed to verify payment: " + (error as Error).message);
            setIsVerifying(false);
        }
    }

    return (
        <button
            onClick={handleVerify}
            disabled={isVerifying}
            className="inline-flex items-center rounded-lg bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700 disabled:bg-gray-400"
        >
            <Check className="mr-1 h-4 w-4" />
            {isVerifying ? "Verifying..." : "Verify"}
        </button>
    );
}

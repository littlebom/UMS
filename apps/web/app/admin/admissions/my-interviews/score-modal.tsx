"use client";

import { useState } from "react";
import { submitInterviewResult } from "@/actions/interview";
import { X, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ScoreModal({ interview, onClose }: { interview: any; onClose: () => void }) {
    const router = useRouter();
    const [score, setScore] = useState(interview.score?.toString() || "");
    const [isPassed, setIsPassed] = useState(interview.isPassed ?? true);
    const [comments, setComments] = useState(interview.comments || "");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        // Validation
        const scoreNum = Number(score);
        if (isNaN(scoreNum) || scoreNum < 0 || scoreNum > 100) {
            setError("Score must be a number between 0 and 100");
            setIsLoading(false);
            return;
        }

        try {
            await submitInterviewResult({
                applicationId: interview.applicationId,
                score: scoreNum,
                comments: comments.trim() || "",
                isPassed: isPassed,
            });

            // Success - close modal and refresh
            onClose();
            router.refresh();
        } catch (err: any) {
            setError(err.message || "Failed to submit score");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                {/* Header */}
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">Score Interview</h2>
                    <button
                        onClick={onClose}
                        className="rounded-full p-1 hover:bg-gray-100"
                        type="button"
                    >
                        <X className="h-5 w-5 text-gray-500" />
                    </button>
                </div>

                {/* Applicant Info */}
                <div className="mb-6 rounded-lg bg-gray-50 p-4">
                    <p className="font-medium text-gray-900">
                        {interview.application.applicant.firstName}{" "}
                        {interview.application.applicant.lastName}
                    </p>
                    <p className="text-sm text-gray-600">
                        {interview.application.program.nameEn}
                    </p>
                    <p className="text-xs text-gray-500">
                        {interview.application.applicant.user.email}
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Score */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Score (0-100) <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            step="0.01"
                            value={score}
                            onChange={(e) => setScore(e.target.value)}
                            required
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="Enter score (e.g., 85)"
                        />
                    </div>

                    {/* Pass/Fail */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Result <span className="text-red-500">*</span>
                        </label>
                        <div className="flex gap-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    checked={isPassed === true}
                                    onChange={() => setIsPassed(true)}
                                    className="mr-2 h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-700">Pass</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    checked={isPassed === false}
                                    onChange={() => setIsPassed(false)}
                                    className="mr-2 h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-700">Fail</span>
                            </label>
                        </div>
                    </div>

                    {/* Comments */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Comments & Feedback
                        </label>
                        <textarea
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                            rows={4}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="Enter your feedback, observations, and recommendations..."
                        />
                        <p className="mt-1 text-xs text-gray-500">
                            Provide detailed feedback to help with the admission decision.
                        </p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="flex items-center gap-2 rounded-md bg-red-50 p-3 text-sm text-red-800">
                            <AlertCircle className="h-4 w-4" />
                            {error}
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            {isLoading ? "Submitting..." : "Submit Score"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

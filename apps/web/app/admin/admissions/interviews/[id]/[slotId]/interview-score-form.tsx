"use client";

import { useState } from "react";
import { updateInterviewScore } from "@/actions/interview";
import { useRouter } from "next/navigation";
import { CheckCircle, XCircle } from "lucide-react";

interface InterviewScoreFormProps {
    interviewResultId: string;
    currentScore: number | null;
    currentComments: string | null;
    currentIsPassed: boolean | null;
}

export default function InterviewScoreForm({
    interviewResultId,
    currentScore,
    currentComments,
    currentIsPassed
}: InterviewScoreFormProps) {
    const router = useRouter();
    const [score, setScore] = useState(currentScore?.toString() || "");
    const [comments, setComments] = useState(currentComments || "");
    const [isPassed, setIsPassed] = useState(currentIsPassed ?? true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!score || isNaN(Number(score))) {
            alert("Please enter a valid score");
            return;
        }

        const scoreNum = Number(score);
        if (scoreNum < 0 || scoreNum > 100) {
            alert("Score must be between 0 and 100");
            return;
        }

        setIsSubmitting(true);
        try {
            await updateInterviewScore(interviewResultId, {
                score: scoreNum,
                comments: comments || undefined,
                isPassed
            });
            alert("Score saved successfully!");
            router.refresh();
        } catch (error) {
            alert("Failed to save score. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4 rounded-lg bg-gray-50 p-4">
            <div className="grid gap-4 md:grid-cols-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Score (0-100)
                    </label>
                    <input
                        type="number"
                        min="0"
                        max="100"
                        value={score}
                        onChange={(e) => setScore(e.target.value)}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Enter score"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Result
                    </label>
                    <div className="mt-1 flex gap-2">
                        <button
                            type="button"
                            onClick={() => setIsPassed(true)}
                            className={`flex-1 rounded-md border px-3 py-2 text-sm font-medium transition-colors ${isPassed
                                    ? "border-green-600 bg-green-600 text-white"
                                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                                }`}
                        >
                            <CheckCircle className="inline h-4 w-4 mr-1" />
                            Pass
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsPassed(false)}
                            className={`flex-1 rounded-md border px-3 py-2 text-sm font-medium transition-colors ${!isPassed
                                    ? "border-red-600 bg-red-600 text-white"
                                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                                }`}
                        >
                            <XCircle className="inline h-4 w-4 mr-1" />
                            Fail
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                    Comments (Optional)
                </label>
                <textarea
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    rows={3}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter feedback or comments..."
                />
            </div>
            <div className="mt-4 flex justify-end">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                >
                    {isSubmitting ? "Saving..." : currentScore !== null ? "Update Score" : "Save Score"}
                </button>
            </div>
        </form>
    );
}

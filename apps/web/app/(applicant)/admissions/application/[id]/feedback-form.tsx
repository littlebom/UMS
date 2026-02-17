"use client";

import { useState } from "react";
import { submitInterviewFeedback } from "@/actions/applicant-interview";
import { Star, Loader2 } from "lucide-react";

interface FeedbackFormProps {
    applicationId: string;
}

export default function FeedbackForm({ applicationId }: FeedbackFormProps) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (rating === 0) {
            setError("Please select a rating");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await submitInterviewFeedback(applicationId, rating, comment);
            setSubmitted(true);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    if (submitted) {
        return (
            <div className="mt-8 rounded-lg border border-green-200 bg-green-50 p-6 text-center">
                <h3 className="text-lg font-medium text-green-900">Thank you for your feedback!</h3>
                <p className="mt-2 text-green-700">We appreciate your input to help us improve our interview process.</p>
            </div>
        );
    }

    return (
        <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900">Interview Feedback</h3>
            <p className="mt-1 text-sm text-gray-500">
                How was your interview experience? Your feedback is anonymous and will not affect your result.
            </p>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Rating</label>
                    <div className="mt-1 flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                className="focus:outline-none"
                            >
                                <Star
                                    className={`h-8 w-8 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                        }`}
                                />
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                        Comments (Optional)
                    </label>
                    <textarea
                        id="comment"
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="Share your experience..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400"
                >
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Submit Feedback
                </button>
            </form>
        </div>
    );
}

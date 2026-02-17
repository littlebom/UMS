"use client";

import { useState, useTransition } from "react";
import { approveLeaveRequest, rejectLeaveRequest } from "@/actions/leave-requests";
import { Calendar, User, FileText, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { format, differenceInDays } from "date-fns";

interface LeaveRequestCardProps {
    request: any;
}

export function LeaveRequestCard({ request }: LeaveRequestCardProps) {
    const [isPending, startTransition] = useTransition();
    const [showApproveDialog, setShowApproveDialog] = useState(false);
    const [showRejectDialog, setShowRejectDialog] = useState(false);
    const [approveNote, setApproveNote] = useState("");
    const [rejectNote, setRejectNote] = useState("");

    const duration = differenceInDays(new Date(request.endDate), new Date(request.startDate)) + 1;

    const handleApprove = () => {
        startTransition(async () => {
            // TODO: Get current user ID
            const reviewerId = "temp-admin-id"; // Replace with actual user ID
            const result = await approveLeaveRequest(request.id, reviewerId, approveNote);

            if (result.success) {
                setShowApproveDialog(false);
                setApproveNote("");
            } else {
                alert(result.error);
            }
        });
    };

    const handleReject = () => {
        if (!rejectNote.trim()) {
            alert("Please provide a reason for rejection");
            return;
        }

        startTransition(async () => {
            //TODO: Get current user ID
            const reviewerId = "temp-admin-id"; // Replace with actual user ID
            const result = await rejectLeaveRequest(request.id, reviewerId, rejectNote);

            if (result.success) {
                setShowRejectDialog(false);
                setRejectNote("");
            } else {
                alert(result.error);
            }
        });
    };

    const statusColors = {
        PENDING: "bg-orange-100 text-orange-800",
        APPROVED: "bg-green-100 text-green-800",
        REJECTED: "bg-red-100 text-red-800",
    };

    const status = request.status as "PENDING" | "APPROVED" | "REJECTED";

    return (
        <>
            <div className="rounded-lg border bg-card p-6">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                        {/* Student Info */}
                        <div className="flex items-center gap-3">
                            <User className="h-5 w-5 text-blue-600" />
                            <div>
                                <p className="font-semibold">
                                    {request.student.firstName} {request.student.lastName}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {request.student.studentId} | {request.student.program?.nameEn} | {request.student.program?.faculty?.nameEn}
                                </p>
                            </div>
                        </div>

                        {/* Dates */}
                        <div className="flex items-center gap-3">
                            <Calendar className="h-5 w-5 text-gray-600" />
                            <p className="text-sm">
                                <span className="font-medium">
                                    {format(new Date(request.startDate), "MMM d, yyyy")}
                                </span>
                                {" - "}
                                <span className="font-medium">
                                    {format(new Date(request.endDate), "MMM d, yyyy")}
                                </span>
                                <span className="text-muted-foreground ml-2">({duration} days)</span>
                            </p>
                        </div>

                        {/* Reason */}
                        <div className="flex items-start gap-3">
                            <FileText className="h-5 w-5 text-gray-600 mt-0.5" />
                            <div className="flex-1">
                                <p className="text-sm font-medium">Reason:</p>
                                <p className="text-sm text-muted-foreground mt-1">{request.reason}</p>
                            </div>
                        </div>

                        {/* Review Info (if reviewed) */}
                        {request.status !== "PENDING" && request.reviewedAt && (
                            <div className="flex items-start gap-3 pt-2 border-t">
                                <AlertCircle className="h-5 w-5 text-gray-600 mt-0.5" />
                                <div className="flex-1">
                                    <p className="text-sm">
                                        <span className="font-medium">Reviewed by:</span>{" "}
                                        {request.reviewer ? `${request.reviewer.firstName} ${request.reviewer.lastName}` : "Unknown"}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {format(new Date(request.reviewedAt), "MMM d, yyyy 'at' HH:mm")}
                                    </p>
                                    {request.reviewNote && (
                                        <p className="text-sm text-muted-foreground mt-1">
                                            <span className="font-medium">Note:</span> {request.reviewNote}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Status & Actions */}
                    <div className="flex flex-col items-end gap-3">
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${statusColors[status]}`}>
                            {request.status}
                        </span>

                        {request.status === "PENDING" && (
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setShowApproveDialog(true)}
                                    disabled={isPending}
                                    className="inline-flex items-center gap-1 rounded-md bg-green-600 px-3 py-2 text-sm text-white hover:bg-green-700 disabled:opacity-50"
                                >
                                    <CheckCircle className="h-4 w-4" />
                                    Approve
                                </button>
                                <button
                                    onClick={() => setShowRejectDialog(true)}
                                    disabled={isPending}
                                    className="inline-flex items-center gap-1 rounded-md bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700 disabled:opacity-50"
                                >
                                    <XCircle className="h-4 w-4" />
                                    Reject
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Approve Dialog */}
            {showApproveDialog && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                        <h3 className="text-lg font-semibold mb-4">Approve Leave Request</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            This will approve the leave request for {request.student.firstName} {request.student.lastName} and change their status to ON_LEAVE.
                        </p>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Note (Optional)
                                </label>
                                <textarea
                                    value={approveNote}
                                    onChange={(e) => setApproveNote(e.target.value)}
                                    className="w-full rounded-md border border-input px-3 py-2 text-sm"
                                    rows={3}
                                    placeholder="Add any notes for approval..."
                                />
                            </div>
                            <div className="flex gap-3 justify-end">
                                <button
                                    onClick={() => setShowApproveDialog(false)}
                                    className="rounded-md border px-4 py-2 text-sm hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleApprove}
                                    disabled={isPending}
                                    className="rounded-md bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700 disabled:opacity-50"
                                >
                                    {isPending ? "Approving..." : "Approve"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Reject Dialog */}
            {showRejectDialog && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                        <h3 className="text-lg font-semibold mb-4">Reject Leave Request</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            This will reject the leave request for {request.student.firstName} {request.student.lastName}.
                        </p>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Reason for Rejection <span className="text-red-600">*</span>
                                </label>
                                <textarea
                                    value={rejectNote}
                                    onChange={(e) => setRejectNote(e.target.value)}
                                    className="w-full rounded-md border border-input px-3 py-2 text-sm"
                                    rows={3}
                                    placeholder="Please provide a reason for rejection..."
                                    required
                                />
                            </div>
                            <div className="flex gap-3 justify-end">
                                <button
                                    onClick={() => setShowRejectDialog(false)}
                                    className="rounded-md border px-4 py-2 text-sm hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleReject}
                                    disabled={isPending || !rejectNote.trim()}
                                    className="rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 disabled:opacity-50"
                                >
                                    {isPending ? "Rejecting..." : "Reject"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

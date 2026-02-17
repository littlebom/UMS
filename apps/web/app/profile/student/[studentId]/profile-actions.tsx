"use client";

import { Printer, Share2 } from "lucide-react";

interface ProfileActionsProps {
    profileUrl: string;
    studentName: string;
}

export function ProfileActions({ profileUrl, studentName }: ProfileActionsProps) {
    const handlePrint = () => {
        window.print();
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    url: profileUrl,
                    title: `${studentName} - Student Profile`,
                });
            } catch (error) {
                // User cancelled or share failed
                console.log("Share cancelled");
            }
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(profileUrl);
            alert("Profile URL copied to clipboard!");
        }
    };

    return (
        <div className="flex gap-2">
            <button
                onClick={handlePrint}
                className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 hover:bg-white/20 transition"
            >
                <Printer className="h-4 w-4" />
                Print
            </button>
            <button
                onClick={handleShare}
                className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 hover:bg-white/20 transition"
            >
                <Share2 className="h-4 w-4" />
                Share
            </button>
        </div>
    );
}

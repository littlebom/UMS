"use client";

import { useState, useRef } from "react";
import { Camera, Upload, X } from "lucide-react";
import Image from "next/image";
import { uploadStudentPhoto } from "@/actions/upload";
import { useRouter } from "next/navigation";

interface PhotoUploadProps {
    studentId: string;
    currentPhotoUrl?: string | null;
}

export default function PhotoUpload({ studentId, currentPhotoUrl }: PhotoUploadProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [isCameraMode, setIsCameraMode] = useState(false);
    const router = useRouter();

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "user" },
            });
            setStream(mediaStream);
            setIsCameraMode(true);
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
        } catch (error) {
            alert("Cannot access camera. Please check permissions.");
        }
    };

    const capturePhoto = () => {
        if (videoRef.current) {
            const canvas = document.createElement("canvas");
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.drawImage(videoRef.current, 0, 0);
                const dataUrl = canvas.toDataURL("image/jpeg");
                setPreview(dataUrl);
                stopCamera();
            }
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach((track) => track.stop());
            setStream(null);
            setIsCameraMode(false);
        }
    };

    const handleUpload = async () => {
        if (!preview) return;

        setIsUploading(true);
        try {
            const result = await uploadStudentPhoto(studentId, preview);
            if (result.success) {
                setIsOpen(false);
                setPreview(null);
                router.refresh();
            } else {
                alert(`Failed to upload photo: ${result.error}`);
            }
        } catch (error) {
            alert("Failed to upload photo");
        } finally {
            setIsUploading(false);
        }
    };

    const handleClose = () => {
        stopCamera();
        setIsOpen(false);
        setPreview(null);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 print:hidden"
            >
                <Camera className="h-4 w-4" />
                Update Photo
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 print:hidden">
                    <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                        <button
                            onClick={handleClose}
                            className="absolute right-4 top-4 rounded-full p-1 hover:bg-gray-100"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        <h2 className="mb-4 text-xl font-bold">Update Student Photo</h2>

                        {!preview && !isCameraMode && (
                            <div className="space-y-4">
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="flex w-full items-center justify-center gap-2 rounded-md border-2 border-dashed border-gray-300 p-8 hover:border-blue-500 hover:bg-blue-50"
                                >
                                    <Upload className="h-6 w-6" />
                                    <span>Upload from device</span>
                                </button>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileSelect}
                                    className="hidden"
                                />

                                <button
                                    onClick={startCamera}
                                    className="flex w-full items-center justify-center gap-2 rounded-md border-2 border-dashed border-gray-300 p-8 hover:border-green-500 hover:bg-green-50"
                                >
                                    <Camera className="h-6 w-6" />
                                    <span>Take photo with camera</span>
                                </button>
                            </div>
                        )}

                        {isCameraMode && (
                            <div className="space-y-4">
                                <video
                                    ref={videoRef}
                                    autoPlay
                                    playsInline
                                    className="w-full rounded-lg"
                                />
                                <div className="flex gap-2">
                                    <button
                                        onClick={capturePhoto}
                                        className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                                    >
                                        Capture
                                    </button>
                                    <button
                                        onClick={stopCamera}
                                        className="rounded-md bg-gray-300 px-4 py-2 hover:bg-gray-400"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}

                        {preview && (
                            <div className="space-y-4">
                                <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                                    <Image
                                        src={preview}
                                        alt="Preview"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleUpload}
                                        disabled={isUploading}
                                        className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        {isUploading ? "Uploading..." : "Save Photo"}
                                    </button>
                                    <button
                                        onClick={() => setPreview(null)}
                                        className="rounded-md bg-gray-300 px-4 py-2 hover:bg-gray-400"
                                    >
                                        Retake
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

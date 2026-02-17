"use client";

import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";

interface QRCodeProps {
    value: string;
    size?: number;
    logoUrl?: string;
}

export function QRCode({ value, size = 200, logoUrl }: QRCodeProps) {
    const ref = useRef<HTMLDivElement>(null);
    const qrCodeRef = useRef<QRCodeStyling | null>(null);

    useEffect(() => {
        if (!ref.current) return;

        // Create QR code instance
        qrCodeRef.current = new QRCodeStyling({
            width: size,
            height: size,
            data: value,
            margin: 5,
            qrOptions: {
                typeNumber: 0,
                mode: "Byte",
                errorCorrectionLevel: "H",
            },
            imageOptions: {
                hideBackgroundDots: true,
                imageSize: 0.4,
                margin: 5,
            },
            dotsOptions: {
                color: "#033675",
                type: "rounded",
            },
            backgroundOptions: {
                color: "#ffffff",
            },
            cornersSquareOptions: {
                color: "#033675",
                type: "extra-rounded",
            },
            cornersDotOptions: {
                color: "#03ccba",
                type: "dot",
            },
            image: logoUrl,
        });

        // Clear previous QR code
        ref.current.innerHTML = "";

        // Append new QR code
        qrCodeRef.current.append(ref.current);
    }, [value, size, logoUrl]);

    return <div ref={ref} className="flex justify-center" />;
}

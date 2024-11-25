"use client";

import { createSolanaQR, encodeURL } from "@solana/actions";
import { useEffect, useRef, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

interface SolanaQRCodeProps {
  url: string | URL;
  className?: string;
  background?: string;
  color?: string;
  size?: number;
}

export function SolanaQRCode({
  url,
  className,
  background = "transparent",
  color,
  size = 400,
}: SolanaQRCodeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    try {
      const encodedUrl = encodeURL(
        {
          link: new URL(url, window.location.href),
        },
        "solana:"
      );

      console.log("encodedUrl:", encodedUrl.toString());

      const qr = createSolanaQR(encodedUrl, size, background, color);

      if (ref.current) {
        ref.current.innerHTML = '';
        qr.append(ref.current);
      }
    } catch (err) {
      console.error("Error creating Solana QR code:", err);
      setError("Failed to generate QR code. Please check the provided URL.");
    } finally {
      setIsLoading(false);
    }
  }, [url, size, background, color]);

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      {isLoading && <Skeleton className={`w-${size} h-${size}`} />}
      <div ref={ref} className={className} style={{ display: isLoading ? 'none' : 'block' }} />
    </>
  );
}


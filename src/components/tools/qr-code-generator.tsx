"use client";

import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import { getToolBySlug } from "@/lib/tools";

const tool = getToolBySlug("qr-code-generator")!;

// Simple QR code using a public API rendered on canvas
export default function QrCodeGenerator() {
  const [text, setText] = useState("");
  const [size, setSize] = useState(256);
  const imgRef = useRef<HTMLImageElement>(null);
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    if (!text.trim()) {
      setImgSrc("");
      return;
    }
    // Using the QR code generation via canvas with a lightweight approach
    // We'll use a data URL approach with the Google Charts API alternative
    const encoded = encodeURIComponent(text);
    setImgSrc(
      `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encoded}`
    );
  }, [text, size]);

  const download = () => {
    if (!imgSrc) return;
    const a = document.createElement("a");
    a.href = imgSrc;
    a.download = "qr-code.png";
    a.click();
  };

  return (
    <ToolLayout tool={tool}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Content
            </label>
            <textarea
              className="w-full h-32 p-4 border border-gray-200 rounded-lg resize-y text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter URL, text, or any content..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Size: {size}px
            </label>
            <input
              type="range"
              min={128}
              max={512}
              step={64}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          {imgSrc ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={imgRef}
                src={imgSrc}
                alt="QR Code"
                width={size}
                height={size}
                className="border border-gray-200 rounded-lg"
              />
              <button
                onClick={download}
                className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors"
              >
                Download PNG
              </button>
            </>
          ) : (
            <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm">
              Enter content to generate QR
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}

"use client";

import { useState, useRef } from "react";
import ToolLayout from "@/components/ToolLayout";
import { getToolBySlug } from "@/lib/tools";

const tool = getToolBySlug("image-resizer")!;

const presets = [
  { name: "Instagram Post", w: 1080, h: 1080 },
  { name: "Instagram Story", w: 1080, h: 1920 },
  { name: "Facebook Cover", w: 820, h: 312 },
  { name: "Twitter Header", w: 1500, h: 500 },
  { name: "YouTube Thumbnail", w: 1280, h: 720 },
  { name: "LinkedIn Banner", w: 1584, h: 396 },
];

export default function ImageResizer() {
  const [image, setImage] = useState<string | null>(null);
  const [origW, setOrigW] = useState(0);
  const [origH, setOrigH] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [keepRatio, setKeepRatio] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const src = ev.target?.result as string;
      const img = new Image();
      img.onload = () => {
        imgRef.current = img;
        setOrigW(img.width);
        setOrigH(img.height);
        setWidth(img.width);
        setHeight(img.height);
        setImage(src);
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  const updateWidth = (w: number) => {
    setWidth(w);
    if (keepRatio && origW) setHeight(Math.round((w / origW) * origH));
  };

  const updateHeight = (h: number) => {
    setHeight(h);
    if (keepRatio && origH) setWidth(Math.round((h / origH) * origW));
  };

  const applyPreset = (w: number, h: number) => {
    setWidth(w);
    setHeight(h);
    setKeepRatio(false);
  };

  const download = () => {
    if (!imgRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(imgRef.current, 0, 0, width, height);
    const link = document.createElement("a");
    link.download = `resized-${width}x${height}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <ToolLayout tool={tool}>
      <canvas ref={canvasRef} className="hidden" />

      {!image ? (
        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-indigo-400 transition-colors">
          <span className="text-3xl mb-2">+</span>
          <span className="text-sm text-gray-500">Click to upload an image</span>
          <span className="text-xs text-gray-400 mt-1">PNG, JPG, WebP</span>
          <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
        </label>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt="Preview"
                className="max-w-48 max-h-48 rounded-lg border border-gray-200 object-contain"
              />
              <p className="text-xs text-gray-400 mt-1 text-center">
                Original: {origW} x {origH}
              </p>
            </div>
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Width (px)</label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => updateWidth(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Height (px)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => updateHeight(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                  />
                </div>
              </div>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={keepRatio}
                  onChange={(e) => setKeepRatio(e.target.checked)}
                  className="rounded border-gray-300"
                />
                Maintain aspect ratio
              </label>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Presets</h3>
            <div className="flex flex-wrap gap-2">
              {presets.map((p) => (
                <button
                  key={p.name}
                  onClick={() => applyPreset(p.w, p.h)}
                  className="px-3 py-1 text-xs border border-gray-200 rounded-full hover:bg-indigo-50 hover:border-indigo-300 transition-colors"
                >
                  {p.name} ({p.w}x{p.h})
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={download}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors"
            >
              Download Resized Image
            </button>
            <button
              onClick={() => { setImage(null); imgRef.current = null; }}
              className="px-6 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors"
            >
              New Image
            </button>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}

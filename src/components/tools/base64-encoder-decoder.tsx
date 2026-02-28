"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { getToolBySlug } from "@/lib/tools";

const tool = getToolBySlug("base64-encoder-decoder")!;

export default function Base64EncoderDecoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState("");

  const process = (newMode?: "encode" | "decode") => {
    const m = newMode || mode;
    setError("");
    try {
      if (m === "encode") {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input))));
      }
    } catch {
      setError(m === "encode" ? "Failed to encode text" : "Invalid Base64 string");
      setOutput("");
    }
  };

  return (
    <ToolLayout tool={tool}>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => { setMode("encode"); process("encode"); }}
          className={`px-4 py-2 text-sm rounded-lg transition-colors ${mode === "encode" ? "bg-indigo-600 text-white" : "border border-gray-200 hover:bg-gray-50"}`}
        >
          Encode
        </button>
        <button
          onClick={() => { setMode("decode"); process("decode"); }}
          className={`px-4 py-2 text-sm rounded-lg transition-colors ${mode === "decode" ? "bg-indigo-600 text-white" : "border border-gray-200 hover:bg-gray-50"}`}
        >
          Decode
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            {mode === "encode" ? "Plain Text" : "Base64 String"}
          </label>
          <textarea
            className="w-full h-48 p-4 border border-gray-200 rounded-lg resize-y text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base64 to decode..."}
            value={input}
            onChange={(e) => { setInput(e.target.value); }}
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700">
              {mode === "encode" ? "Base64 Output" : "Decoded Text"}
            </label>
            <button
              onClick={() => navigator.clipboard.writeText(output)}
              className="text-xs text-indigo-600 hover:text-indigo-800"
            >
              Copy
            </button>
          </div>
          <textarea
            className="w-full h-48 p-4 border border-gray-200 rounded-lg resize-y text-sm font-mono bg-gray-50"
            readOnly
            value={output}
          />
        </div>
      </div>
      {error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          {error}
        </div>
      )}
      <button
        onClick={() => process()}
        className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors"
      >
        {mode === "encode" ? "Encode" : "Decode"}
      </button>
    </ToolLayout>
  );
}

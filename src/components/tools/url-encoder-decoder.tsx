"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { getToolBySlug } from "@/lib/tools";

const tool = getToolBySlug("url-encoder-decoder")!;

export default function UrlEncoderDecoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState("");

  const process = (m?: "encode" | "decode") => {
    const activeMode = m || mode;
    setError("");
    try {
      if (activeMode === "encode") {
        setOutput(encodeURIComponent(input));
      } else {
        setOutput(decodeURIComponent(input));
      }
    } catch {
      setError("Invalid input for " + activeMode + " operation");
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

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Input</label>
          <textarea
            className="w-full h-32 p-4 border border-gray-200 rounded-lg resize-y text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder={mode === "encode" ? "https://example.com/path?q=hello world" : "https%3A%2F%2Fexample.com"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <button
          onClick={() => process()}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors"
        >
          {mode === "encode" ? "Encode" : "Decode"}
        </button>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
            {error}
          </div>
        )}

        {output && (
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium text-gray-700">Output</label>
              <button
                onClick={() => navigator.clipboard.writeText(output)}
                className="text-xs text-indigo-600 hover:text-indigo-800"
              >
                Copy
              </button>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-sm font-mono break-all">
              {output}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}

"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { getToolBySlug } from "@/lib/tools";

const tool = getToolBySlug("character-counter")!;

const limits = [
  { name: "Twitter/X", limit: 280 },
  { name: "Instagram", limit: 2200 },
  { name: "Meta Description", limit: 160 },
  { name: "SMS", limit: 160 },
  { name: "LinkedIn", limit: 3000 },
  { name: "YouTube Title", limit: 100 },
];

export default function CharacterCounter() {
  const [text, setText] = useState("");

  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, "").length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <ToolLayout tool={tool}>
      <textarea
        className="w-full h-40 p-4 border border-gray-200 rounded-lg resize-y text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        placeholder="Type or paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex gap-6 mt-4 text-sm text-gray-600">
        <span><strong className="text-gray-900">{chars}</strong> characters</span>
        <span><strong className="text-gray-900">{charsNoSpaces}</strong> without spaces</span>
        <span><strong className="text-gray-900">{words}</strong> words</span>
      </div>
      <div className="mt-6">
        <h3 className="font-medium text-gray-900 mb-3">Platform Limits</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {limits.map((l) => {
            const pct = Math.min((chars / l.limit) * 100, 100);
            const over = chars > l.limit;
            return (
              <div key={l.name} className="flex items-center gap-3">
                <span className="text-sm text-gray-600 w-32 shrink-0">{l.name}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${over ? "bg-red-500" : "bg-indigo-500"}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className={`text-xs w-16 text-right ${over ? "text-red-500 font-medium" : "text-gray-400"}`}>
                  {chars}/{l.limit}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </ToolLayout>
  );
}

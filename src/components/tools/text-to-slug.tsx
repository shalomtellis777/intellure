"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { getToolBySlug } from "@/lib/tools";

const tool = getToolBySlug("text-to-slug")!;

function slugify(text: string): string {
  return text
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function TextToSlug() {
  const [text, setText] = useState("");
  const slug = slugify(text);

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Enter Text
          </label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="My Blog Post Title!"
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-medium text-gray-700">
              URL Slug
            </label>
            <button
              onClick={() => navigator.clipboard.writeText(slug)}
              className="text-xs text-indigo-600 hover:text-indigo-800"
            >
              Copy
            </button>
          </div>
          <div className="px-4 py-3 bg-gray-50 rounded-lg text-sm font-mono text-indigo-600">
            {slug || "your-slug-appears-here"}
          </div>
        </div>
        {text && (
          <div className="text-xs text-gray-400">
            Full URL: https://example.com/{slug}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}

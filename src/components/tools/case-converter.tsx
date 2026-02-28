"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { getToolBySlug } from "@/lib/tools";

const tool = getToolBySlug("case-converter")!;

function toTitleCase(s: string) {
  return s.replace(/\w\S*/g, (t) => t.charAt(0).toUpperCase() + t.substr(1).toLowerCase());
}
function toSentenceCase(s: string) {
  return s.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
}
function toCamelCase(s: string) {
  return s.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase());
}
function toSnakeCase(s: string) {
  return s.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "_").replace(/^_|_$/g, "");
}
function toKebabCase(s: string) {
  return s.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "");
}
function toPascalCase(s: string) {
  const camel = toCamelCase(s);
  return camel.charAt(0).toUpperCase() + camel.slice(1);
}

const converters = [
  { name: "UPPERCASE", fn: (s: string) => s.toUpperCase() },
  { name: "lowercase", fn: (s: string) => s.toLowerCase() },
  { name: "Title Case", fn: toTitleCase },
  { name: "Sentence case", fn: toSentenceCase },
  { name: "camelCase", fn: toCamelCase },
  { name: "snake_case", fn: toSnakeCase },
  { name: "kebab-case", fn: toKebabCase },
  { name: "PascalCase", fn: toPascalCase },
];

export default function CaseConverter() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const convert = (fn: (s: string) => string) => {
    setResult(fn(text));
  };

  return (
    <ToolLayout tool={tool}>
      <textarea
        className="w-full h-32 p-4 border border-gray-200 rounded-lg resize-y text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        placeholder="Type or paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex flex-wrap gap-2 mt-4">
        {converters.map((c) => (
          <button
            key={c.name}
            onClick={() => convert(c.fn)}
            className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600 transition-colors"
          >
            {c.name}
          </button>
        ))}
      </div>
      {result && (
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Result</span>
            <button
              onClick={() => navigator.clipboard.writeText(result)}
              className="text-xs text-indigo-600 hover:text-indigo-800"
            >
              Copy
            </button>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg text-sm whitespace-pre-wrap break-all">
            {result}
          </div>
        </div>
      )}
    </ToolLayout>
  );
}

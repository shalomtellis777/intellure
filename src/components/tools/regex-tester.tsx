"use client";

import { useState, useMemo } from "react";
import ToolLayout from "@/components/ToolLayout";
import { getToolBySlug } from "@/lib/tools";

const tool = getToolBySlug("regex-tester")!;

const commonPatterns = [
  { name: "Email", pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}" },
  { name: "URL", pattern: "https?://[^\\s]+" },
  { name: "Phone", pattern: "\\+?[\\d\\s()-]{7,15}" },
  { name: "IP Address", pattern: "\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}" },
  { name: "Date (YYYY-MM-DD)", pattern: "\\d{4}-\\d{2}-\\d{2}" },
];

export default function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("");

  const matches = useMemo(() => {
    if (!pattern || !testString) return [];
    try {
      const regex = new RegExp(pattern, flags);
      const results: { match: string; index: number; groups: string[] }[] = [];
      let m;
      if (flags.includes("g")) {
        while ((m = regex.exec(testString)) !== null) {
          results.push({ match: m[0], index: m.index, groups: m.slice(1) });
          if (!m[0]) break;
        }
      } else {
        m = regex.exec(testString);
        if (m) results.push({ match: m[0], index: m.index, groups: m.slice(1) });
      }
      return results;
    } catch {
      return [];
    }
  }, [pattern, flags, testString]);

  const isValid = useMemo(() => {
    if (!pattern) return true;
    try { new RegExp(pattern, flags); return true; } catch { return false; }
  }, [pattern, flags]);

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Regular Expression
          </label>
          <div className="flex gap-2">
            <div className="flex-1 flex items-center border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500">
              <span className="px-3 text-gray-400 font-mono">/</span>
              <input
                type="text"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                className={`flex-1 py-2 text-sm font-mono focus:outline-none ${!isValid ? "text-red-500" : ""}`}
                placeholder="Enter regex pattern..."
              />
              <span className="px-3 text-gray-400 font-mono">/</span>
            </div>
            <input
              type="text"
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              className="w-16 px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono text-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="gi"
            />
          </div>
          {!isValid && (
            <p className="text-xs text-red-500 mt-1">Invalid regular expression</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Test String
          </label>
          <textarea
            className="w-full h-32 p-4 border border-gray-200 rounded-lg resize-y text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter test string..."
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
          />
        </div>

        {matches.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              {matches.length} match{matches.length !== 1 ? "es" : ""} found
            </h3>
            <div className="space-y-2">
              {matches.map((m, i) => (
                <div key={i} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg text-sm">
                  <span className="text-xs text-gray-400 w-6">#{i + 1}</span>
                  <code className="text-indigo-600 font-mono">{m.match}</code>
                  <span className="text-xs text-gray-400">at index {m.index}</span>
                  {m.groups.length > 0 && (
                    <span className="text-xs text-gray-500">
                      Groups: {m.groups.map((g, j) => `$${j + 1}="${g}"`).join(", ")}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Common Patterns</h3>
          <div className="flex flex-wrap gap-2">
            {commonPatterns.map((p) => (
              <button
                key={p.name}
                onClick={() => setPattern(p.pattern)}
                className="px-3 py-1 text-xs border border-gray-200 rounded-full hover:bg-indigo-50 hover:border-indigo-300 transition-colors"
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}

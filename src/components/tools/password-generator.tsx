"use client";

import { useState, useCallback } from "react";
import ToolLayout from "@/components/ToolLayout";
import { getToolBySlug } from "@/lib/tools";

const tool = getToolBySlug("password-generator")!;

const LOWER = "abcdefghijklmnopqrstuvwxyz";
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";

function getStrength(pw: string) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (pw.length >= 16) score++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^a-zA-Z0-9]/.test(pw)) score++;
  if (score <= 2) return { label: "Weak", color: "bg-red-500", pct: 25 };
  if (score <= 3) return { label: "Fair", color: "bg-yellow-500", pct: 50 };
  if (score <= 4) return { label: "Good", color: "bg-blue-500", pct: 75 };
  return { label: "Strong", color: "bg-green-500", pct: 100 };
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [useLower, setUseLower] = useState(true);
  const [useUpper, setUseUpper] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    let chars = "";
    if (useLower) chars += LOWER;
    if (useUpper) chars += UPPER;
    if (useNumbers) chars += NUMBERS;
    if (useSymbols) chars += SYMBOLS;
    if (!chars) chars = LOWER + UPPER + NUMBERS;

    const arr = new Uint32Array(length);
    crypto.getRandomValues(arr);
    const pw = Array.from(arr, (n) => chars[n % chars.length]).join("");
    setPassword(pw);
    setCopied(false);
  }, [length, useLower, useUpper, useNumbers, useSymbols]);

  const strength = password ? getStrength(password) : null;

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-6">
        {password && (
          <div className="p-4 bg-gray-50 rounded-lg flex items-center gap-3">
            <code className="flex-1 text-lg font-mono break-all">{password}</code>
            <button
              onClick={() => {
                navigator.clipboard.writeText(password);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="shrink-0 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        )}

        {strength && (
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-500">Strength</span>
              <span className="font-medium">{strength.label}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className={`h-2 rounded-full ${strength.color} transition-all`} style={{ width: `${strength.pct}%` }} />
            </div>
          </div>
        )}

        <div>
          <label className="text-sm text-gray-600 mb-1 block">
            Length: {length}
          </label>
          <input
            type="range"
            min={4}
            max={64}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>4</span><span>64</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          {[
            { label: "Lowercase (a-z)", checked: useLower, set: setUseLower },
            { label: "Uppercase (A-Z)", checked: useUpper, set: setUseUpper },
            { label: "Numbers (0-9)", checked: useNumbers, set: setUseNumbers },
            { label: "Symbols (!@#...)", checked: useSymbols, set: setUseSymbols },
          ].map((opt) => (
            <label key={opt.label} className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={opt.checked}
                onChange={(e) => opt.set(e.target.checked)}
                className="rounded border-gray-300"
              />
              {opt.label}
            </label>
          ))}
        </div>

        <button
          onClick={generate}
          className="w-full py-3 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          Generate Password
        </button>
      </div>
    </ToolLayout>
  );
}

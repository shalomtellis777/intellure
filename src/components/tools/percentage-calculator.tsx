"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { getToolBySlug } from "@/lib/tools";

const tool = getToolBySlug("percentage-calculator")!;

export default function PercentageCalculator() {
  const [a1, setA1] = useState("");
  const [b1, setB1] = useState("");
  const [a2, setA2] = useState("");
  const [b2, setB2] = useState("");
  const [a3, setA3] = useState("");
  const [b3, setB3] = useState("");

  const r1 = a1 && b1 ? ((Number(a1) / 100) * Number(b1)).toFixed(2) : "";
  const r2 = a2 && b2 ? ((Number(a2) / Number(b2)) * 100).toFixed(2) + "%" : "";
  const r3 = a3 && b3
    ? (((Number(b3) - Number(a3)) / Number(a3)) * 100).toFixed(2) + "%"
    : "";

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-8">
        {/* What is X% of Y */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-3">What is X% of Y?</h3>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span>What is</span>
            <input
              type="number"
              value={a1}
              onChange={(e) => setA1(e.target.value)}
              className="w-24 px-3 py-2 border border-gray-200 rounded-lg text-center"
              placeholder="10"
            />
            <span>% of</span>
            <input
              type="number"
              value={b1}
              onChange={(e) => setB1(e.target.value)}
              className="w-24 px-3 py-2 border border-gray-200 rounded-lg text-center"
              placeholder="200"
            />
            <span>=</span>
            <span className="text-lg font-bold text-indigo-600">{r1 || "?"}</span>
          </div>
        </div>

        {/* X is what % of Y */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-3">X is what % of Y?</h3>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <input
              type="number"
              value={a2}
              onChange={(e) => setA2(e.target.value)}
              className="w-24 px-3 py-2 border border-gray-200 rounded-lg text-center"
              placeholder="25"
            />
            <span>is what % of</span>
            <input
              type="number"
              value={b2}
              onChange={(e) => setB2(e.target.value)}
              className="w-24 px-3 py-2 border border-gray-200 rounded-lg text-center"
              placeholder="200"
            />
            <span>=</span>
            <span className="text-lg font-bold text-indigo-600">{r2 || "?"}</span>
          </div>
        </div>

        {/* % change from X to Y */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-3">Percentage change from X to Y</h3>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span>From</span>
            <input
              type="number"
              value={a3}
              onChange={(e) => setA3(e.target.value)}
              className="w-24 px-3 py-2 border border-gray-200 rounded-lg text-center"
              placeholder="100"
            />
            <span>to</span>
            <input
              type="number"
              value={b3}
              onChange={(e) => setB3(e.target.value)}
              className="w-24 px-3 py-2 border border-gray-200 rounded-lg text-center"
              placeholder="150"
            />
            <span>=</span>
            <span className="text-lg font-bold text-indigo-600">{r3 || "?"}</span>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}

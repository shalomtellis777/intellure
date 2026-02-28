"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { getToolBySlug } from "@/lib/tools";

const tool = getToolBySlug("bmi-calculator")!;

function getCategory(bmi: number) {
  if (bmi < 18.5) return { label: "Underweight", color: "text-blue-600", bg: "bg-blue-50" };
  if (bmi < 25) return { label: "Normal weight", color: "text-green-600", bg: "bg-green-50" };
  if (bmi < 30) return { label: "Overweight", color: "text-yellow-600", bg: "bg-yellow-50" };
  return { label: "Obese", color: "text-red-600", bg: "bg-red-50" };
}

export default function BmiCalculator() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");

  let bmi: number | null = null;

  if (unit === "metric" && height && weight) {
    const h = Number(height) / 100;
    bmi = Number(weight) / (h * h);
  } else if (unit === "imperial" && feet && weight) {
    const totalInches = Number(feet) * 12 + Number(inches || 0);
    bmi = (Number(weight) * 703) / (totalInches * totalInches);
  }

  const cat = bmi ? getCategory(bmi) : null;

  return (
    <ToolLayout tool={tool}>
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setUnit("metric")}
          className={`px-4 py-2 text-sm rounded-lg transition-colors ${unit === "metric" ? "bg-indigo-600 text-white" : "border border-gray-200"}`}
        >
          Metric (kg/cm)
        </button>
        <button
          onClick={() => setUnit("imperial")}
          className={`px-4 py-2 text-sm rounded-lg transition-colors ${unit === "imperial" ? "bg-indigo-600 text-white" : "border border-gray-200"}`}
        >
          Imperial (lb/ft)
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {unit === "metric" ? (
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Height (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="170"
            />
          </div>
        ) : (
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-sm text-gray-600 mb-1 block">Feet</label>
              <input
                type="number"
                value={feet}
                onChange={(e) => setFeet(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="5"
              />
            </div>
            <div className="flex-1">
              <label className="text-sm text-gray-600 mb-1 block">Inches</label>
              <input
                type="number"
                value={inches}
                onChange={(e) => setInches(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="7"
              />
            </div>
          </div>
        )}
        <div>
          <label className="text-sm text-gray-600 mb-1 block">
            Weight ({unit === "metric" ? "kg" : "lbs"})
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder={unit === "metric" ? "70" : "154"}
          />
        </div>
      </div>

      {bmi && cat && (
        <div className={`text-center p-6 rounded-xl ${cat.bg}`}>
          <div className={`text-4xl font-bold ${cat.color}`}>{bmi.toFixed(1)}</div>
          <div className={`text-lg font-medium mt-1 ${cat.color}`}>{cat.label}</div>
          <div className="flex justify-center gap-1 mt-4">
            {["Underweight", "Normal", "Overweight", "Obese"].map((l, i) => (
              <div
                key={l}
                className={`h-2 flex-1 max-w-16 rounded-full ${
                  i === 0 ? "bg-blue-400" : i === 1 ? "bg-green-400" : i === 2 ? "bg-yellow-400" : "bg-red-400"
                } ${cat.label.startsWith(l.substring(0, 4)) ? "ring-2 ring-offset-1 ring-gray-800" : "opacity-40"}`}
              />
            ))}
          </div>
          <div className="flex justify-center gap-4 mt-2 text-xs text-gray-500">
            <span>&lt;18.5</span><span>18.5-24.9</span><span>25-29.9</span><span>30+</span>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}

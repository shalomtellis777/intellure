"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { getToolBySlug } from "@/lib/tools";

const tool = getToolBySlug("sip-calculator")!;

function calcSIP(monthly: number, rate: number, years: number) {
  const n = years * 12;
  const r = rate / 100 / 12;
  const futureValue = monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  const invested = monthly * n;
  const returns = futureValue - invested;
  return { futureValue, invested, returns };
}

export default function SipCalculator() {
  const [monthly, setMonthly] = useState("5000");
  const [rate, setRate] = useState("12");
  const [years, setYears] = useState("10");

  const result = calcSIP(Number(monthly), Number(rate), Number(years));

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(n);

  const investedPct = (result.invested / result.futureValue) * 100;

  return (
    <ToolLayout tool={tool}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div>
          <label className="text-sm text-gray-600 mb-1 block">Monthly Investment</label>
          <input
            type="number"
            value={monthly}
            onChange={(e) => setMonthly(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="text-sm text-gray-600 mb-1 block">Expected Return (%/yr)</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="text-sm text-gray-600 mb-1 block">Time Period (years)</label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="text-center p-6 bg-indigo-50 rounded-xl mb-6">
        <div className="text-sm text-gray-500">Total Value</div>
        <div className="text-3xl font-bold text-indigo-600 mt-1">
          {fmt(result.futureValue)}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-xl font-bold text-gray-900">{fmt(result.invested)}</div>
          <div className="text-xs text-gray-500 mt-1">Total Invested</div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-xl font-bold text-green-600">{fmt(result.returns)}</div>
          <div className="text-xs text-gray-500 mt-1">Estimated Returns</div>
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div
          className="h-full bg-indigo-500 rounded-l-full"
          style={{ width: `${investedPct}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>Invested ({investedPct.toFixed(0)}%)</span>
        <span>Returns ({(100 - investedPct).toFixed(0)}%)</span>
      </div>
    </ToolLayout>
  );
}

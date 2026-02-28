"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { getToolBySlug } from "@/lib/tools";

const tool = getToolBySlug("emi-calculator")!;

function calcEMI(principal: number, rate: number, tenure: number) {
  const r = rate / 100 / 12;
  const n = tenure * 12;
  const emi = principal * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
  const totalPayment = emi * n;
  const totalInterest = totalPayment - principal;
  return { emi, totalPayment, totalInterest };
}

export default function EmiCalculator() {
  const [principal, setPrincipal] = useState("1000000");
  const [rate, setRate] = useState("8.5");
  const [tenure, setTenure] = useState("5");

  const result = calcEMI(Number(principal), Number(rate), Number(tenure));

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(n);

  const principalPct = (Number(principal) / result.totalPayment) * 100;

  return (
    <ToolLayout tool={tool}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div>
          <label className="text-sm text-gray-600 mb-1 block">Loan Amount</label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="text-sm text-gray-600 mb-1 block">Interest Rate (%/yr)</label>
          <input
            type="number"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="text-sm text-gray-600 mb-1 block">Tenure (years)</label>
          <input
            type="number"
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="text-center p-6 bg-indigo-50 rounded-xl mb-6">
        <div className="text-sm text-gray-500">Monthly EMI</div>
        <div className="text-3xl font-bold text-indigo-600 mt-1">
          {fmt(result.emi)}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-lg font-bold text-gray-900">{fmt(Number(principal))}</div>
          <div className="text-xs text-gray-500 mt-1">Principal</div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-lg font-bold text-red-500">{fmt(result.totalInterest)}</div>
          <div className="text-xs text-gray-500 mt-1">Total Interest</div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-lg font-bold text-gray-900">{fmt(result.totalPayment)}</div>
          <div className="text-xs text-gray-500 mt-1">Total Payment</div>
        </div>
      </div>

      <div className="w-full bg-red-200 rounded-full h-4 overflow-hidden">
        <div
          className="h-full bg-indigo-500 rounded-l-full"
          style={{ width: `${principalPct}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>Principal ({principalPct.toFixed(0)}%)</span>
        <span>Interest ({(100 - principalPct).toFixed(0)}%)</span>
      </div>
    </ToolLayout>
  );
}

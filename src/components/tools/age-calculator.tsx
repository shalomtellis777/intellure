"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { getToolBySlug } from "@/lib/tools";

const tool = getToolBySlug("age-calculator")!;

function calcAge(dob: Date, now: Date) {
  let years = now.getFullYear() - dob.getFullYear();
  let months = now.getMonth() - dob.getMonth();
  let days = now.getDate() - dob.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  const totalDays = Math.floor((now.getTime() - dob.getTime()) / 86400000);
  const totalWeeks = Math.floor(totalDays / 7);
  const totalHours = totalDays * 24;
  const totalMinutes = totalHours * 60;

  const nextBirthday = new Date(now.getFullYear(), dob.getMonth(), dob.getDate());
  if (nextBirthday <= now) nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
  const daysToNext = Math.ceil((nextBirthday.getTime() - now.getTime()) / 86400000);

  return { years, months, days, totalDays, totalWeeks, totalHours, totalMinutes, daysToNext };
}

export default function AgeCalculator() {
  const [dob, setDob] = useState("");

  const now = new Date();
  const result = dob ? calcAge(new Date(dob), now) : null;

  return (
    <ToolLayout tool={tool}>
      <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Date of Birth
          </label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            max={now.toISOString().split("T")[0]}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {result && (
        <>
          <div className="text-center p-6 bg-indigo-50 rounded-xl mb-6">
            <div className="text-4xl font-bold text-indigo-600">
              {result.years} years, {result.months} months, {result.days} days
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Your next birthday is in {result.daysToNext} days
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Total Days", value: result.totalDays.toLocaleString() },
              { label: "Total Weeks", value: result.totalWeeks.toLocaleString() },
              { label: "Total Hours", value: result.totalHours.toLocaleString() },
              { label: "Total Minutes", value: result.totalMinutes.toLocaleString() },
            ].map((s) => (
              <div key={s.label} className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-xl font-bold text-gray-900">{s.value}</div>
                <div className="text-xs text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </ToolLayout>
  );
}

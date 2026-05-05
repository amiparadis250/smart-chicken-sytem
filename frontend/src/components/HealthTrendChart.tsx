"use client";

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";

const data = [
  { time: "00:00", value: 88 },
  { time: "03:00", value: 87.5 },
  { time: "06:00", value: 89 },
  { time: "09:00", value: 91 },
  { time: "12:00", value: 93 },
  { time: "15:00", value: 96 },
  { time: "18:00", value: 98.2 },
  { time: "21:00", value: 99.6 },
  { time: "24:00", value: 99.8 },
];

export default function HealthTrendChart() {
  const [range, setRange] = useState<"24H" | "7D">("24H");

  return (
    <div className="bg-[#1A1A1C] border border-[#2a2a2e] rounded-xl p-5 flex-1">
      <div className="flex items-center justify-between mb-1">
        <div>
          <h3 className="text-[#E5E2E3] font-semibold text-sm">Population Health Trend</h3>
          <p className="text-gray text-xs mt-0.5">Real-time Biosignature Analysis</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray text-xs">9h</span>
          {(["24H", "7D"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${
                range === r
                  ? "bg-primary text-[#003824]"
                  : "text-gray hover:text-[#E5E2E3]"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="h-52 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="healthGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              tick={{ fill: "#71717A", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[85, 100]}
              tick={{ fill: "#71717A", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={30}
            />
            <Tooltip
              contentStyle={{
                background: "#1A1A1C",
                border: "1px solid #2a2a2e",
                borderRadius: 8,
                fontSize: 12,
                color: "#E5E2E3",
              }}
              formatter={(value) => [`${value}%`, "Peak Performance"]}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#10B981"
              strokeWidth={2}
              fill="url(#healthGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

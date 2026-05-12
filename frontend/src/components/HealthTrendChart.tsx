"use client";

import { useState } from "react";

export default function HealthTrendChart() {
  const [range, setRange] = useState("24H");

  return (
    <div className="flex-1 bg-card border border-card-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-foreground text-base font-semibold">Population Health Trend</h3>
        <p className="text-gray text-xs">Real-time Biosignature Analysis</p>
      </div>

      <div className="flex items-center gap-1 mb-6 justify-end">
        {["1H", "24H", "7D"].map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              range === r ? "bg-primary text-[#003824]" : "text-gray hover:text-foreground"
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Static Chart */}
      <div className="relative h-48">
        <svg viewBox="0 0 600 200" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(16, 185, 129, 0.3)" />
              <stop offset="100%" stopColor="rgba(16, 185, 129, 0)" />
            </linearGradient>
          </defs>
          {/* Grid lines */}
          <line x1="0" y1="50" x2="600" y2="50" stroke="#1f1f24" strokeWidth="0.5" />
          <line x1="0" y1="100" x2="600" y2="100" stroke="#1f1f24" strokeWidth="0.5" />
          <line x1="0" y1="150" x2="600" y2="150" stroke="#1f1f24" strokeWidth="0.5" />
          {/* Area fill */}
          <path
            d="M0,180 C50,175 100,170 150,165 C200,160 220,155 250,150 C280,145 300,140 330,130 C360,120 380,100 400,80 C420,60 450,40 480,35 C510,30 540,28 570,25 C585,24 600,23 600,23 L600,200 L0,200 Z"
            fill="url(#chartGradient)"
          />
          {/* Line */}
          <path
            d="M0,180 C50,175 100,170 150,165 C200,160 220,155 250,150 C280,145 300,140 330,130 C360,120 380,100 400,80 C420,60 450,40 480,35 C510,30 540,28 570,25 C585,24 600,23 600,23"
            fill="none"
            stroke="#10B981"
            strokeWidth="2"
          />
          {/* Peak dot */}
          <circle cx="480" cy="35" r="4" fill="#10B981" />
        </svg>

        {/* Peak label */}
        <div className="absolute top-4 right-20 bg-card border border-primary/30 rounded-md px-2.5 py-1">
          <span className="text-primary text-xs font-medium">Peak Performance: 99.8%</span>
        </div>
      </div>
    </div>
  );
}

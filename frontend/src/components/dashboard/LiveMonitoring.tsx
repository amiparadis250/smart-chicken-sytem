"use client";

import { ChevronDown, Maximize2, Settings, AlertCircle } from "lucide-react";

const problems = [
  { label: "Low Activity", count: "7 chickens", icon: "🔴" },
  { label: "Abnormal Posture", count: "4 chickens", icon: "🔴" },
  { label: "Isolation", count: "3 chickens", icon: "🟡" },
];

export default function LiveMonitoring() {
  return (
    <div className="bg-[#1A1A1C] border border-[#2a2a2e] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#2a2a2e]">
        <div className="flex items-center gap-2">
          <h3 className="text-[#E5E2E3] font-semibold text-sm">Live Monitoring</h3>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-primary text-xs font-medium">Live</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-[#121214] border border-[#2a2a2e] rounded-lg px-3 py-1.5 text-sm text-[#E5E2E3] cursor-pointer">
            Camera 1 - House A
            <ChevronDown size={14} className="text-gray" />
          </div>
          <button className="p-1.5 text-gray hover:text-[#E5E2E3] transition-colors">
            <Maximize2 size={16} />
          </button>
          <button className="p-1.5 text-gray hover:text-[#E5E2E3] transition-colors">
            <Settings size={16} />
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Camera Feed */}
        <div className="flex-1 relative bg-[#0a0a0c] aspect-[16/10] flex items-center justify-center">
          <div className="absolute top-3 left-3 bg-black/60 text-gray text-[10px] px-2 py-1 rounded">
            2024-05-20 10:24:30 AM
          </div>

          {/* Placeholder detection boxes */}
          <div className="w-full h-full relative p-6">
            <div className="absolute top-[15%] left-[8%] w-[18%] h-[35%] border-2 border-primary rounded-sm">
              <span className="absolute -top-5 left-0 bg-primary/80 text-[8px] text-[#003824] px-1.5 py-0.5 rounded font-medium">
                Healthy 0.93
              </span>
            </div>
            <div className="absolute top-[12%] left-[30%] w-[16%] h-[32%] border-2 border-primary rounded-sm">
              <span className="absolute -top-5 left-0 bg-primary/80 text-[8px] text-[#003824] px-1.5 py-0.5 rounded font-medium">
                Healthy 0.91
              </span>
            </div>
            <div className="absolute top-[10%] left-[55%] w-[18%] h-[34%] border-2 border-primary rounded-sm">
              <span className="absolute -top-5 left-0 bg-primary/80 text-[8px] text-[#003824] px-1.5 py-0.5 rounded font-medium">
                Healthy 0.89
              </span>
            </div>
            <div className="absolute top-[30%] right-[10%] w-[20%] h-[30%] border-2 border-red-500 rounded-sm">
              <span className="absolute -top-5 left-0 bg-red-500/80 text-[8px] text-white px-1.5 py-0.5 rounded font-medium">
                Problem: Abnormal Posture 0.83
              </span>
            </div>
            <div className="absolute bottom-[15%] left-[20%] w-[22%] h-[28%] border-2 border-red-500 rounded-sm">
              <span className="absolute -top-5 left-0 bg-red-500/80 text-[8px] text-white px-1.5 py-0.5 rounded font-medium">
                Problem: Low Activity 0.95
              </span>
            </div>
            <div className="absolute bottom-[12%] left-[5%] w-[14%] h-[25%] border-2 border-primary rounded-sm">
              <span className="absolute -top-5 left-0 bg-primary/80 text-[8px] text-[#003824] px-1.5 py-0.5 rounded font-medium">
                Healthy
              </span>
            </div>
          </div>

          {/* Legend */}
          <div className="absolute bottom-3 left-3 flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-primary rounded-sm" />
              <span className="text-[10px] text-gray">Healthy</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-red-500 rounded-sm" />
              <span className="text-[10px] text-gray">Problem Detected</span>
            </div>
          </div>
        </div>

        {/* Detection Summary */}
        <div className="w-56 border-l border-[#2a2a2e] p-4 flex flex-col gap-4">
          <div>
            <p className="text-[#E5E2E3] text-xs font-bold mb-1">Detection Summary</p>
            <p className="text-gray text-[10px]">Total In View</p>
            <p className="text-[#E5E2E3] text-2xl font-bold">142</p>
          </div>
          <div>
            <p className="text-gray text-[10px]">Healthy</p>
            <p className="text-primary text-lg font-bold">128 <span className="text-xs font-normal">(90.1%)</span></p>
          </div>
          <div>
            <p className="text-red-400 text-[10px]">With Problems</p>
            <p className="text-red-400 text-lg font-bold">14 <span className="text-xs font-normal">(9.9%)</span></p>
          </div>

          <div className="border-t border-[#2a2a2e] pt-3">
            <p className="text-[#E5E2E3] text-xs font-bold mb-2">Top Detected Problems</p>
            <div className="flex flex-col gap-2">
              {problems.map((p) => (
                <div key={p.label} className="flex items-center gap-2">
                  <AlertCircle size={14} className="text-red-400 shrink-0" />
                  <div>
                    <p className="text-[#E5E2E3] text-[11px] font-medium">{p.label}</p>
                    <p className="text-gray text-[10px]">{p.count}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-gray text-[10px] mt-auto">AI Model Confidence</p>
        </div>
      </div>
    </div>
  );
}

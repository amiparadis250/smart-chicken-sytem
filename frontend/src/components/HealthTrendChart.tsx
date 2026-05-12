"use client";

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useGetSensorsQuery } from "@/src/store/api/sensorsApi";

export default function HealthTrendChart() {
  const { data } = useGetSensorsQuery({});

  const chartData = data?.results?.slice(0, 20).reverse().map((s) => ({
    time: new Date(s.recorded_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    temperature: s.temperature,
    humidity: s.humidity,
  })) ?? [];

  return (
    <div className="bg-card border border-card-border rounded-xl p-5 flex-1">
      <div className="flex items-center justify-between mb-1">
        <div>
          <h3 className="text-foreground font-semibold text-sm">Population Health Trend</h3>
          <p className="text-gray text-xs mt-0.5">Real-time Biosignature Analysis</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-xs px-3 py-1 rounded-full font-medium bg-primary text-[#003824]">24H</button>
          <button className="text-xs px-3 py-1 rounded-full font-medium text-gray hover:text-foreground">7D</button>
        </div>
      </div>
      <div className="h-52 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" tick={{ fill: "#71717A", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#71717A", fontSize: 11 }} axisLine={false} tickLine={false} width={30} />
            <Tooltip
              contentStyle={{ background: "#1A1A1C", border: "1px solid #2a2a2e", borderRadius: 8, fontSize: 12, color: "#E5E2E3" }}
            />
            <Area type="monotone" dataKey="temperature" stroke="#10B981" strokeWidth={2} fill="url(#grad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

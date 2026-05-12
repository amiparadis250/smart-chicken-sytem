"use client";

import { Cpu, Droplets, Wind, Flame } from "lucide-react";
import { useGetDashboardQuery } from "@/src/store/api/dashboardApi";

export default function BottomPanels() {
  const { data } = useGetDashboardQuery();
  const sensor = data?.latest_sensor_data;

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Core Intelligence */}
      <div className="bg-card border border-card-border rounded-xl p-5 flex items-center gap-5">
        <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary/20 to-dark-green/40 flex items-center justify-center shrink-0">
          <Cpu size={32} className="text-primary" />
        </div>
        <div>
          <h3 className="text-foreground font-semibold text-sm mb-3">Core Intelligence</h3>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-24 bg-card-border rounded-full overflow-hidden">
                <div className="h-full w-[88%] bg-primary rounded-full" />
              </div>
              <span className="text-xs text-gray">88% CPU</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-24 bg-card-border rounded-full overflow-hidden">
                <div className="h-full w-[42%] bg-primary rounded-full" />
              </div>
              <span className="text-xs text-gray">42% MEM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Environmental Telemetry */}
      <div className="bg-card border border-card-border rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-[10px] text-gray uppercase tracking-wider font-medium">Live Data</span>
          </div>
          <h3 className="text-foreground font-semibold text-sm">Environmental Telemetry</h3>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <Droplets size={16} className="text-primary mx-auto mb-1" />
            <p className="text-[10px] text-gray mb-0.5">Humidity</p>
            <p className="text-lg font-bold text-foreground">{sensor?.humidity ?? "—"}%</p>
          </div>
          <div>
            <Wind size={16} className="text-primary mx-auto mb-1" />
            <p className="text-[10px] text-gray mb-0.5">Temperature</p>
            <p className="text-lg font-bold text-foreground">{sensor?.temperature ?? "—"}°C</p>
          </div>
          <div>
            <Flame size={16} className="text-primary mx-auto mb-1" />
            <p className="text-[10px] text-gray mb-0.5">Gas Level</p>
            <p className="text-lg font-bold text-foreground">{sensor?.gas_level ?? "—"}ppm</p>
          </div>
        </div>
      </div>
    </div>
  );
}

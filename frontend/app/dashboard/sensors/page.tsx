"use client";

import { useGetSensorsQuery } from "@/src/store/api/sensorsApi";
import { Thermometer, Droplets, Wind } from "lucide-react";

export default function SensorsPage() {
  const { data, isLoading } = useGetSensorsQuery({});
  const readings = data?.results ?? [];

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-foreground text-xl font-bold">Sensor Analytics</h1>
        <p className="text-gray text-xs mt-0.5">Environmental monitoring data</p>
      </div>

      {/* Latest Reading Cards */}
      {readings.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-card border border-card-border rounded-xl p-5 text-center">
            <Thermometer size={24} className="text-primary mx-auto mb-2" />
            <p className="text-foreground text-2xl font-bold">{readings[0].temperature}°C</p>
            <p className="text-gray text-xs mt-1">Temperature</p>
          </div>
          <div className="bg-card border border-card-border rounded-xl p-5 text-center">
            <Droplets size={24} className="text-primary mx-auto mb-2" />
            <p className="text-foreground text-2xl font-bold">{readings[0].humidity}%</p>
            <p className="text-gray text-xs mt-1">Humidity</p>
          </div>
          <div className="bg-card border border-card-border rounded-xl p-5 text-center">
            <Wind size={24} className="text-primary mx-auto mb-2" />
            <p className="text-foreground text-2xl font-bold">{readings[0].gas_level} ppm</p>
            <p className="text-gray text-xs mt-1">Gas Level</p>
          </div>
        </div>
      )}

      {/* Data Table */}
      <div className="bg-card border border-card-border rounded-xl p-5">
        <h3 className="text-foreground font-semibold text-sm mb-4">Reading History</h3>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : readings.length === 0 ? (
          <p className="text-gray text-xs">No sensor data recorded yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-gray text-xs font-medium py-2 pr-4">Farm</th>
                  <th className="text-left text-gray text-xs font-medium py-2 pr-4">Temp</th>
                  <th className="text-left text-gray text-xs font-medium py-2 pr-4">Humidity</th>
                  <th className="text-left text-gray text-xs font-medium py-2 pr-4">Gas</th>
                  <th className="text-left text-gray text-xs font-medium py-2 pr-4">Violations</th>
                  <th className="text-left text-gray text-xs font-medium py-2">Time</th>
                </tr>
              </thead>
              <tbody>
                {readings.map((r) => (
                  <tr key={r.id} className="border-b border-border/50">
                    <td className="py-2.5 pr-4 text-foreground">{r.farm_name}</td>
                    <td className="py-2.5 pr-4 text-foreground">{r.temperature}°C</td>
                    <td className="py-2.5 pr-4 text-foreground">{r.humidity}%</td>
                    <td className="py-2.5 pr-4 text-foreground">{r.gas_level} ppm</td>
                    <td className="py-2.5 pr-4">
                      {r.violations.length > 0 ? (
                        <span className="text-red-400 text-xs">{r.violations.length} issue(s)</span>
                      ) : (
                        <span className="text-primary text-xs">Normal</span>
                      )}
                    </td>
                    <td className="py-2.5 text-gray text-xs">{new Date(r.recorded_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useGetSensorsQuery } from "@/src/store/api/sensorsApi";
import { useGetDevicesQuery } from "@/src/store/api/devicesApi";
import { Maximize2, Settings, Video } from "lucide-react";

export default function MonitoringPage() {
  const { data: sensors } = useGetSensorsQuery({});
  const { data: devices } = useGetDevicesQuery({ device_type: "camera" });
  const cameras = devices?.results ?? [];
  const latestSensor = sensors?.results?.[0];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground text-xl font-bold">Live Monitoring</h1>
          <p className="text-gray text-xs mt-0.5">Real-time camera feeds and sensor data</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="text-primary text-xs font-semibold">Live</span>
        </div>
      </div>

      {/* Camera Grid */}
      <div className="grid grid-cols-2 gap-4">
        {cameras.length === 0 ? (
          <div className="col-span-2 bg-card border border-card-border rounded-xl p-12 text-center">
            <Video size={40} className="text-gray mx-auto mb-3" />
            <p className="text-gray text-sm">No cameras connected</p>
            <p className="text-gray/60 text-xs mt-1">Add a camera device to start monitoring</p>
          </div>
        ) : (
          cameras.map((cam) => (
            <div key={cam.id} className="bg-card border border-card-border rounded-xl overflow-hidden">
              <div className="aspect-video bg-[#0a0a0c] flex items-center justify-center relative">
                <Video size={32} className="text-gray/30" />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-[10px] text-foreground bg-black/50 px-2 py-0.5 rounded">REC</span>
                </div>
                <div className="absolute top-3 right-3 flex gap-2">
                  <button className="text-gray hover:text-foreground"><Maximize2 size={14} /></button>
                  <button className="text-gray hover:text-foreground"><Settings size={14} /></button>
                </div>
              </div>
              <div className="p-3 flex items-center justify-between">
                <div>
                  <p className="text-foreground text-sm font-medium">{cam.name}</p>
                  <p className="text-gray text-[10px]">{cam.serial_number}</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${cam.is_active ? "bg-primary/20 text-primary" : "bg-red-500/20 text-red-400"}`}>
                  {cam.is_active ? "ONLINE" : "OFFLINE"}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Live Sensor Data */}
      <div className="bg-card border border-card-border rounded-xl p-5">
        <h3 className="text-foreground font-semibold text-sm mb-4">Live Environmental Data</h3>
        <div className="grid grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-gray text-xs mb-1">Temperature</p>
            <p className="text-foreground text-2xl font-bold">{latestSensor?.temperature ?? "—"}°C</p>
          </div>
          <div className="text-center">
            <p className="text-gray text-xs mb-1">Humidity</p>
            <p className="text-foreground text-2xl font-bold">{latestSensor?.humidity ?? "—"}%</p>
          </div>
          <div className="text-center">
            <p className="text-gray text-xs mb-1">Gas Level</p>
            <p className="text-foreground text-2xl font-bold">{latestSensor?.gas_level ?? "—"} ppm</p>
          </div>
        </div>
      </div>
    </div>
  );
}

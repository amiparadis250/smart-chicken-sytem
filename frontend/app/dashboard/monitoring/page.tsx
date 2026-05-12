"use client";

import { useState, useEffect } from "react";
import { useGetDevicesQuery } from "@/src/store/api/devicesApi";
import { useGetDetectionsQuery } from "@/src/store/api/detectionsApi";
import { useGetSensorsQuery } from "@/src/store/api/sensorsApi";

interface DetectionLog {
  time: string;
  title: string;
  description: string;
  severity: "critical" | "warning" | "info" | "neutral";
}

export default function MonitoringPage() {
  const { data: devices } = useGetDevicesQuery({ device_type: "camera" });
  const { data: detections } = useGetDetectionsQuery({});
  const { data: sensors } = useGetSensorsQuery({});

  const cameras = devices?.results ?? [];
  const [selectedNode, setSelectedNode] = useState(0);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const tick = () => setCurrentTime(new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const nodes = cameras.length > 0
    ? cameras.map((c, i) => ({ id: c.id, name: `Node ${722 + i}`, location: c.name }))
    : [
        { id: 1, name: "Node 722", location: "UNIT B FRONT" },
        { id: 2, name: "Node 723", location: "UNIT B REAR" },
        { id: 3, name: "Node 724", location: "FEEDING LINE 1" },
        { id: 4, name: "Node 725", location: "WATER STATION" },
      ];

  const detectionLogs: DetectionLog[] = detections?.results?.slice(0, 5).map((d, i) => {
    const time = new Date(d.detected_at).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    if (d.status === "abnormal") {
      return { time, title: "Abnormal Gait", description: `ID: PV-CH-${800 + d.id}. Location: Node ${722 + (i % 4)} Grid B-${i + 1}. Action: Isolated tracking active.`, severity: "critical" as const };
    }
    return { time, title: "Health Batch Sync", description: `${(d.confidence * 100).toFixed(1)}% of Unit B nodes reporting optimal vital ranges.`, severity: "info" as const };
  }) ?? [
    { time: "14:02:11", title: "Abnormal Gait", description: "ID: PV-CH-882. Location: Node 722 Grid B-4. Action: Isolated tracking active.", severity: "critical" },
    { time: "14:01:45", title: "Cluster Dispersal", description: "Auto-feeder activation successful. All units responding to stimulus.", severity: "info" },
    { time: "13:58:22", title: "Health Batch Sync", description: "99.2% of Unit B nodes reporting optimal vital ranges.", severity: "info" },
    { time: "13:45:00", title: "Routine Calibration", description: "Lens maintenance check complete for all 12 units.", severity: "neutral" },
  ];

  const latestSensor = sensors?.results?.[0];
  const systemVitality = latestSensor ? Math.min(99.9, 100 - (latestSensor.gas_level / 100) * 10) : 98.4;

  return (
    <div className="flex gap-6 h-full">
      {/* Main Feed Area */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-foreground text-2xl font-bold">Sector 04 - Broiler Unit B</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-primary text-xs font-bold tracking-wider">LIVE</span>
              <span className="text-gray text-xs">• 4K HDR • NODE_{722 + selectedNode}_ACTIVE</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-card-border rounded-lg text-foreground text-xs hover:border-primary/50 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
              Thermal View
            </button>
            <button className="px-5 py-2 bg-primary text-background text-xs font-bold rounded-lg hover:bg-primary-light transition-colors">
              CAPTURE FRAME
            </button>
          </div>
        </div>

        {/* Camera Feed */}
        <div className="relative flex-1 min-h-[500px] rounded-xl overflow-hidden border border-card-border">
          {/* Background Image */}
          <img
            src="/assets/chickens-farm.jpg"
            alt="Chicken farm live feed"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Dark overlay for HUD visibility */}
          <div className="absolute inset-0 bg-black/20" />

          {/* Camera Coordinates */}
          <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-2 rounded">
            <p className="text-[10px] text-gray tracking-wider">CAMERA COORDINATES</p>
            <p className="text-foreground text-sm font-bold">34°N 118°W • ALT 12.4m</p>
          </div>

          {/* Detection Bounding Boxes */}
          <div className="absolute top-[28%] left-[32%] w-[18%] h-[22%] border-2 border-primary rounded">
            <span className="absolute -top-5 left-0 text-[10px] text-primary font-bold bg-black/60 px-1.5 py-0.5 rounded">HEALTHY 98.4%</span>
          </div>
          <div className="absolute top-[30%] right-[25%] w-[15%] h-[20%] border-2 border-primary rounded">
            <span className="absolute -top-5 left-0 text-[10px] text-primary font-bold bg-black/60 px-1.5 py-0.5 rounded">HEALTHY 96.1%</span>
          </div>
          <div className="absolute bottom-[22%] right-[28%] w-[14%] h-[18%] border-2 border-yellow-500 rounded">
            <span className="absolute -top-5 left-0 text-[10px] text-yellow-400 font-bold bg-black/60 px-1.5 py-0.5 rounded">ABNORMAL 80.2%</span>
          </div>
          <div className="absolute bottom-[18%] left-[20%] w-[16%] h-[16%] border-2 border-primary rounded">
            <span className="absolute -top-5 left-0 text-[10px] text-primary font-bold bg-black/60 px-1.5 py-0.5 rounded">HEALTHY 99.1%</span>
          </div>
          <div className="absolute bottom-[20%] left-[42%] w-[12%] h-[14%] border-2 border-primary rounded">
            <span className="absolute -top-5 left-0 text-[10px] text-primary font-bold bg-black/60 px-1.5 py-0.5 rounded">HEALTHY 97.8%</span>
          </div>

          {/* Detection Engine Badge */}
          <div className="absolute bottom-4 right-4 flex items-center gap-3 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-lg">
            <div>
              <p className="text-[10px] text-gray">DETECTION ENGINE</p>
              <p className="text-primary text-xs font-bold tracking-wider">NEURAL_V4.2_READY</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
            </div>
          </div>

          {/* Timestamp */}
          <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded">
            <p className="text-foreground text-xs font-mono">{currentTime}</p>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-[300px] flex flex-col gap-5">
        {/* Select Node */}
        <div>
          <h3 className="text-gray text-[11px] font-bold tracking-wider mb-3">SELECT NODE</h3>
          <div className="grid grid-cols-2 gap-2">
            {nodes.map((node, i) => (
              <button
                key={node.id}
                onClick={() => setSelectedNode(i)}
                className={`p-3 rounded-lg text-left transition-all ${
                  selectedNode === i
                    ? "bg-primary/10 border border-primary text-primary"
                    : "bg-card border border-card-border text-foreground hover:border-primary/30"
                }`}
              >
                <p className="text-xs font-bold">{node.name}</p>
                <p className="text-[10px] text-gray mt-0.5">{node.location}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Detection Log */}
        <div>
          <h3 className="text-gray text-[11px] font-bold tracking-wider mb-3">DETECTION LOG</h3>
          <div className="flex flex-col gap-4">
            {detectionLogs.map((log, i) => (
              <div key={i} className="flex gap-3">
                <div className="mt-1.5">
                  <span className={`block w-2.5 h-2.5 rounded-full ${
                    log.severity === "critical" ? "bg-red-500" :
                    log.severity === "warning" ? "bg-yellow-500" :
                    log.severity === "info" ? "bg-primary" : "bg-gray/50"
                  }`} />
                </div>
                <div>
                  <p className={`text-xs font-bold ${
                    log.severity === "critical" ? "text-red-400" :
                    log.severity === "info" ? "text-primary" : "text-gray"
                  }`}>
                    {log.time} - {log.title}
                  </p>
                  <p className="text-[11px] text-gray mt-0.5 leading-relaxed">{log.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Vitality */}
        <div className="bg-card border border-card-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-gray text-[11px] font-bold tracking-wider">SYSTEM VITALITY</h3>
            <span className="text-primary text-lg font-bold">{systemVitality.toFixed(1)}%</span>
          </div>
          <div className="w-full h-2 bg-background rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full transition-all" style={{ width: `${systemVitality}%` }} />
          </div>
          <div className="grid grid-cols-3 gap-2 mt-3">
            <div className="text-center">
              <p className="text-foreground text-sm font-bold">{latestSensor?.temperature?.toFixed(1) ?? "26.4"}°</p>
              <p className="text-[9px] text-gray">TEMP</p>
            </div>
            <div className="text-center">
              <p className="text-foreground text-sm font-bold">{latestSensor?.humidity?.toFixed(0) ?? "62"}%</p>
              <p className="text-[9px] text-gray">HUMID</p>
            </div>
            <div className="text-center">
              <p className="text-foreground text-sm font-bold">{latestSensor?.gas_level?.toFixed(0) ?? "28"}</p>
              <p className="text-[9px] text-gray">GAS PPM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

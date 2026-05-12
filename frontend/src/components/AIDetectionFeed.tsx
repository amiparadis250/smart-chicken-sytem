"use client";

import { CheckCircle2 } from "lucide-react";
import { useGetAlertsQuery } from "@/src/store/api/alertsApi";

const tagStyles: Record<string, string> = {
  low: "bg-primary/20 text-primary",
  medium: "bg-yellow-500/20 text-yellow-400",
  high: "bg-orange-500/20 text-orange-400",
  critical: "bg-red-500/20 text-red-400",
};

export default function AIDetectionFeed() {
  const { data } = useGetAlertsQuery({ is_resolved: false });
  const alerts = data?.results?.slice(0, 5) ?? [];

  return (
    <div className="bg-card border border-card-border rounded-xl p-5 w-80 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-foreground font-semibold text-sm">AI Detection Feed</h3>
        <CheckCircle2 size={18} className="text-primary" />
      </div>
      <div className="flex flex-col gap-3 flex-1">
        {alerts.length === 0 && <p className="text-gray text-xs">No active alerts</p>}
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`rounded-lg p-3 ${
              alert.severity === "critical" || alert.severity === "high"
                ? "bg-primary-tint border border-primary/20"
                : "bg-[#121214]/60"
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${tagStyles[alert.severity]}`}>
                {alert.alert_type === "ai" ? "AI" : "Sensor"}
              </span>
              <span className="text-[10px] text-gray">
                {new Date(alert.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
              </span>
            </div>
            <p className="text-xs text-foreground/80 leading-relaxed">{alert.message}</p>
          </div>
        ))}
      </div>
      <button className="text-xs text-gray hover:text-foreground mt-4 self-end font-medium transition-colors">
        VIEW FULL LOG
      </button>
    </div>
  );
}

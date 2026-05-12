"use client";

import { useGetAlertsQuery, useResolveAlertMutation } from "@/src/store/api/alertsApi";
import { Bell, CheckCircle2 } from "lucide-react";

const severityStyles: Record<string, string> = {
  low: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  high: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  critical: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function AlertsPage() {
  const { data, isLoading } = useGetAlertsQuery({});
  const [resolveAlert] = useResolveAlertMutation();
  const alerts = data?.results ?? [];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground text-xl font-bold">Alerts</h1>
          <p className="text-gray text-xs mt-0.5">System notifications and warnings</p>
        </div>
        <span className="text-gray text-xs">{alerts.filter((a) => !a.is_resolved).length} unresolved</span>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : alerts.length === 0 ? (
        <div className="bg-card border border-card-border rounded-xl p-12 text-center">
          <Bell size={32} className="text-gray mx-auto mb-3" />
          <p className="text-foreground font-medium">No alerts</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`bg-card border rounded-xl p-4 flex items-center gap-4 ${
                alert.is_resolved ? "border-card-border opacity-60" : severityStyles[alert.severity]?.split(" ")[2] || "border-card-border"
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                alert.is_resolved ? "bg-primary/10" : severityStyles[alert.severity]?.split(" ")[0] || "bg-card-border"
              }`}>
                {alert.is_resolved ? (
                  <CheckCircle2 size={20} className="text-primary" />
                ) : (
                  <Bell size={20} className={severityStyles[alert.severity]?.split(" ")[1] || "text-gray"} />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${severityStyles[alert.severity]?.split(" ").slice(0, 2).join(" ")}`}>
                    {alert.severity}
                  </span>
                  <span className="text-[10px] text-gray capitalize">{alert.alert_type}</span>
                </div>
                <p className="text-foreground text-sm mt-1">{alert.message}</p>
                <p className="text-gray text-[10px] mt-0.5">{alert.farm_name} • {new Date(alert.created_at).toLocaleString()}</p>
              </div>
              {!alert.is_resolved && (
                <button
                  onClick={() => resolveAlert(alert.id)}
                  className="text-xs text-primary hover:text-primary-light font-medium px-3 py-1.5 border border-primary/20 rounded-lg hover:bg-primary/5 transition-colors"
                >
                  Resolve
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

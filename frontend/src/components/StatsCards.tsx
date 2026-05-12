"use client";

import { Heart, HeartPulse, AlertTriangle, ShieldAlert, ShieldCheck } from "lucide-react";
import { useGetDashboardQuery } from "@/src/store/api/dashboardApi";

export default function StatsCards() {
  const { data } = useGetDashboardQuery();

  const stats = [
    {
      label: "Total Chickens",
      value: data?.total_chickens?.toLocaleString() ?? "—",
      sub: "Population count",
      icon: Heart,
      color: "text-primary",
      iconBg: "bg-primary/10",
      border: "border-primary/20",
    },
    {
      label: "Healthy Chickens",
      value: data?.healthy_chickens?.toLocaleString() ?? "—",
      sub: data ? `${((data.healthy_chickens / (data.total_detections || 1)) * 100).toFixed(1)}% of detected` : "",
      icon: HeartPulse,
      color: "text-primary",
      iconBg: "bg-primary/10",
      border: "border-primary/20",
    },
    {
      label: "Abnormal Detected",
      value: data?.abnormal_chickens?.toLocaleString() ?? "—",
      sub: "Require attention",
      icon: AlertTriangle,
      color: "text-yellow-400",
      iconBg: "bg-yellow-500/10",
      border: "border-yellow-500/20",
    },
    {
      label: "Active Alerts",
      value: data?.unresolved_alerts_count?.toString() ?? "—",
      sub: "Unresolved",
      icon: ShieldAlert,
      color: "text-red-400",
      iconBg: "bg-red-500/10",
      border: "border-red-500/20",
    },
    {
      label: "Farm Status",
      value: data && data.unresolved_alerts_count === 0 ? "Good" : data ? "Attention" : "—",
      sub: data?.farms_count ? `${data.farms_count} farm(s)` : "",
      icon: ShieldCheck,
      color: "text-primary",
      iconBg: "bg-primary/10",
      border: "border-primary/20",
    },
  ];

  return (
    <div className="grid grid-cols-5 gap-3">
      {stats.map((s) => (
        <div key={s.label} className={`bg-card border ${s.border} rounded-xl p-4 flex items-start justify-between`}>
          <div>
            <p className={`text-xs font-medium mb-2 ${s.color}`}>{s.label}</p>
            <p className="text-foreground text-2xl font-bold">{s.value}</p>
            <p className="text-gray text-[10px] mt-1">{s.sub}</p>
          </div>
          <div className={`w-10 h-10 rounded-full ${s.iconBg} flex items-center justify-center shrink-0`}>
            <s.icon size={20} className={s.color} />
          </div>
        </div>
      ))}
    </div>
  );
}

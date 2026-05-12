"use client";

import { useGetDashboardQuery } from "@/src/store/api/dashboardApi";
import { useGetDetectionsQuery } from "@/src/store/api/detectionsApi";
import { FileBarChart, TrendingUp, TrendingDown } from "lucide-react";

export default function ReportsPage() {
  const { data: dashboard } = useGetDashboardQuery();
  const { data: detections } = useGetDetectionsQuery({});

  const totalDetections = detections?.count ?? 0;
  const healthRate = dashboard && dashboard.total_detections > 0
    ? ((dashboard.healthy_chickens / dashboard.total_detections) * 100).toFixed(1)
    : "0";

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-foreground text-xl font-bold">Reports</h1>
        <p className="text-gray text-xs mt-0.5">Farm performance analytics</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card border border-card-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-gray text-xs font-medium">Health Rate</p>
            <TrendingUp size={16} className="text-primary" />
          </div>
          <p className="text-foreground text-2xl font-bold">{healthRate}%</p>
          <p className="text-primary text-[10px] mt-1">Healthy population</p>
        </div>
        <div className="bg-card border border-card-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-gray text-xs font-medium">Total Detections</p>
            <FileBarChart size={16} className="text-primary" />
          </div>
          <p className="text-foreground text-2xl font-bold">{totalDetections}</p>
          <p className="text-gray text-[10px] mt-1">All time</p>
        </div>
        <div className="bg-card border border-card-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-gray text-xs font-medium">Abnormal Rate</p>
            <TrendingDown size={16} className="text-red-400" />
          </div>
          <p className="text-foreground text-2xl font-bold">
            {dashboard && dashboard.total_detections > 0
              ? ((dashboard.abnormal_chickens / dashboard.total_detections) * 100).toFixed(1)
              : "0"}%
          </p>
          <p className="text-red-400 text-[10px] mt-1">Needs monitoring</p>
        </div>
      </div>

      <div className="bg-card border border-card-border rounded-xl p-5">
        <h3 className="text-foreground font-semibold text-sm mb-4">Summary</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-background border border-border rounded-lg p-4">
            <p className="text-gray text-xs mb-1">Total Chickens</p>
            <p className="text-foreground text-xl font-bold">{dashboard?.total_chickens?.toLocaleString() ?? "—"}</p>
          </div>
          <div className="bg-background border border-border rounded-lg p-4">
            <p className="text-gray text-xs mb-1">Active Farms</p>
            <p className="text-foreground text-xl font-bold">{dashboard?.farms_count ?? "—"}</p>
          </div>
          <div className="bg-background border border-border rounded-lg p-4">
            <p className="text-gray text-xs mb-1">Healthy Chickens</p>
            <p className="text-primary text-xl font-bold">{dashboard?.healthy_chickens?.toLocaleString() ?? "—"}</p>
          </div>
          <div className="bg-background border border-border rounded-lg p-4">
            <p className="text-gray text-xs mb-1">Unresolved Alerts</p>
            <p className="text-red-400 text-xl font-bold">{dashboard?.unresolved_alerts_count ?? "—"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

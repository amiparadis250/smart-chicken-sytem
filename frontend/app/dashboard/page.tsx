"use client";

import StatsCards from "@/src/components/StatsCards";
import HealthTrendChart from "@/src/components/HealthTrendChart";
import AIDetectionFeed from "@/src/components/AIDetectionFeed";
import BottomPanels from "@/src/components/BottomPanels";
import { useGetDashboardQuery } from "@/src/store/api/dashboardApi";

export default function DashboardPage() {
  const { isLoading } = useGetDashboardQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground text-xl font-bold">Operational Intelligence</h1>
          <p className="text-gray text-xs mt-0.5">Precision monitoring • Last sync 2s ago</p>
        </div>
        <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="text-primary text-xs font-semibold">SYSTEM ONLINE</span>
        </div>
      </div>

      <StatsCards />

      <div className="flex gap-4">
        <HealthTrendChart />
        <AIDetectionFeed />
      </div>

      <BottomPanels />
    </div>
  );
}

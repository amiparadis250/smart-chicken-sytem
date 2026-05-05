import StatsCards from "@/src/components/StatsCards";
import HealthTrendChart from "@/src/components/HealthTrendChart";
import AIDetectionFeed from "@/src/components/AIDetectionFeed";
import BottomPanels from "@/src/components/BottomPanels";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#E5E2E3] text-xl font-bold">Operational Intelligence</h1>
          <p className="text-gray text-xs mt-0.5">
            Precision monitoring for Zone A-12 • Last sync 2s ago
          </p>
        </div>
        <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="text-primary text-xs font-semibold">SYSTEM ONLINE</span>
        </div>
      </div>

      {/* Stats */}
      <StatsCards />

      {/* Chart + AI Feed */}
      <div className="flex gap-4">
        <HealthTrendChart />
        <AIDetectionFeed />
      </div>

      {/* Bottom Panels */}
      <BottomPanels />
    </div>
  );
}

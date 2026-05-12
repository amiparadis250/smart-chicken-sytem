"use client";

import Link from "next/link";
import StatsCards from "@/src/components/StatsCards";
import HealthTrendChart from "@/src/components/HealthTrendChart";
import AIDetectionFeed from "@/src/components/AIDetectionFeed";
import BottomPanels from "@/src/components/BottomPanels";
import { useGetDashboardQuery } from "@/src/store/api/dashboardApi";
import { useGetFarmsQuery } from "@/src/store/api/farmsApi";
import { Warehouse, Satellite, Camera, ArrowRight, Plus } from "lucide-react";

export default function DashboardPage() {
  const { data: dashboard, isLoading, error } = useGetDashboardQuery();
  const { data: farms } = useGetFarmsQuery();

  const hasFarms = farms && farms.results && farms.results.length > 0;
  const hasData = dashboard && dashboard.total_chickens > 0;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Empty state — no farms or no data yet
  if (!hasFarms || !hasData) {
    return (
      <div className="flex flex-col gap-6">
        {/* Welcome Header */}
        <div>
          <h1 className="text-foreground text-2xl font-bold">Welcome to Smart Chicken Farm System</h1>
          <p className="text-gray text-sm mt-1">Let&apos;s get your farm set up and connected.</p>
        </div>

        {/* Setup Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Step 1: Create Farm */}
          <div className={`bg-card border rounded-xl p-6 ${hasFarms ? "border-primary/30" : "border-primary"}`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${hasFarms ? "bg-primary/20" : "bg-primary"}`}>
                {hasFarms ? (
                  <span className="text-primary text-lg">✓</span>
                ) : (
                  <Warehouse size={20} className="text-[#003824]" />
                )}
              </div>
              <span className="text-gray text-xs font-medium">Step 1</span>
            </div>
            <h3 className="text-foreground font-semibold text-lg">Create a Farm</h3>
            <p className="text-gray text-sm mt-2 leading-relaxed">
              Add your farm with location and chicken count to start tracking.
            </p>
            {!hasFarms ? (
              <Link href="/dashboard/farms" className="inline-flex items-center gap-2 mt-4 bg-primary hover:bg-primary-light text-[#003824] font-semibold text-sm px-4 py-2 rounded-lg transition-all">
                <Plus size={14} /> Add Farm
              </Link>
            ) : (
              <p className="text-primary text-sm mt-4 font-medium">✓ Farm created</p>
            )}
          </div>

          {/* Step 2: Connect Devices */}
          <div className="bg-card border border-card-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-card-border flex items-center justify-center">
                <Camera size={20} className="text-gray" />
              </div>
              <span className="text-gray text-xs font-medium">Step 2</span>
            </div>
            <h3 className="text-foreground font-semibold text-lg">Connect Devices</h3>
            <p className="text-gray text-sm mt-2 leading-relaxed">
              Add your IP cameras and IoT sensors (DHT22, MQ135) to enable monitoring.
            </p>
            <Link href="/dashboard/devices" className="inline-flex items-center gap-2 mt-4 border border-card-border hover:border-primary/30 text-foreground text-sm font-medium px-4 py-2 rounded-lg transition-colors">
              Add Devices <ArrowRight size={14} />
            </Link>
          </div>

          {/* Step 3: Start Monitoring */}
          <div className="bg-card border border-card-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-card-border flex items-center justify-center">
                <Satellite size={20} className="text-gray" />
              </div>
              <span className="text-gray text-xs font-medium">Step 3</span>
            </div>
            <h3 className="text-foreground font-semibold text-lg">Start Monitoring</h3>
            <p className="text-gray text-sm mt-2 leading-relaxed">
              Once connected, sensor data and AI detections will appear here automatically.
            </p>
            <span className="inline-block mt-4 text-gray text-sm">Waiting for data...</span>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-card border border-card-border rounded-xl p-6">
          <h3 className="text-foreground font-semibold text-base mb-4">System Status</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-background border border-border rounded-lg p-4 text-center">
              <p className="text-foreground text-2xl font-bold">{farms?.results?.length ?? 0}</p>
              <p className="text-gray text-sm mt-1">Farms</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4 text-center">
              <p className="text-foreground text-2xl font-bold">0</p>
              <p className="text-gray text-sm mt-1">Devices Online</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4 text-center">
              <p className="text-foreground text-2xl font-bold">0</p>
              <p className="text-gray text-sm mt-1">Sensor Readings</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4 text-center">
              <p className="text-foreground text-2xl font-bold">0</p>
              <p className="text-gray text-sm mt-1">AI Detections</p>
            </div>
          </div>
        </div>

        {/* Quick Info */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <span className="text-lg">💡</span>
          </div>
          <div>
            <p className="text-foreground font-medium text-sm">How it works</p>
            <p className="text-gray text-sm mt-1 leading-relaxed">
              Connect your Raspberry Pi with cameras and sensors to your farm network. 
              The system will automatically start collecting data, running AI analysis, 
              and populating this dashboard with real-time insights.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Normal dashboard with data
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground text-xl font-bold">Operational Intelligence</h1>
          <p className="text-gray text-sm mt-0.5">Precision monitoring • Last sync 2s ago</p>
        </div>
        <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="text-primary text-sm font-semibold">SYSTEM ONLINE</span>
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

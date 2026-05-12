"use client";

import { Menu, Bell, ChevronDown, MapPin } from "lucide-react";
import { useGetProfileQuery } from "@/src/store/api/authApi";
import { useGetDashboardQuery } from "@/src/store/api/dashboardApi";

export default function TopBar() {
  const { data: profile } = useGetProfileQuery();
  const { data: dashboard } = useGetDashboardQuery();

  return (
    <header className="h-14 bg-[#121214] border-b border-border flex items-center justify-between px-5 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button className="text-gray hover:text-foreground"><Menu size={20} /></button>
        <div className="flex items-center gap-2 bg-card border border-card-border rounded-lg px-3 py-1.5 cursor-pointer hover:border-primary/30 transition-colors">
          <MapPin size={14} className="text-primary" />
          <span className="text-foreground text-sm">{profile?.farm_name || "Select Farm"}</span>
          <ChevronDown size={14} className="text-gray" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="text-gray hover:text-foreground relative">
          <Bell size={20} />
          {dashboard && dashboard.unresolved_alerts_count > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {dashboard.unresolved_alerts_count}
            </span>
          )}
        </button>
        <div className="flex items-center gap-2.5 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-dark-green" />
          <div>
            <p className="text-foreground text-sm font-medium leading-tight">
              {profile ? `${profile.first_name} ${profile.last_name}` : "Loading..."}
            </p>
            <p className="text-gray text-[10px]">Farm Owner</p>
          </div>
          <ChevronDown size={14} className="text-gray" />
        </div>
      </div>
    </header>
  );
}

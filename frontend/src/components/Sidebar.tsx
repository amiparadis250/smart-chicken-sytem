"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Eye, Activity, Bell, Warehouse,
  HelpCircle, LogOut, Plus,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Live Monitoring", href: "/dashboard/monitoring", icon: Eye },
  { label: "Sensor Analytics", href: "/dashboard/sensors", icon: Activity },
  { label: "Alerts", href: "/dashboard/alerts", icon: Bell },
  { label: "Farms", href: "/dashboard/farms", icon: Warehouse },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 bg-[#0d0d0f] flex flex-col justify-between h-screen sticky top-0 border-r border-border">
      <div>
        {/* Brand */}
        <div className="px-5 pt-5 pb-6">
          <p className="text-primary text-sm font-bold">Precision Vitality</p>
        </div>

        {/* User */}
        <div className="px-5 pb-5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-dark-green border border-primary/20" />
          <div>
            <p className="text-foreground text-sm font-semibold leading-tight">GLOBAL OPS</p>
            <p className="text-gray text-[10px]">Precision Vitality</p>
          </div>
        </div>

        {/* New Analysis Button */}
        <div className="px-4 pb-5">
          <button className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-light text-[#003824] font-semibold text-sm py-2.5 rounded-lg transition-colors">
            <Plus size={16} /> New Analysis
          </button>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-0.5 px-3">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "text-primary border-l-2 border-primary bg-primary/5"
                    : "text-gray hover:text-foreground hover:bg-white/[0.03]"
                }`}
              >
                <item.icon size={17} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom */}
      <div className="px-3 pb-5 flex flex-col gap-1">
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray hover:text-foreground hover:bg-white/[0.03] transition-colors w-full">
          <HelpCircle size={17} /> Support
        </button>
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray hover:text-foreground hover:bg-white/[0.03] transition-colors w-full">
          <LogOut size={17} /> Logout
        </button>
      </div>
    </aside>
  );
}

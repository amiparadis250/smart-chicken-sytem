"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppDispatch } from "@/src/store/hooks";
import { logout } from "@/src/store/authSlice";
import {
  LayoutDashboard, Eye, ScanSearch, Bug, Bell,
  Warehouse, Satellite, FileBarChart, MonitorSmartphone,
  Settings, HelpCircle,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Live Monitoring", href: "/dashboard/monitoring", icon: Eye },
  { label: "AI Detections", href: "/dashboard/detections", icon: ScanSearch },
  { label: "Problems", href: "/dashboard/problems", icon: Bug, badge: 5 },
  { label: "Alerts", href: "/dashboard/alerts", icon: Bell, badge: 12 },
  { label: "Farms", href: "/dashboard/farms", icon: Warehouse },
  { label: "Sensors", href: "/dashboard/sensors", icon: Satellite },
  { label: "Reports", href: "/dashboard/reports", icon: FileBarChart },
  { label: "Devices", href: "/dashboard/devices", icon: MonitorSmartphone },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  return (
    <aside className="w-52 bg-[#121214] flex flex-col justify-between h-screen sticky top-0 border-r border-border">
      <div>
        <div className="px-4 pt-4 pb-5 flex items-center gap-2.5">
          <span className="text-2xl">🐔</span>
          <div>
            <p className="text-foreground text-sm font-bold leading-tight">Smart Chicken</p>
            <p className="text-gray text-[10px]">Farm System</p>
          </div>
        </div>
        <nav className="flex flex-col gap-0.5 px-2">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors ${
                  active ? "text-white bg-primary" : "text-gray hover:text-foreground hover:bg-white/[0.03]"
                }`}
              >
                <item.icon size={16} />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    active ? "bg-white/20 text-white" : "bg-red-500/20 text-red-400"
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="px-3 pb-4 flex flex-col gap-3">
        <div className="bg-card border border-card-border rounded-xl p-3 text-center">
          <div className="text-2xl mb-1">🧬</div>
          <p className="text-foreground text-xs font-semibold">AI System Status</p>
          <div className="flex items-center justify-center gap-1 mt-1">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            <span className="text-primary text-[10px] font-bold">RUNNING</span>
          </div>
          <p className="text-gray text-[10px] mt-0.5">All systems operational</p>
        </div>
        <div className="bg-card border border-card-border rounded-xl p-3 flex items-center gap-2.5">
          <HelpCircle size={16} className="text-gray shrink-0" />
          <div>
            <p className="text-foreground text-xs font-medium">Need Help?</p>
            <p className="text-gray text-[10px]">Contact Support</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

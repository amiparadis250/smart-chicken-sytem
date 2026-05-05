"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Radio,
  BarChart3,
  Bell,
  Warehouse,
  HelpCircle,
  LogOut,
  Plus,
} from "lucide-react";

const navItems = [
  { label: "DASHBOARD", href: "/dashboard", icon: LayoutDashboard },
  { label: "LIVE MONITORING", href: "/dashboard/monitoring", icon: Radio },
  { label: "SENSOR ANALYTICS", href: "/dashboard/sensors", icon: BarChart3 },
  { label: "ALERTS", href: "/dashboard/alerts", icon: Bell },
  { label: "FARMS", href: "/dashboard/farms", icon: Warehouse },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 bg-[#121214] flex flex-col justify-between h-screen sticky top-0 border-r border-[#1A1A1C]">
      <div>
        <div className="px-5 pt-5 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary text-sm font-bold">PV</span>
            </div>
            <div>
              <p className="text-xs text-gray uppercase tracking-wider">Global Ops</p>
              <p className="text-[11px] text-gray/60">Precision Vitality</p>
            </div>
          </div>
        </div>

        <div className="px-4 mb-6">
          <button className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-light text-[#003824] font-semibold text-sm py-2.5 rounded-lg transition-colors">
            <Plus size={16} strokeWidth={2.5} />
            New Analysis
          </button>
        </div>

        <nav className="flex flex-col gap-1 px-3">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors relative ${
                  active
                    ? "text-primary bg-primary/5"
                    : "text-gray hover:text-[#E5E2E3] hover:bg-white/[0.03]"
                }`}
              >
                {active && (
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-primary rounded-l" />
                )}
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="px-3 pb-5 flex flex-col gap-1">
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium text-gray hover:text-[#E5E2E3] hover:bg-white/[0.03] transition-colors">
          <HelpCircle size={18} />
          SUPPORT
        </button>
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium text-gray hover:text-[#E5E2E3] hover:bg-white/[0.03] transition-colors">
          <LogOut size={18} />
          LOGOUT
        </button>
      </div>
    </aside>
  );
}

"use client";

import { Search, Bell, LayoutGrid } from "lucide-react";

export default function TopBar() {
  return (
    <header className="h-14 bg-[#121214] border-b border-[#1A1A1C] flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-6">
        <span className="text-primary font-bold text-lg tracking-tight">Precision Vitality</span>
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray" />
          <input
            type="text"
            placeholder="Search parameters..."
            className="bg-[#1A1A1C] border border-[#2a2a2e] rounded-lg pl-9 pr-4 py-1.5 text-sm text-[#E5E2E3] placeholder:text-gray/50 w-64 focus:outline-none focus:border-primary/40"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-gray hover:text-[#E5E2E3] transition-colors relative">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
        </button>
        <button className="text-gray hover:text-[#E5E2E3] transition-colors">
          <LayoutGrid size={20} />
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-dark-green" />
      </div>
    </header>
  );
}

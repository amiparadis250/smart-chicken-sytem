"use client";

import { Search, Bell, Grid3X3 } from "lucide-react";

export default function TopBar() {
  return (
    <header className="h-14 bg-[#0d0d0f] border-b border-border flex items-center justify-between px-5 sticky top-0 z-50">
      <div className="flex items-center gap-3 flex-1">
        <div className="relative w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray" />
          <input
            type="text"
            placeholder="Search parameters..."
            className="w-full bg-card border border-card-border rounded-lg pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-gray/50 focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="text-gray hover:text-foreground relative">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
        </button>
        <button className="text-gray hover:text-foreground">
          <Grid3X3 size={20} />
        </button>
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-dark-green border-2 border-primary/30 cursor-pointer" />
      </div>
    </header>
  );
}

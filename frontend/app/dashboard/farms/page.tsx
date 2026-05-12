"use client";

import { useState } from "react";
import { Warehouse, MapPin, Search, Users, Activity } from "lucide-react";

const farms = [
  { id: 1, name: "Mugabo Poultry Farm", owner: "Jean Mugabo", location: "Nyarugenge, Kigali", chickens: 1200, devices: 3, status: "active", created: "2025-01-15" },
  { id: 2, name: "Mugabo Extension Site", owner: "Jean Mugabo", location: "Gasabo, Kigali", chickens: 800, devices: 3, status: "active", created: "2025-02-20" },
  { id: 3, name: "Uwimana Chicken Ranch", owner: "Alice Uwimana", location: "Huye, Southern Province", chickens: 2000, devices: 3, status: "active", created: "2025-01-08" },
  { id: 4, name: "Niyonzima Livestock", owner: "Patrick Niyonzima", location: "Musanze, Northern Province", chickens: 500, devices: 3, status: "active", created: "2025-03-01" },
  { id: 5, name: "Keza Broiler Unit", owner: "Jean Mugabo", location: "Kicukiro, Kigali", chickens: 3500, devices: 5, status: "active", created: "2025-04-10" },
  { id: 6, name: "Ingabo Free Range", owner: "Alice Uwimana", location: "Nyanza, Southern Province", chickens: 600, devices: 2, status: "inactive", created: "2024-11-22" },
  { id: 7, name: "Sunrise Layers Farm", owner: "Patrick Niyonzima", location: "Rubavu, Western Province", chickens: 1500, devices: 4, status: "active", created: "2025-02-14" },
  { id: 8, name: "Green Valley Poultry", owner: "Alice Uwimana", location: "Muhanga, Southern Province", chickens: 900, devices: 3, status: "active", created: "2025-03-28" },
];

export default function FarmsPage() {
  const [search, setSearch] = useState("");
  const [ownerFilter, setOwnerFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = farms.filter((f) => {
    if (search && !f.name.toLowerCase().includes(search.toLowerCase()) && !f.location.toLowerCase().includes(search.toLowerCase())) return false;
    if (ownerFilter !== "all" && f.owner !== ownerFilter) return false;
    if (statusFilter !== "all" && f.status !== statusFilter) return false;
    return true;
  });

  const totalFarms = farms.length;
  const totalChickens = farms.reduce((a, f) => a + f.chickens, 0);
  const activeFarms = farms.filter((f) => f.status === "active").length;
  const totalDevices = farms.reduce((a, f) => a + f.devices, 0);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-foreground text-xl font-bold">Farms</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-card border border-card-border rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><Warehouse size={20} className="text-primary" /></div>
          <div><p className="text-foreground text-lg font-bold">{totalFarms}</p><p className="text-gray text-[10px]">Total Farms</p></div>
        </div>
        <div className="bg-card border border-card-border rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center"><Users size={20} className="text-blue-400" /></div>
          <div><p className="text-foreground text-lg font-bold">{totalChickens.toLocaleString()}</p><p className="text-gray text-[10px]">Total Chickens</p></div>
        </div>
        <div className="bg-card border border-card-border rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><Activity size={20} className="text-primary" /></div>
          <div><p className="text-foreground text-lg font-bold">{activeFarms}</p><p className="text-gray text-[10px]">Active Farms</p></div>
        </div>
        <div className="bg-card border border-card-border rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center"><MapPin size={20} className="text-orange-400" /></div>
          <div><p className="text-foreground text-lg font-bold">{totalDevices}</p><p className="text-gray text-[10px]">Total Devices</p></div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card border border-card-border rounded-xl p-4 flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search farms or location..." className="w-full bg-background border border-card-border rounded-lg pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-gray/50 focus:outline-none focus:border-primary/50" />
        </div>
        <select value={ownerFilter} onChange={(e) => setOwnerFilter(e.target.value)} className="bg-background border border-card-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50">
          <option value="all">All Owners</option>
          <option value="Jean Mugabo">Jean Mugabo</option>
          <option value="Alice Uwimana">Alice Uwimana</option>
          <option value="Patrick Niyonzima">Patrick Niyonzima</option>
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-background border border-card-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50">
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-card border border-card-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-background/50">
              <th className="text-left text-gray text-xs font-medium py-3 px-4">Farm Name</th>
              <th className="text-left text-gray text-xs font-medium py-3 px-4">Owner</th>
              <th className="text-left text-gray text-xs font-medium py-3 px-4">Location</th>
              <th className="text-left text-gray text-xs font-medium py-3 px-4">Chickens</th>
              <th className="text-left text-gray text-xs font-medium py-3 px-4">Devices</th>
              <th className="text-left text-gray text-xs font-medium py-3 px-4">Status</th>
              <th className="text-left text-gray text-xs font-medium py-3 px-4">Created</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((f) => (
              <tr key={f.id} className="border-b border-border/30 hover:bg-background/30 transition-colors">
                <td className="py-3 px-4 text-foreground text-xs font-medium">{f.name}</td>
                <td className="py-3 px-4 text-gray text-xs">{f.owner}</td>
                <td className="py-3 px-4 text-gray text-xs">{f.location}</td>
                <td className="py-3 px-4 text-foreground text-xs font-medium">{f.chickens.toLocaleString()}</td>
                <td className="py-3 px-4 text-foreground text-xs">{f.devices}</td>
                <td className="py-3 px-4"><span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${f.status === "active" ? "bg-primary/10 text-primary" : "bg-red-500/10 text-red-400"}`}>{f.status}</span></td>
                <td className="py-3 px-4 text-gray text-xs">{f.created}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="text-gray text-xs text-center py-8">No farms match your filters</p>}
      </div>
    </div>
  );
}

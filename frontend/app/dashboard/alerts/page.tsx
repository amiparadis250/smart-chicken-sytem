"use client";

import { useState } from "react";
import { Bell, AlertTriangle, CheckCircle2, XCircle, Search } from "lucide-react";

const alerts = [
  { id: 1, farm: "Mugabo Poultry Farm", type: "sensor", severity: "critical", message: "Temperature too high: 36.2°C", resolved: false, date: "2025-05-12 14:02" },
  { id: 2, farm: "Mugabo Poultry Farm", type: "ai", severity: "high", message: "Abnormal chicken behavior detected in Zone A", resolved: false, date: "2025-05-12 13:45" },
  { id: 3, farm: "Uwimana Chicken Ranch", type: "sensor", severity: "medium", message: "Humidity too low: 38%", resolved: false, date: "2025-05-12 12:30" },
  { id: 4, farm: "Uwimana Chicken Ranch", type: "sensor", severity: "critical", message: "Gas level too high: 58 ppm", resolved: true, date: "2025-05-12 11:15" },
  { id: 5, farm: "Niyonzima Livestock", type: "ai", severity: "high", message: "Possible respiratory distress identified", resolved: false, date: "2025-05-12 10:50" },
  { id: 6, farm: "Mugabo Extension Site", type: "sensor", severity: "low", message: "Temperature too low: 16.5°C", resolved: true, date: "2025-05-12 09:20" },
  { id: 7, farm: "Niyonzima Livestock", type: "ai", severity: "medium", message: "Unusual clustering pattern — potential disease spread", resolved: true, date: "2025-05-11 22:10" },
  { id: 8, farm: "Mugabo Poultry Farm", type: "sensor", severity: "high", message: "Humidity too high: 82%", resolved: false, date: "2025-05-11 20:45" },
  { id: 9, farm: "Uwimana Chicken Ranch", type: "ai", severity: "critical", message: "Mortality event detected by camera", resolved: true, date: "2025-05-11 18:30" },
  { id: 10, farm: "Mugabo Extension Site", type: "sensor", severity: "low", message: "Temperature slightly below threshold: 17.8°C", resolved: true, date: "2025-05-11 16:00" },
];

const severityColor: Record<string, string> = {
  critical: "bg-red-500/10 text-red-400",
  high: "bg-orange-500/10 text-orange-400",
  medium: "bg-yellow-500/10 text-yellow-400",
  low: "bg-blue-500/10 text-blue-400",
};

export default function AlertsPage() {
  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = alerts.filter((a) => {
    if (search && !a.message.toLowerCase().includes(search.toLowerCase()) && !a.farm.toLowerCase().includes(search.toLowerCase())) return false;
    if (severityFilter !== "all" && a.severity !== severityFilter) return false;
    if (typeFilter !== "all" && a.type !== typeFilter) return false;
    if (statusFilter === "resolved" && !a.resolved) return false;
    if (statusFilter === "unresolved" && a.resolved) return false;
    return true;
  });

  const total = alerts.length;
  const critical = alerts.filter((a) => a.severity === "critical").length;
  const unresolved = alerts.filter((a) => !a.resolved).length;
  const resolved = alerts.filter((a) => a.resolved).length;

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-foreground text-xl font-bold">Alerts</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-card border border-card-border rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><Bell size={20} className="text-primary" /></div>
          <div><p className="text-foreground text-lg font-bold">{total}</p><p className="text-gray text-[10px]">Total Alerts</p></div>
        </div>
        <div className="bg-card border border-card-border rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center"><XCircle size={20} className="text-red-400" /></div>
          <div><p className="text-foreground text-lg font-bold">{critical}</p><p className="text-gray text-[10px]">Critical</p></div>
        </div>
        <div className="bg-card border border-card-border rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center"><AlertTriangle size={20} className="text-yellow-400" /></div>
          <div><p className="text-foreground text-lg font-bold">{unresolved}</p><p className="text-gray text-[10px]">Unresolved</p></div>
        </div>
        <div className="bg-card border border-card-border rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><CheckCircle2 size={20} className="text-primary" /></div>
          <div><p className="text-foreground text-lg font-bold">{resolved}</p><p className="text-gray text-[10px]">Resolved</p></div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card border border-card-border rounded-xl p-4 flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search alerts..." className="w-full bg-background border border-card-border rounded-lg pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-gray/50 focus:outline-none focus:border-primary/50" />
        </div>
        <select value={severityFilter} onChange={(e) => setSeverityFilter(e.target.value)} className="bg-background border border-card-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50">
          <option value="all">All Severity</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="bg-background border border-card-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50">
          <option value="all">All Types</option>
          <option value="sensor">Sensor</option>
          <option value="ai">AI Detection</option>
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-background border border-card-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50">
          <option value="all">All Status</option>
          <option value="unresolved">Unresolved</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-card border border-card-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-background/50">
              <th className="text-left text-gray text-xs font-medium py-3 px-4">Farm</th>
              <th className="text-left text-gray text-xs font-medium py-3 px-4">Message</th>
              <th className="text-left text-gray text-xs font-medium py-3 px-4">Type</th>
              <th className="text-left text-gray text-xs font-medium py-3 px-4">Severity</th>
              <th className="text-left text-gray text-xs font-medium py-3 px-4">Status</th>
              <th className="text-left text-gray text-xs font-medium py-3 px-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr key={a.id} className="border-b border-border/30 hover:bg-background/30 transition-colors">
                <td className="py-3 px-4 text-foreground text-xs">{a.farm}</td>
                <td className="py-3 px-4 text-foreground text-xs max-w-[250px] truncate">{a.message}</td>
                <td className="py-3 px-4"><span className="text-[10px] uppercase font-bold text-gray bg-background px-2 py-0.5 rounded">{a.type}</span></td>
                <td className="py-3 px-4"><span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${severityColor[a.severity]}`}>{a.severity}</span></td>
                <td className="py-3 px-4"><span className={`text-[10px] font-bold px-2 py-0.5 rounded ${a.resolved ? "bg-primary/10 text-primary" : "bg-red-500/10 text-red-400"}`}>{a.resolved ? "Resolved" : "Active"}</span></td>
                <td className="py-3 px-4 text-gray text-xs">{a.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="text-gray text-xs text-center py-8">No alerts match your filters</p>}
      </div>
    </div>
  );
}

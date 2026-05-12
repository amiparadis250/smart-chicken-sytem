"use client";

import { useState, useMemo } from "react";
import { Thermometer, Droplets, Wind, AlertTriangle, Search } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, ReferenceArea } from "recharts";

const allSensorData = [
  { id: 1, farm: "Mugabo Poultry Farm", device: "Sensor Hub - Mugabo", temperature: 28.4, humidity: 62, gas: 22, status: "normal", date: "2025-05-12 14:00" },
  { id: 2, farm: "Mugabo Poultry Farm", device: "Sensor Hub - Mugabo", temperature: 36.2, humidity: 58, gas: 18, status: "warning", date: "2025-05-12 13:00" },
  { id: 3, farm: "Uwimana Chicken Ranch", device: "Sensor Hub - Uwimana", temperature: 25.1, humidity: 38, gas: 30, status: "warning", date: "2025-05-12 12:30" },
  { id: 4, farm: "Uwimana Chicken Ranch", device: "Sensor Hub - Uwimana", temperature: 27.8, humidity: 65, gas: 58, status: "critical", date: "2025-05-12 11:00" },
  { id: 5, farm: "Niyonzima Livestock", device: "Sensor Hub - Niyonz", temperature: 24.6, humidity: 55, gas: 15, status: "normal", date: "2025-05-12 10:00" },
  { id: 6, farm: "Niyonzima Livestock", device: "Sensor Hub - Niyonz", temperature: 23.9, humidity: 60, gas: 20, status: "normal", date: "2025-05-12 09:00" },
  { id: 7, farm: "Mugabo Extension Site", device: "Sensor Hub - Ext", temperature: 16.5, humidity: 72, gas: 12, status: "warning", date: "2025-05-12 08:00" },
  { id: 8, farm: "Mugabo Extension Site", device: "Sensor Hub - Ext", temperature: 22.0, humidity: 68, gas: 25, status: "normal", date: "2025-05-12 07:00" },
  { id: 9, farm: "Mugabo Poultry Farm", device: "Sensor Hub - Mugabo", temperature: 30.1, humidity: 52, gas: 35, status: "normal", date: "2025-05-11 18:00" },
  { id: 10, farm: "Uwimana Chicken Ranch", device: "Sensor Hub - Uwimana", temperature: 26.3, humidity: 82, gas: 28, status: "warning", date: "2025-05-11 15:00" },
  { id: 11, farm: "Niyonzima Livestock", device: "Sensor Hub - Niyonz", temperature: 25.0, humidity: 58, gas: 19, status: "normal", date: "2025-05-11 12:00" },
  { id: 12, farm: "Mugabo Extension Site", device: "Sensor Hub - Ext", temperature: 21.5, humidity: 70, gas: 14, status: "normal", date: "2025-05-11 09:00" },
  { id: 13, farm: "Mugabo Poultry Farm", device: "Sensor Hub - Mugabo", temperature: 29.0, humidity: 60, gas: 40, status: "normal", date: "2025-05-10 14:00" },
  { id: 14, farm: "Uwimana Chicken Ranch", device: "Sensor Hub - Uwimana", temperature: 34.8, humidity: 45, gas: 52, status: "critical", date: "2025-05-10 10:00" },
  { id: 15, farm: "Niyonzima Livestock", device: "Sensor Hub - Niyonz", temperature: 26.2, humidity: 63, gas: 18, status: "normal", date: "2025-05-09 16:00" },
  { id: 16, farm: "Mugabo Extension Site", device: "Sensor Hub - Ext", temperature: 19.8, humidity: 75, gas: 22, status: "normal", date: "2025-05-08 11:00" },
  { id: 17, farm: "Mugabo Poultry Farm", device: "Sensor Hub - Mugabo", temperature: 31.5, humidity: 50, gas: 48, status: "normal", date: "2025-05-07 13:00" },
  { id: 18, farm: "Uwimana Chicken Ranch", device: "Sensor Hub - Uwimana", temperature: 27.0, humidity: 67, gas: 25, status: "normal", date: "2025-05-06 09:00" },
];

const statusColor: Record<string, string> = {
  normal: "bg-primary/10 text-primary",
  warning: "bg-yellow-500/10 text-yellow-400",
  critical: "bg-red-500/10 text-red-400",
};

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-card-border rounded-lg px-3 py-2 shadow-lg">
      <p className="text-gray text-[10px] mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} className="text-foreground text-xs font-medium">
          {p.value} {p.dataKey === "temperature" ? "°C" : p.dataKey === "humidity" ? "%" : "ppm"}
        </p>
      ))}
    </div>
  );
}

function filterByTime(data: typeof allSensorData, range: string, from: string, to: string) {
  const now = new Date("2025-05-12T14:30:00");
  return data.filter((s) => {
    const d = new Date(s.date);
    if (range === "last_hour") return now.getTime() - d.getTime() <= 3600000;
    if (range === "today") return d.toDateString() === now.toDateString();
    if (range === "last_week") return now.getTime() - d.getTime() <= 7 * 86400000;
    if (range === "custom") {
      if (from && d < new Date(from)) return false;
      if (to && d > new Date(to + "T23:59:59")) return false;
    }
    return true;
  });
}

export default function SensorsPage() {
  const [search, setSearch] = useState("");
  const [farmFilter, setFarmFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [timeRange, setTimeRange] = useState("today");
  const [rangeFrom, setRangeFrom] = useState("");
  const [rangeTo, setRangeTo] = useState("");

  const timeFiltered = useMemo(
    () => filterByTime(allSensorData, timeRange, rangeFrom, rangeTo),
    [timeRange, rangeFrom, rangeTo]
  );

  const filtered = timeFiltered.filter((s) => {
    if (search && !s.farm.toLowerCase().includes(search.toLowerCase()) && !s.device.toLowerCase().includes(search.toLowerCase())) return false;
    if (farmFilter !== "all" && s.farm !== farmFilter) return false;
    if (statusFilter !== "all" && s.status !== statusFilter) return false;
    return true;
  });

  const chartData = useMemo(() => {
    return timeFiltered.slice().reverse().map((s) => ({
      time: s.date.split(" ")[1],
      temperature: s.temperature,
      humidity: s.humidity,
      gas: s.gas,
    }));
  }, [timeFiltered]);

  const avgTemp = timeFiltered.length ? (timeFiltered.reduce((a, s) => a + s.temperature, 0) / timeFiltered.length).toFixed(1) : "—";
  const avgHumidity = timeFiltered.length ? (timeFiltered.reduce((a, s) => a + s.humidity, 0) / timeFiltered.length).toFixed(0) : "—";
  const avgGas = timeFiltered.length ? (timeFiltered.reduce((a, s) => a + s.gas, 0) / timeFiltered.length).toFixed(0) : "—";
  const violations = timeFiltered.filter((s) => s.status !== "normal").length;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-foreground text-xl font-bold">Sensor Analytics</h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-card border border-card-border rounded-lg p-1">
            {(["last_hour", "today", "last_week", "custom"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${timeRange === r ? "bg-primary text-background" : "text-gray hover:text-foreground"}`}
              >
                {r === "last_hour" ? "Last Hour" : r === "today" ? "Today" : r === "last_week" ? "Last Week" : "Date Range"}
              </button>
            ))}
          </div>
          {timeRange === "custom" && (
            <div className="flex items-center gap-2">
              <input type="date" value={rangeFrom} onChange={(e) => setRangeFrom(e.target.value)} className="bg-background border border-card-border rounded-lg px-2 py-1.5 text-xs text-foreground focus:outline-none focus:border-primary/50" />
              <span className="text-gray text-xs">to</span>
              <input type="date" value={rangeTo} onChange={(e) => setRangeTo(e.target.value)} className="bg-background border border-card-border rounded-lg px-2 py-1.5 text-xs text-foreground focus:outline-none focus:border-primary/50" />
            </div>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-card border border-card-border rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><Thermometer size={20} className="text-primary" /></div>
          <div><p className="text-foreground text-lg font-bold">{avgTemp}°C</p><p className="text-gray text-[10px]">Avg Temperature</p></div>
        </div>
        <div className="bg-card border border-card-border rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center"><Droplets size={20} className="text-blue-400" /></div>
          <div><p className="text-foreground text-lg font-bold">{avgHumidity}%</p><p className="text-gray text-[10px]">Avg Humidity</p></div>
        </div>
        <div className="bg-card border border-card-border rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center"><Wind size={20} className="text-orange-400" /></div>
          <div><p className="text-foreground text-lg font-bold">{avgGas} ppm</p><p className="text-gray text-[10px]">Avg Gas Level</p></div>
        </div>
        <div className="bg-card border border-card-border rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center"><AlertTriangle size={20} className="text-red-400" /></div>
          <div><p className="text-foreground text-lg font-bold">{violations}</p><p className="text-gray text-[10px]">Violations</p></div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card border border-card-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-foreground text-sm font-semibold">Temperature</h3>
            <span className="text-[10px] text-gray">18°C - 35°C normal</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={chartData}>
              <defs><linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#10B981" stopOpacity={0.3} /><stop offset="100%" stopColor="#10B981" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f1f24" />
              <XAxis dataKey="time" tick={{ fontSize: 10, fill: "#a1a1aa" }} axisLine={false} tickLine={false} />
              <YAxis domain={[10, 40]} tick={{ fontSize: 10, fill: "#a1a1aa" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceArea y1={35} y2={40} fill="#ef4444" fillOpacity={0.08} />
              <ReferenceArea y1={10} y2={18} fill="#ef4444" fillOpacity={0.08} />
              <ReferenceLine y={35} stroke="#ef4444" strokeDasharray="4 4" strokeOpacity={0.6} />
              <ReferenceLine y={18} stroke="#ef4444" strokeDasharray="4 4" strokeOpacity={0.6} />
              <Area type="monotone" dataKey="temperature" stroke="#10B981" strokeWidth={2} fill="url(#tempGrad)" dot={false} activeDot={{ r: 4, fill: "#10B981" }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-foreground text-sm font-semibold">Humidity</h3>
            <span className="text-[10px] text-gray">40% - 80% normal</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={chartData}>
              <defs><linearGradient id="humidGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} /><stop offset="100%" stopColor="#3b82f6" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f1f24" />
              <XAxis dataKey="time" tick={{ fontSize: 10, fill: "#a1a1aa" }} axisLine={false} tickLine={false} />
              <YAxis domain={[30, 100]} tick={{ fontSize: 10, fill: "#a1a1aa" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceArea y1={80} y2={100} fill="#ef4444" fillOpacity={0.08} />
              <ReferenceArea y1={30} y2={40} fill="#ef4444" fillOpacity={0.08} />
              <ReferenceLine y={80} stroke="#ef4444" strokeDasharray="4 4" strokeOpacity={0.6} />
              <ReferenceLine y={40} stroke="#ef4444" strokeDasharray="4 4" strokeOpacity={0.6} />
              <Area type="monotone" dataKey="humidity" stroke="#3b82f6" strokeWidth={2} fill="url(#humidGrad)" dot={false} activeDot={{ r: 4, fill: "#3b82f6" }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-foreground text-sm font-semibold">Gas Level</h3>
            <span className="text-[10px] text-gray">&lt; 50 ppm normal</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={chartData}>
              <defs><linearGradient id="gasGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f97316" stopOpacity={0.3} /><stop offset="100%" stopColor="#f97316" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f1f24" />
              <XAxis dataKey="time" tick={{ fontSize: 10, fill: "#a1a1aa" }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 70]} tick={{ fontSize: 10, fill: "#a1a1aa" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceArea y1={50} y2={70} fill="#ef4444" fillOpacity={0.08} />
              <ReferenceLine y={50} stroke="#ef4444" strokeDasharray="4 4" strokeOpacity={0.6} />
              <Area type="monotone" dataKey="gas" stroke="#f97316" strokeWidth={2} fill="url(#gasGrad)" dot={false} activeDot={{ r: 4, fill: "#f97316" }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table Filters */}
      <div className="bg-card border border-card-border rounded-xl p-4 flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by farm or device..." className="w-full bg-background border border-card-border rounded-lg pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-gray/50 focus:outline-none focus:border-primary/50" />
        </div>
        <select value={farmFilter} onChange={(e) => setFarmFilter(e.target.value)} className="bg-background border border-card-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50">
          <option value="all">All Farms</option>
          <option value="Mugabo Poultry Farm">Mugabo Poultry Farm</option>
          <option value="Uwimana Chicken Ranch">Uwimana Chicken Ranch</option>
          <option value="Niyonzima Livestock">Niyonzima Livestock</option>
          <option value="Mugabo Extension Site">Mugabo Extension Site</option>
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-background border border-card-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50">
          <option value="all">All Status</option>
          <option value="normal">Normal</option>
          <option value="warning">Warning</option>
          <option value="critical">Critical</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-card border border-card-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-background/50">
              <th className="text-left text-gray text-xs font-medium py-3 px-4">Farm</th>
              <th className="text-left text-gray text-xs font-medium py-3 px-4">Device</th>
              <th className="text-left text-gray text-xs font-medium py-3 px-4">Temp</th>
              <th className="text-left text-gray text-xs font-medium py-3 px-4">Humidity</th>
              <th className="text-left text-gray text-xs font-medium py-3 px-4">Gas</th>
              <th className="text-left text-gray text-xs font-medium py-3 px-4">Status</th>
              <th className="text-left text-gray text-xs font-medium py-3 px-4">Recorded</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id} className="border-b border-border/30 hover:bg-background/30 transition-colors">
                <td className="py-3 px-4 text-foreground text-xs">{s.farm}</td>
                <td className="py-3 px-4 text-gray text-xs">{s.device}</td>
                <td className={`py-3 px-4 text-xs font-medium ${s.temperature > 35 || s.temperature < 18 ? "text-red-400" : "text-foreground"}`}>{s.temperature}°C</td>
                <td className={`py-3 px-4 text-xs font-medium ${s.humidity > 80 || s.humidity < 40 ? "text-yellow-400" : "text-foreground"}`}>{s.humidity}%</td>
                <td className={`py-3 px-4 text-xs font-medium ${s.gas > 50 ? "text-red-400" : "text-foreground"}`}>{s.gas} ppm</td>
                <td className="py-3 px-4"><span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${statusColor[s.status]}`}>{s.status}</span></td>
                <td className="py-3 px-4 text-gray text-xs">{s.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="text-gray text-xs text-center py-8">No readings match your filters</p>}
      </div>
    </div>
  );
}

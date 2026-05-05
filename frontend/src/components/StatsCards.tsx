const stats = [
  { label: "Total Population", value: "42,850", sub: "+1.2%", subColor: "text-primary" },
  { label: "Healthy Status", value: "42,712", sub: "99.6%", subColor: "text-primary" },
  { label: "Abnormal Detected", value: "138", sub: "+48h", subColor: "text-primary" },
  { label: "Active Sensors", value: "1,244", sub: "Node Cluster", subColor: "text-gray" },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="bg-[#1A1A1C] border border-[#2a2a2e] rounded-xl p-5"
        >
          <p className="text-gray text-xs font-medium mb-3">{s.label}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-[#E5E2E3] text-3xl font-bold tracking-tight">{s.value}</span>
            <span className={`text-xs font-medium ${s.subColor}`}>{s.sub}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

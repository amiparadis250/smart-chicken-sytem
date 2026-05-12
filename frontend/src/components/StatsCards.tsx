export default function StatsCards() {
  const stats = [
    { label: "Total Population", value: "42,850", sub: "+1.2%", color: "text-foreground" },
    { label: "Healthy Status", value: "42,712", sub: "99.6%", color: "text-primary" },
    { label: "Abnormal Detected", value: "138", sub: "+48h", color: "text-red-400" },
    { label: "Active Sensors", value: "1,244", sub: "Node Cluster", color: "text-primary" },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map((s) => (
        <div key={s.label} className="bg-card border border-card-border rounded-xl p-5">
          <p className={`text-xs font-medium ${s.color}`}>{s.label}</p>
          <div className="flex items-baseline gap-2 mt-2">
            <p className="text-foreground text-3xl font-bold">{s.value}</p>
            <span className="text-gray text-xs">{s.sub}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

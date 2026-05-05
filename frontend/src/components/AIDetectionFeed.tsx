import { CheckCircle2 } from "lucide-react";

const entries = [
  {
    tag: "Normal",
    tagColor: "bg-primary/20 text-primary",
    time: "14:22:01",
    text: "Thermal signature detected in Node 4. Temperature stabilizing at 24.2°C.",
  },
  {
    tag: "Anomaly",
    tagColor: "bg-yellow-500/20 text-yellow-400",
    time: "14:18:45",
    text: "Irregular movement pattern identified in Zone 3: Quadrant B. Automated isolation protocol suggested.",
    highlight: true,
  },
  {
    tag: "System",
    tagColor: "bg-gray/20 text-gray",
    time: "14:15:30",
    text: "Neural weights updated for Poultry Action Recognition Model v4.2.",
  },
];

export default function AIDetectionFeed() {
  return (
    <div className="bg-[#1A1A1C] border border-[#2a2a2e] rounded-xl p-5 w-80 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[#E5E2E3] font-semibold text-sm">AI Detection Feed</h3>
        <CheckCircle2 size={18} className="text-primary" />
      </div>

      <div className="flex flex-col gap-3 flex-1">
        {entries.map((e, i) => (
          <div
            key={i}
            className={`rounded-lg p-3 ${
              e.highlight
                ? "bg-primary/5 border border-primary/20"
                : "bg-[#121214]/60"
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${e.tagColor}`}>
                {e.tag}
              </span>
              <span className="text-[10px] text-gray">{e.time}</span>
            </div>
            <p className="text-xs text-[#E5E2E3]/80 leading-relaxed">{e.text}</p>
          </div>
        ))}
      </div>

      <button className="text-xs text-gray hover:text-[#E5E2E3] mt-4 self-end font-medium transition-colors">
        VIEW FULL LOG
      </button>
    </div>
  );
}

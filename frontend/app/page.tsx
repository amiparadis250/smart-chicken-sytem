"use client";

import Link from "next/link";
import {
  ScanSearch, BarChart3, Bell, Satellite, Cpu, Eye,
  ArrowRight, ArrowDown, CheckCircle2,
  Users, Egg, HeartPulse, Activity,
} from "lucide-react";

const capabilities = [
  { icon: ScanSearch, title: "Disease Detection", desc: "AI identifies Newcastle, Marek's disease, and respiratory distress in real-time with over 90% accuracy." },
  { icon: Eye, title: "Live Monitoring", desc: "24/7 camera surveillance tracks flock behavior, movement patterns, and feeding activity." },
  { icon: Users, title: "Chicken Counting", desc: "Automated population counting and tracking — know your exact numbers at any moment." },
  { icon: HeartPulse, title: "Health Classification", desc: "Each chicken is classified as healthy or abnormal based on posture, activity, and behavior." },
  { icon: Egg, title: "Lifecycle Tracking", desc: "Monitor nesting, egg-laying, gender classification, mortality, and market readiness automatically." },
  { icon: Satellite, title: "Environmental Sensing", desc: "Real-time temperature, humidity, and ammonia level monitoring with instant threshold alerts." },
  { icon: Bell, title: "Smart Alerts", desc: "Instant push notifications when anomalies are detected — disease, environmental hazards, or unusual behavior." },
  { icon: BarChart3, title: "Analytics & Reports", desc: "Track health trends, mortality rates, and farm performance over time with visual dashboards." },
];

const metrics = [
  { value: "90%+", label: "Detection Accuracy" },
  { value: "<30s", label: "Alert Response" },
  { value: "$200", label: "Hardware Cost" },
  { value: "24/7", label: "Monitoring" },
  { value: "50%", label: "Labor Reduction" },
  { value: "2-4mo", label: "ROI Payback" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-border/50 sticky top-0 glass z-50 animate-[slideDown_0.5s_ease-out]">
        <div className="flex items-center gap-2.5 animate-[fadeIn_0.8s_ease-out]">
          <span className="text-3xl animate-[bounce_2s_ease-in-out_infinite]">🐔</span>
          <span className="text-foreground font-bold text-xl">SCFS</span>
        </div>
        <div className="hidden md:flex items-center gap-8 animate-[fadeIn_1s_ease-out]">
          <a href="#what-we-do" className="text-gray hover:text-primary text-base transition-colors hover:-translate-y-0.5 transform duration-200">What We Do</a>
          <a href="#how-it-works" className="text-gray hover:text-primary text-base transition-colors hover:-translate-y-0.5 transform duration-200">How It Works</a>
          <a href="#impact" className="text-gray hover:text-primary text-base transition-colors hover:-translate-y-0.5 transform duration-200">Impact</a>
        </div>
        <div className="flex items-center gap-3 animate-[fadeIn_1.2s_ease-out]">
          <Link href="/login" className="text-gray hover:text-foreground text-base font-medium px-4 py-2 transition-colors">Sign In</Link>
          <Link href="/register" className="bg-primary hover:bg-primary-light text-[#003824] text-base font-semibold px-6 py-2.5 rounded-lg transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-105 transform duration-200">Get Started</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-glow flex flex-col items-center text-center px-6 pt-10 pb-10 relative min-h-[calc(100vh-73px)] justify-center">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-5 py-2 rounded-full mb-5">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-primary text-sm font-semibold tracking-wide">IoT + AI POWERED POULTRY MANAGEMENT</span>
          </div>

          <h1 className="text-foreground text-4xl md:text-6xl font-bold max-w-4xl leading-[1.1] tracking-tight">
            Monitor, Count, Detect &<br />Protect Your <span className="gradient-text">Entire Flock</span>
          </h1>
          <p className="text-gray text-lg md:text-xl mt-5 max-w-2xl mx-auto leading-relaxed">
            SCFS combines computer vision, IoT sensors, and edge AI to give you complete visibility — 
            from real-time counting to automated disease detection.
          </p>

          <div className="flex items-center justify-center gap-4 mt-7">
            <Link href="/register" className="flex items-center gap-2 bg-primary hover:bg-primary-light text-[#003824] font-semibold text-base px-7 py-3.5 rounded-lg transition-all hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              Start Monitoring <ArrowRight size={18} />
            </Link>
            <a href="#what-we-do" className="border border-card-border hover:border-primary/40 text-foreground font-medium text-base px-7 py-3.5 rounded-lg transition-all hover:bg-card">
              Learn More
            </a>
          </div>
        </div>

        {/* Metrics - visible without scrolling */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mt-10 w-full max-w-4xl relative">
          {metrics.map((m) => (
            <div key={m.label} className="bg-card/80 border border-card-border rounded-xl p-3 text-center hover:border-primary/30 transition-all hover:-translate-y-0.5">
              <p className="gradient-text text-xl font-bold">{m.value}</p>
              <p className="text-gray text-xs mt-1">{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What We Do */}
      <section id="what-we-do" className="px-8 py-24 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-primary text-sm font-bold uppercase tracking-widest">What We Do</span>
            <h2 className="text-foreground text-4xl md:text-5xl font-bold mt-4 tracking-tight">
              Complete Farm Intelligence
            </h2>
            <p className="text-gray text-lg mt-5 max-w-2xl mx-auto leading-relaxed">
              One affordable system that monitors, counts, detects, and protects — 
              bringing industrial-grade intelligence to smallholder farms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {capabilities.map((c) => (
              <div key={c.title} className="glow-card bg-card border border-card-border rounded-xl p-6 hover:border-primary/25 transition-all hover:-translate-y-0.5 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center mb-4 group-hover:from-primary/25 group-hover:to-primary/10 transition-all">
                  <c.icon size={22} className="text-primary" />
                </div>
                <h3 className="text-foreground font-semibold text-lg">{c.title}</h3>
                <p className="text-gray text-sm mt-2 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="px-8 py-24 border-t border-border/50 section-alt">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-bold uppercase tracking-widest">System Flow</span>
            <h2 className="text-foreground text-4xl md:text-5xl font-bold mt-4 tracking-tight">How It Works</h2>
            <p className="text-gray text-lg mt-5">From data capture to actionable insights — fully automated.</p>
          </div>

          {/* Flowchart */}
          <div className="flex flex-col items-center">
            {[
              { icon: Eye, title: "Data Capture", desc: "IP cameras record video feeds. DHT22 & MQ135 sensors collect temperature, humidity, and gas levels continuously.", num: "01" },
              { icon: Cpu, title: "Edge AI Processing", desc: "Raspberry Pi 4 runs YOLOv8 locally — counts chickens, classifies health, detects anomalies. No cloud needed.", num: "02" },
              { icon: ScanSearch, title: "Detection & Analysis", desc: "AI identifies diseases, counts population, tracks lifecycle events, and flags environmental violations in under 30 seconds.", num: "03" },
              { icon: Bell, title: "Alerts & Dashboard", desc: "Instant notifications pushed to your phone. Full analytics dashboard with real-time stats and recommendations.", num: "04" },
              { icon: Activity, title: "Action & Improvement", desc: "Farmer takes informed action — isolate sick birds, adjust ventilation, plan market timing. System learns over time.", num: "05" },
            ].map((step, i, arr) => (
              <div key={step.num} className="w-full">
                <div className={`w-full bg-card border rounded-xl p-6 flex items-center gap-5 transition-all hover:-translate-y-0.5 ${
                  i === arr.length - 1 ? "border-primary/25 bg-primary/[0.03]" : "border-card-border hover:border-primary/20"
                }`}>
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0">
                    <step.icon size={24} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-foreground font-semibold text-lg">{step.title}</p>
                    <p className="text-gray text-sm mt-1 leading-relaxed">{step.desc}</p>
                  </div>
                  <span className="text-primary/15 text-4xl font-bold">{step.num}</span>
                </div>

                {i < arr.length - 1 && (
                  <div className="flex flex-col items-center py-2">
                    <div className="w-px h-6 bg-gradient-to-b from-primary/40 to-primary/10" />
                    <ArrowDown size={16} className="text-primary/40" />
                  </div>
                )}
              </div>
            ))}
          </div>


        </div>
      </section>

      {/* Impact */}
      <section id="impact" className="px-8 py-24 border-t border-border/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-primary text-sm font-bold uppercase tracking-widest">Impact</span>
            <h2 className="text-foreground text-4xl md:text-5xl font-bold mt-4 tracking-tight">Why It Matters</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="glow-card bg-card border border-primary/20 rounded-xl p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
              <p className="gradient-text text-5xl font-bold relative">$200</p>
              <p className="text-foreground font-medium text-lg mt-3 relative">Total System Cost</p>
              <p className="text-gray text-sm mt-1 relative">vs $10,000+ commercial alternatives</p>
            </div>
            <div className="bg-card border border-card-border rounded-xl p-8 text-center hover:border-primary/20 transition-colors">
              <p className="text-foreground text-5xl font-bold">20-30%</p>
              <p className="text-foreground font-medium text-lg mt-3">Mortality Reduction</p>
              <p className="text-gray text-sm mt-1">Through early disease detection</p>
            </div>
            <div className="bg-card border border-card-border rounded-xl p-8 text-center hover:border-primary/20 transition-colors">
              <p className="text-foreground text-5xl font-bold">200-5K</p>
              <p className="text-foreground font-medium text-lg mt-3">Chickens Supported</p>
              <p className="text-gray text-sm mt-1">Scalable for small-to-medium farms</p>
            </div>
          </div>

          <div className="mt-8 bg-card border border-card-border rounded-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                "Real-time population counting — always know your exact numbers",
                "Early disease detection before outbreaks spread",
                "Automated lifecycle tracking reduces manual labor by 50%",
                "Environmental monitoring prevents heat stress and gas buildup",
                "ROI payback within 2-4 months of deployment",
                "Open-source — freely replicable across East Africa",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 size={14} className="text-primary" />
                  </div>
                  <p className="text-gray text-base leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-24 border-t border-border/50 section-alt relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/[0.03] to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative">
          <h2 className="text-foreground text-4xl md:text-5xl font-bold tracking-tight">Ready to Transform Your Farm?</h2>
          <p className="text-gray text-lg mt-5">Complete visibility over your flock. Setup takes less than a day.</p>
          <div className="flex items-center justify-center gap-4 mt-10">
            <Link href="/register" className="flex items-center gap-2 bg-primary hover:bg-primary-light text-[#003824] font-semibold text-lg px-8 py-4 rounded-lg transition-all hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              Get Started Free <ArrowRight size={18} />
            </Link>
            <Link href="/login" className="border border-card-border hover:border-primary/40 text-foreground font-medium text-lg px-8 py-4 rounded-lg transition-all hover:bg-card">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-8 border-t border-border/50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🐔</span>
            <span className="text-gray text-sm">Smart Chicken Farm System (SCFS)</span>
          </div>
          <p className="text-gray text-sm">University of Rwanda • College of Science & Technology • 2026</p>
        </div>
      </footer>
    </div>
  );
}

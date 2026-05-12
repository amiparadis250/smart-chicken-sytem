"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, MapPin, Share2, ChevronDown } from "lucide-react";

export default function RequestAccessPage() {
  const [form, setForm] = useState({
    full_name: "", organization: "", email: "", interest: "", details: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Mail size={28} className="text-primary" />
          </div>
          <h1 className="text-foreground text-2xl font-bold">Request Submitted</h1>
          <p className="text-gray text-sm mt-3 leading-relaxed">
            Your inquiry has been sent. Our team will reach out to you shortly.
          </p>
          <Link href="/login" className="inline-block mt-6 text-primary hover:text-primary-light text-sm font-medium">
            ← Back to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-border/50 sticky top-0 bg-[#09090b] z-50">
        <div className="flex items-center gap-2.5">
          <span className="text-3xl">🐔</span>
          <span className="text-foreground font-bold text-xl">SCFS</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/#what-we-do" className="text-gray hover:text-primary text-base transition-colors">What We Do</Link>
          <Link href="/#how-it-works" className="text-gray hover:text-primary text-base transition-colors">How It Works</Link>
          <Link href="/#impact" className="text-gray hover:text-primary text-base transition-colors">Impact</Link>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-gray hover:text-foreground text-base font-medium px-4 py-2 transition-colors">Sign In</Link>
          <Link href="/register" className="bg-primary hover:bg-primary-light text-[#003824] text-base font-semibold px-6 py-2.5 rounded-lg transition-all">Get Started</Link>
        </div>
      </nav>

      {/* Main */}
      <div className="flex-1 flex flex-col lg:flex-row px-8 lg:px-16 py-12 gap-12 lg:gap-20 max-w-7xl mx-auto w-full">
        {/* Left Side */}
        <div className="lg:w-1/2 flex flex-col justify-between relative">
          <div className="absolute inset-0 -m-12 overflow-hidden rounded-xl opacity-50">
            <img src="/assets/loginImage.png" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 -m-12 bg-gradient-to-r from-background/40 to-background/80" />
          <div className="relative">
            <h1 className="text-foreground text-4xl md:text-5xl font-bold leading-tight">
              Let&apos;s build the <span className="gradient-text italic">future</span><br />
              of livestock together.
            </h1>
            <p className="text-gray text-base mt-5 max-w-sm leading-relaxed">
              Have questions about our smart poultry management system or scaling your farm operations? Our team is ready to help you with a customized walkthrough and support.
            </p>
          </div>

          <div className="mt-12 flex flex-col gap-5 relative">
            <p className="text-gray text-[10px] font-bold uppercase tracking-widest">Direct Channels</p>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-card border border-card-border flex items-center justify-center">
                <Mail size={15} className="text-primary" />
              </div>
              <div>
                <p className="text-gray text-[10px] uppercase tracking-wide">Email Us</p>
                <p className="text-foreground text-base font-medium">solutions@scfs.tech</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-card border border-card-border flex items-center justify-center">
                <MapPin size={15} className="text-primary" />
              </div>
              <div>
                <p className="text-gray text-[10px] uppercase tracking-wide">HQ Address</p>
                <p className="text-foreground text-base font-medium">Nyarugenge, Kigali, Rwanda</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-card border border-card-border flex items-center justify-center">
                <Share2 size={15} className="text-primary" />
              </div>
              <div>
                <p className="text-gray text-[10px] uppercase tracking-wide">Social Connect</p>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-foreground text-base font-medium">LinkedIn</span>
                  <span className="text-foreground text-base font-medium">X / Twitter</span>
                  <span className="text-foreground text-base font-medium">Instagram</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="lg:w-1/2">
          <div className="bg-card border border-card-border rounded-2xl p-8">
            <h2 className="text-foreground text-xl font-bold">System Inquiry</h2>
            <p className="text-gray text-xs mt-1.5">Fields marked with an asterisk are required for deployment analysis.</p>

            <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray text-[10px] font-bold uppercase tracking-wide mb-1.5 block">Full Name</label>
                  <input
                    type="text"
                    value={form.full_name}
                    onChange={update("full_name")}
                    className="w-full bg-background border border-card-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-gray/40 focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="text-gray text-[10px] font-bold uppercase tracking-wide mb-1.5 block">Organization</label>
                  <input
                    type="text"
                    value={form.organization}
                    onChange={update("organization")}
                    className="w-full bg-background border border-card-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-gray/40 focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder="Green Valley Farms Ltd."
                  />
                </div>
              </div>

              <div>
                <label className="text-gray text-[10px] font-bold uppercase tracking-wide mb-1.5 block">Work Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  className="w-full bg-background border border-card-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-gray/40 focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="jdoe@organization.com"
                  required
                />
              </div>

              <div>
                <label className="text-gray text-[10px] font-bold uppercase tracking-wide mb-1.5 block">Primary Interest</label>
                <div className="relative">
                  <select
                    value={form.interest}
                    onChange={update("interest")}
                    className="w-full bg-background border border-card-border rounded-lg px-4 py-3 text-sm text-foreground appearance-none focus:outline-none focus:border-primary/50 transition-colors"
                    required
                  >
                    <option value="" disabled className="text-gray/40">Select architectural focus...</option>
                    <option value="monitoring">Real-time Monitoring</option>
                    <option value="detection">AI Disease Detection</option>
                    <option value="sensors">IoT Sensor Integration</option>
                    <option value="full">Full System Deployment</option>
                    <option value="consultation">General Consultation</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="text-gray text-[10px] font-bold uppercase tracking-wide mb-1.5 block">Project Scope & Details</label>
                <textarea
                  value={form.details}
                  onChange={update("details")}
                  className="w-full bg-background border border-card-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-gray/40 focus:outline-none focus:border-primary/50 transition-colors resize-none h-24"
                  placeholder="Describe your facility dimensions or specific monitoring needs..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-light text-[#003824] font-bold text-sm uppercase tracking-widest py-4 rounded-lg transition-colors mt-2"
              >
                Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

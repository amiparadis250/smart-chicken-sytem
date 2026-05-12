"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useLoginMutation } from "@/src/store/api/authApi";
import { useAppDispatch } from "@/src/store/hooks";
import { setTokens } from "@/src/store/authSlice";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setTokens(res));
      router.push("/dashboard");
    } catch {}
  };

  return (
    <div className="min-h-screen flex bg-background p-4">
      {/* Left - Image */}
      <div className="hidden lg:flex lg:w-[35%] ml-16 mr-4 py-4 relative left-22">
        <div className="relative w-full rounded-2xl overflow-hidden">
          <Image
            src="/assets/loginImage.png"
            alt="Smart chicken farm"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/20" />
        </div>
      </div>

      {/* Right - Form */}
      <div className="w-full lg:w-[45%] flex flex-col justify-between px-8 py-10">
        <div />

        <div className="w-full max-w-md mx-auto">
          <h1 className="text-foreground text-3xl font-bold">Welcome back</h1>
          <p className="text-gray text-sm mt-2">Sign in to manage your flock and view telemetry.</p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
            <div>
              <label className="text-gray text-xs font-medium mb-1.5 block">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-card border border-card-border rounded-lg pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-gray/50 focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="name@farm.com"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-gray text-xs font-medium">Password</label>
                <button type="button" className="text-primary text-xs hover:text-primary-light transition-colors">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-card border border-card-border rounded-lg pl-10 pr-10 py-3 text-sm text-foreground placeholder:text-gray/50 focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-card-border bg-card accent-primary"
              />
              <span className="text-gray text-sm">Remember this device</span>
            </label>

            {error && (
              <p className="text-red-400 text-xs">Invalid credentials. Please try again.</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-light text-[#003824] font-semibold text-sm py-3 rounded-lg transition-colors disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Sign In"} <LogIn size={16} />
            </button>

            <div className="flex items-center gap-3 my-1">
              <div className="flex-1 h-px bg-card-border" />
              <span className="text-gray text-xs">OR</span>
              <div className="flex-1 h-px bg-card-border" />
            </div>

            {/* <button
              type="button"
              className="w-full flex items-center justify-center gap-2 bg-card border border-card-border hover:border-primary/30 text-foreground text-sm font-medium py-3 rounded-lg transition-colors"
            >
              <span>🌐</span> Sign in with Google
            </button> */}
          </form>

          <p className="text-gray text-sm text-center mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary hover:text-primary-light font-medium">
              Request Access
            </Link>
          </p>
        </div>

        <p className="text-gray/50 text-xs text-center mt-8">
          🐔 SCFS © 2026. All rights reserved.
        </p>
      </div>
    </div>
  );
}

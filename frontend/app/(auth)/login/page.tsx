"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLoginMutation } from "@/src/store/api/authApi";
import { useAppDispatch } from "@/src/store/hooks";
import { setTokens } from "@/src/store/authSlice";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-sm bg-card border border-card-border rounded-2xl p-8">
        <div className="text-center mb-8">
          <span className="text-4xl">🐔</span>
          <h1 className="text-foreground text-xl font-bold mt-3">Smart Chicken Farm</h1>
          <p className="text-gray text-sm mt-1">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-gray text-xs font-medium mb-1 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-background border border-card-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-gray/50 focus:outline-none focus:border-primary/50"
              placeholder="farmer@example.com"
              required
            />
          </div>
          <div>
            <label className="text-gray text-xs font-medium mb-1 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-background border border-card-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-gray/50 focus:outline-none focus:border-primary/50"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <p className="text-red-400 text-xs">Invalid credentials. Please try again.</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary-light text-[#003824] font-semibold text-sm py-2.5 rounded-lg transition-colors disabled:opacity-50"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-gray text-xs text-center mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary hover:text-primary-light font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

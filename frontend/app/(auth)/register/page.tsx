"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useRegisterMutation } from "@/src/store/api/authApi";

export default function RegisterPage() {
  const [form, setForm] = useState({
    email: "", username: "", first_name: "", last_name: "",
    farm_name: "", password: "", password_confirm: "",
  });
  const [register, { isLoading, error }] = useRegisterMutation();
  const router = useRouter();

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(form).unwrap();
      router.push("/login");
    } catch {}
  };

  const fields = [
    { name: "email", label: "Email", type: "email", placeholder: "farmer@example.com" },
    { name: "username", label: "Username", type: "text", placeholder: "johnfarmer" },
    { name: "first_name", label: "First Name", type: "text", placeholder: "John" },
    { name: "last_name", label: "Last Name", type: "text", placeholder: "Farmer" },
    { name: "farm_name", label: "Farm Name", type: "text", placeholder: "Green Valley Farm" },
    { name: "password", label: "Password", type: "password", placeholder: "••••••••" },
    { name: "password_confirm", label: "Confirm Password", type: "password", placeholder: "••••••••" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-10">
      <div className="w-full max-w-md bg-card border border-card-border rounded-2xl p-8">
        <div className="text-center mb-6">
          <span className="text-4xl">🐔</span>
          <h1 className="text-foreground text-xl font-bold mt-3">Create Account</h1>
          <p className="text-gray text-sm mt-1">Start monitoring your farm</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {fields.map((f) => (
            <div key={f.name}>
              <label className="text-gray text-xs font-medium mb-1 block">{f.label}</label>
              <input
                type={f.type}
                value={form[f.name as keyof typeof form]}
                onChange={update(f.name)}
                className="w-full bg-background border border-card-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-gray/50 focus:outline-none focus:border-primary/50"
                placeholder={f.placeholder}
                required
              />
            </div>
          ))}

          {error && <p className="text-red-400 text-xs">Registration failed. Please check your inputs.</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary-light text-[#003824] font-semibold text-sm py-2.5 rounded-lg transition-colors disabled:opacity-50 mt-2"
          >
            {isLoading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="text-gray text-xs text-center mt-5">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:text-primary-light font-medium">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useGetProfileQuery, useUpdateProfileMutation } from "@/src/store/api/authApi";
import { useAppDispatch } from "@/src/store/hooks";
import { logout } from "@/src/store/authSlice";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const { data: profile } = useGetProfileQuery();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [form, setForm] = useState({ first_name: "", last_name: "", phone_number: "", farm_name: "" });

  useEffect(() => {
    if (profile) {
      setForm({
        first_name: profile.first_name,
        last_name: profile.last_name,
        phone_number: profile.phone_number,
        farm_name: profile.farm_name,
      });
    }
  }, [profile]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile(form);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <div className="flex flex-col gap-5 max-w-2xl">
      <div>
        <h1 className="text-foreground text-xl font-bold">Settings</h1>
        <p className="text-gray text-xs mt-0.5">Manage your account</p>
      </div>

      <form onSubmit={handleSave} className="bg-card border border-card-border rounded-xl p-5 flex flex-col gap-4">
        <h3 className="text-foreground font-semibold text-sm">Profile</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-gray text-xs font-medium mb-1 block">First Name</label>
            <input value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} className="w-full bg-background border border-card-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50" />
          </div>
          <div>
            <label className="text-gray text-xs font-medium mb-1 block">Last Name</label>
            <input value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })} className="w-full bg-background border border-card-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50" />
          </div>
          <div>
            <label className="text-gray text-xs font-medium mb-1 block">Phone</label>
            <input value={form.phone_number} onChange={(e) => setForm({ ...form, phone_number: e.target.value })} className="w-full bg-background border border-card-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50" />
          </div>
          <div>
            <label className="text-gray text-xs font-medium mb-1 block">Farm Name</label>
            <input value={form.farm_name} onChange={(e) => setForm({ ...form, farm_name: e.target.value })} className="w-full bg-background border border-card-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50" />
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="text-gray text-xs">{profile?.email}</p>
          <button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary-light text-[#003824] font-semibold text-sm px-5 py-2 rounded-lg transition-colors disabled:opacity-50">
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>

      <div className="bg-card border border-red-500/20 rounded-xl p-5">
        <h3 className="text-foreground font-semibold text-sm mb-2">Danger Zone</h3>
        <p className="text-gray text-xs mb-3">Sign out of your account</p>
        <button onClick={handleLogout} className="text-sm text-red-400 border border-red-500/20 px-4 py-2 rounded-lg hover:bg-red-500/5 transition-colors">
          Logout
        </button>
      </div>
    </div>
  );
}

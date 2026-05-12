"use client";

import { useState } from "react";
import { useGetFarmsQuery, useCreateFarmMutation, useDeleteFarmMutation } from "@/src/store/api/farmsApi";
import { Warehouse, Plus, Trash2, MapPin } from "lucide-react";

export default function FarmsPage() {
  const { data, isLoading } = useGetFarmsQuery();
  const [createFarm, { isLoading: creating }] = useCreateFarmMutation();
  const [deleteFarm] = useDeleteFarmMutation();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", location: "", total_chickens: "", description: "" });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await createFarm({ ...form, total_chickens: Number(form.total_chickens) });
    setForm({ name: "", location: "", total_chickens: "", description: "" });
    setShowForm(false);
  };

  const farms = data?.results ?? [];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground text-xl font-bold">Farms</h1>
          <p className="text-gray text-xs mt-0.5">Manage your poultry farms</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-primary hover:bg-primary-light text-[#003824] font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={16} /> Add Farm
        </button>
      </div>

      {/* Create Form */}
      {showForm && (
        <form onSubmit={handleCreate} className="bg-card border border-primary/20 rounded-xl p-5 flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Farm name"
              className="bg-background border border-card-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-gray/50 focus:outline-none focus:border-primary/50"
              required
            />
            <input
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="Location"
              className="bg-background border border-card-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-gray/50 focus:outline-none focus:border-primary/50"
            />
            <input
              type="number"
              value={form.total_chickens}
              onChange={(e) => setForm({ ...form, total_chickens: e.target.value })}
              placeholder="Total chickens"
              className="bg-background border border-card-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-gray/50 focus:outline-none focus:border-primary/50"
              required
            />
            <input
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Description"
              className="bg-background border border-card-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-gray/50 focus:outline-none focus:border-primary/50"
            />
          </div>
          <button
            type="submit"
            disabled={creating}
            className="self-end bg-primary hover:bg-primary-light text-[#003824] font-semibold text-sm px-5 py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            {creating ? "Creating..." : "Create Farm"}
          </button>
        </form>
      )}

      {/* Farm List */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : farms.length === 0 ? (
        <div className="bg-card border border-card-border rounded-xl p-12 text-center">
          <Warehouse size={32} className="text-gray mx-auto mb-3" />
          <p className="text-foreground font-medium">No farms yet</p>
          <p className="text-gray text-xs mt-1">Create your first farm to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {farms.map((farm) => (
            <div key={farm.id} className="bg-card border border-card-border rounded-xl p-5 hover:border-primary/20 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Warehouse size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-foreground font-semibold text-sm">{farm.name}</p>
                    {farm.location && (
                      <p className="text-gray text-[10px] flex items-center gap-1 mt-0.5">
                        <MapPin size={10} /> {farm.location}
                      </p>
                    )}
                  </div>
                </div>
                <button onClick={() => deleteFarm(farm.id)} className="text-gray hover:text-red-400 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="mt-4 flex items-center gap-4">
                <div>
                  <p className="text-foreground text-lg font-bold">{farm.total_chickens.toLocaleString()}</p>
                  <p className="text-gray text-[10px]">Chickens</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${farm.is_active ? "bg-primary/20 text-primary" : "bg-red-500/20 text-red-400"}`}>
                  {farm.is_active ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

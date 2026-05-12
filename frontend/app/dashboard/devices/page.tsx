"use client";

import { useState } from "react";
import { useGetDevicesQuery, useCreateDeviceMutation, useDeleteDeviceMutation } from "@/src/store/api/devicesApi";
import { useGetFarmsQuery } from "@/src/store/api/farmsApi";
import { MonitorSmartphone, Plus, Trash2, Camera, Satellite } from "lucide-react";

export default function DevicesPage() {
  const { data, isLoading } = useGetDevicesQuery({});
  const { data: farms } = useGetFarmsQuery();
  const [createDevice, { isLoading: creating }] = useCreateDeviceMutation();
  const [deleteDevice] = useDeleteDeviceMutation();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", device_type: "sensor" as "sensor" | "camera", serial_number: "", farm: "" });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await createDevice({ ...form, farm: Number(form.farm) });
    setForm({ name: "", device_type: "sensor", serial_number: "", farm: "" });
    setShowForm(false);
  };

  const devices = data?.results ?? [];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground text-xl font-bold">Devices</h1>
          <p className="text-gray text-xs mt-0.5">Manage cameras and sensors</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 bg-primary hover:bg-primary-light text-[#003824] font-semibold text-sm px-4 py-2 rounded-lg transition-colors">
          <Plus size={16} /> Add Device
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="bg-card border border-primary/20 rounded-xl p-5 flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Device name" className="bg-background border border-card-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-gray/50 focus:outline-none focus:border-primary/50" required />
            <input value={form.serial_number} onChange={(e) => setForm({ ...form, serial_number: e.target.value })} placeholder="Serial number" className="bg-background border border-card-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-gray/50 focus:outline-none focus:border-primary/50" required />
            <select value={form.device_type} onChange={(e) => setForm({ ...form, device_type: e.target.value as "sensor" | "camera" })} className="bg-background border border-card-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50">
              <option value="sensor">Sensor</option>
              <option value="camera">Camera</option>
            </select>
            <select value={form.farm} onChange={(e) => setForm({ ...form, farm: e.target.value })} className="bg-background border border-card-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50" required>
              <option value="">Select Farm</option>
              {farms?.results?.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
            </select>
          </div>
          <button type="submit" disabled={creating} className="self-end bg-primary hover:bg-primary-light text-[#003824] font-semibold text-sm px-5 py-2 rounded-lg transition-colors disabled:opacity-50">
            {creating ? "Creating..." : "Add Device"}
          </button>
        </form>
      )}

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : devices.length === 0 ? (
        <div className="bg-card border border-card-border rounded-xl p-12 text-center">
          <MonitorSmartphone size={32} className="text-gray mx-auto mb-3" />
          <p className="text-foreground font-medium">No devices</p>
          <p className="text-gray text-xs mt-1">Add cameras or sensors to your farm</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {devices.map((d) => (
            <div key={d.id} className="bg-card border border-card-border rounded-xl p-4 hover:border-primary/20 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${d.device_type === "camera" ? "bg-blue-500/10" : "bg-primary/10"}`}>
                    {d.device_type === "camera" ? <Camera size={18} className="text-blue-400" /> : <Satellite size={18} className="text-primary" />}
                  </div>
                  <div>
                    <p className="text-foreground text-sm font-medium">{d.name}</p>
                    <p className="text-gray text-[10px]">{d.serial_number}</p>
                  </div>
                </div>
                <button onClick={() => deleteDevice(d.id)} className="text-gray hover:text-red-400"><Trash2 size={13} /></button>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <p className="text-gray text-[10px]">{d.farm_name}</p>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${d.is_active ? "bg-primary/20 text-primary" : "bg-red-500/20 text-red-400"}`}>
                  {d.is_active ? "Online" : "Offline"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { useGetDetectionsQuery, useAnalyzeImageMutation } from "@/src/store/api/detectionsApi";
import { useGetFarmsQuery } from "@/src/store/api/farmsApi";
import { Upload, CheckCircle2, AlertTriangle } from "lucide-react";

export default function DetectionsPage() {
  const { data, isLoading } = useGetDetectionsQuery({});
  const { data: farms } = useGetFarmsQuery();
  const [analyzeImage, { isLoading: analyzing }] = useAnalyzeImageMutation();
  const [selectedFarm, setSelectedFarm] = useState<number | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedFarm) return;
    const formData = new FormData();
    formData.append("image", file);
    formData.append("farm", selectedFarm.toString());
    await analyzeImage(formData);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground text-xl font-bold">AI Detections</h1>
          <p className="text-gray text-xs mt-0.5">Upload images for AI health analysis</p>
        </div>
      </div>

      {/* Upload Section */}
      <div className="bg-card border border-card-border rounded-xl p-5">
        <h3 className="text-foreground font-semibold text-sm mb-3">Analyze New Image</h3>
        <div className="flex items-center gap-4">
          <select
            value={selectedFarm ?? ""}
            onChange={(e) => setSelectedFarm(Number(e.target.value))}
            className="bg-background border border-card-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
          >
            <option value="">Select Farm</option>
            {farms?.results?.map((f) => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
          </select>
          <label className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors ${
            selectedFarm ? "bg-primary hover:bg-primary-light text-[#003824]" : "bg-card-border text-gray cursor-not-allowed"
          }`}>
            <Upload size={16} />
            {analyzing ? "Analyzing..." : "Upload Image"}
            <input type="file" accept="image/*" onChange={handleUpload} className="hidden" disabled={!selectedFarm || analyzing} />
          </label>
        </div>
      </div>

      {/* Detection List */}
      <div className="bg-card border border-card-border rounded-xl p-5">
        <h3 className="text-foreground font-semibold text-sm mb-4">Detection History</h3>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {data?.results?.length === 0 && <p className="text-gray text-xs">No detections yet</p>}
            {data?.results?.map((d) => (
              <div key={d.id} className="flex items-center gap-4 p-3 rounded-lg bg-background border border-border">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  d.status === "healthy" ? "bg-primary/10" : "bg-red-500/10"
                }`}>
                  {d.status === "healthy" ? (
                    <CheckCircle2 size={20} className="text-primary" />
                  ) : (
                    <AlertTriangle size={20} className="text-red-400" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-foreground text-sm font-medium capitalize">{d.status}</p>
                  <p className="text-gray text-[10px]">{d.farm_name} • {new Date(d.detected_at).toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold ${d.status === "healthy" ? "text-primary" : "text-red-400"}`}>
                    {(d.confidence * 100).toFixed(1)}%
                  </p>
                  <p className="text-gray text-[10px]">confidence</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

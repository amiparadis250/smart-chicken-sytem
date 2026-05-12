"use client";

import { useGetDetectionsQuery } from "@/src/store/api/detectionsApi";
import { AlertTriangle } from "lucide-react";

export default function ProblemsPage() {
  const { data, isLoading } = useGetDetectionsQuery({ status: "abnormal" });
  const problems = data?.results ?? [];

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-foreground text-xl font-bold">Problems</h1>
        <p className="text-gray text-xs mt-0.5">Chickens with detected abnormalities</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : problems.length === 0 ? (
        <div className="bg-card border border-card-border rounded-xl p-12 text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
            <AlertTriangle size={24} className="text-primary" />
          </div>
          <p className="text-foreground font-medium">No problems detected</p>
          <p className="text-gray text-xs mt-1">All chickens appear healthy</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {problems.map((p) => (
            <div key={p.id} className="bg-card border border-red-500/20 rounded-xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0">
                <AlertTriangle size={24} className="text-red-400" />
              </div>
              <div className="flex-1">
                <p className="text-foreground text-sm font-medium">Abnormal Detection</p>
                <p className="text-gray text-xs mt-0.5">{p.farm_name} • {new Date(p.detected_at).toLocaleString()}</p>
                {p.notes && <p className="text-gray text-xs mt-1">{p.notes}</p>}
              </div>
              <div className="text-right">
                <p className="text-red-400 text-lg font-bold">{(p.confidence * 100).toFixed(1)}%</p>
                <p className="text-gray text-[10px]">confidence</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

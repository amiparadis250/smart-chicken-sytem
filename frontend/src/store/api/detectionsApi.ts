import { api } from "./baseApi";

export interface Detection {
  id: number;
  farm: number;
  farm_name: string;
  device: number | null;
  image: string;
  status: "healthy" | "abnormal";
  confidence: number;
  notes: string;
  detected_at: string;
}

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export const detectionsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDetections: builder.query<PaginatedResponse<Detection>, { farm?: number; status?: string }>({
      query: (params) => ({ url: "/detections/", params }),
      providesTags: ["Detections"],
    }),
    analyzeImage: builder.mutation<Detection, FormData>({
      query: (body) => ({ url: "/detections/analyze/", method: "POST", body }),
      invalidatesTags: ["Detections", "Dashboard", "Alerts"],
    }),
  }),
});

export const { useGetDetectionsQuery, useAnalyzeImageMutation } = detectionsApi;

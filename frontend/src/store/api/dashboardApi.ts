import { api } from "./baseApi";

interface SensorData {
  id: number;
  farm: number;
  farm_name: string;
  device: number | null;
  temperature: number;
  humidity: number;
  gas_level: number;
  recorded_at: string;
  violations: string[];
}

interface Alert {
  id: number;
  farm: number;
  farm_name: string;
  alert_type: "sensor" | "ai";
  severity: "low" | "medium" | "high" | "critical";
  message: string;
  is_resolved: boolean;
  created_at: string;
}

export interface DashboardData {
  total_chickens: number;
  healthy_chickens: number;
  abnormal_chickens: number;
  total_detections: number;
  farms_count: number;
  latest_sensor_data: SensorData | null;
  recent_alerts: Alert[];
  unresolved_alerts_count: number;
}

export const dashboardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDashboard: builder.query<DashboardData, void>({
      query: () => "/dashboard/",
      providesTags: ["Dashboard"],
    }),
  }),
});

export const { useGetDashboardQuery } = dashboardApi;

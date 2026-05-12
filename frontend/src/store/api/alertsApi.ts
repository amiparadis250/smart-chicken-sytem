import { api } from "./baseApi";

export interface Alert {
  id: number;
  farm: number;
  farm_name: string;
  alert_type: "sensor" | "ai";
  severity: "low" | "medium" | "high" | "critical";
  message: string;
  is_resolved: boolean;
  sensor_data: number | null;
  detection: number | null;
  created_at: string;
}

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export const alertsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAlerts: builder.query<PaginatedResponse<Alert>, { farm?: number; severity?: string; is_resolved?: boolean }>({
      query: (params) => ({ url: "/alerts/", params }),
      providesTags: ["Alerts"],
    }),
    resolveAlert: builder.mutation<Alert, number>({
      query: (id) => ({ url: `/alerts/${id}/resolve/`, method: "PATCH" }),
      invalidatesTags: ["Alerts", "Dashboard"],
    }),
  }),
});

export const { useGetAlertsQuery, useResolveAlertMutation } = alertsApi;

import { api } from "./baseApi";

export interface SensorData {
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

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export const sensorsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSensors: builder.query<PaginatedResponse<SensorData>, { farm?: number }>({
      query: (params) => ({
        url: "/sensors/",
        params,
      }),
      providesTags: ["Sensors"],
    }),
    createSensorData: builder.mutation<SensorData, Partial<SensorData>>({
      query: (body) => ({ url: "/sensors/", method: "POST", body }),
      invalidatesTags: ["Sensors", "Dashboard", "Alerts"],
    }),
  }),
});

export const { useGetSensorsQuery, useCreateSensorDataMutation } = sensorsApi;

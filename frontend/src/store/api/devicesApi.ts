import { api } from "./baseApi";

export interface Device {
  id: number;
  farm: number;
  farm_name: string;
  name: string;
  device_type: "camera" | "sensor";
  serial_number: string;
  is_active: boolean;
  last_ping: string | null;
  created_at: string;
  updated_at: string;
}

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export const devicesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDevices: builder.query<PaginatedResponse<Device>, { farm?: number; device_type?: string }>({
      query: (params) => ({ url: "/devices/", params }),
      providesTags: ["Devices"],
    }),
    createDevice: builder.mutation<Device, Partial<Device>>({
      query: (body) => ({ url: "/devices/", method: "POST", body }),
      invalidatesTags: ["Devices"],
    }),
    updateDevice: builder.mutation<Device, { id: number; data: Partial<Device> }>({
      query: ({ id, data }) => ({ url: `/devices/${id}/`, method: "PATCH", body: data }),
      invalidatesTags: ["Devices"],
    }),
    deleteDevice: builder.mutation<void, number>({
      query: (id) => ({ url: `/devices/${id}/`, method: "DELETE" }),
      invalidatesTags: ["Devices"],
    }),
  }),
});

export const {
  useGetDevicesQuery,
  useCreateDeviceMutation,
  useUpdateDeviceMutation,
  useDeleteDeviceMutation,
} = devicesApi;

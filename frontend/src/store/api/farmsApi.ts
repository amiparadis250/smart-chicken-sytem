import { api } from "./baseApi";

export interface Farm {
  id: number;
  owner: number;
  owner_email: string;
  name: string;
  location: string;
  total_chickens: number;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export const farmsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFarms: builder.query<PaginatedResponse<Farm>, void>({
      query: () => "/farms/",
      providesTags: ["Farms"],
    }),
    getFarm: builder.query<Farm, number>({
      query: (id) => `/farms/${id}/`,
      providesTags: ["Farms"],
    }),
    createFarm: builder.mutation<Farm, Partial<Farm>>({
      query: (body) => ({ url: "/farms/", method: "POST", body }),
      invalidatesTags: ["Farms", "Dashboard"],
    }),
    updateFarm: builder.mutation<Farm, { id: number; data: Partial<Farm> }>({
      query: ({ id, data }) => ({ url: `/farms/${id}/`, method: "PATCH", body: data }),
      invalidatesTags: ["Farms", "Dashboard"],
    }),
    deleteFarm: builder.mutation<void, number>({
      query: (id) => ({ url: `/farms/${id}/`, method: "DELETE" }),
      invalidatesTags: ["Farms", "Dashboard"],
    }),
  }),
});

export const {
  useGetFarmsQuery,
  useGetFarmQuery,
  useCreateFarmMutation,
  useUpdateFarmMutation,
  useDeleteFarmMutation,
} = farmsApi;

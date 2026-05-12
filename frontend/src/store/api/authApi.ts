import { api } from "./baseApi";

interface LoginRequest {
  email: string;
  password: string;
}

interface TokenResponse {
  access: string;
  refresh: string;
}

interface RegisterRequest {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
  farm_name?: string;
  password: string;
  password_confirm: string;
}

interface User {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  farm_name: string;
  is_farmer: boolean;
  created_at: string;
}

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<TokenResponse, LoginRequest>({
      query: (body) => ({ url: "/auth/login/", method: "POST", body }),
    }),
    register: builder.mutation<User, RegisterRequest>({
      query: (body) => ({ url: "/auth/register/", method: "POST", body }),
    }),
    refreshToken: builder.mutation<{ access: string }, { refresh: string }>({
      query: (body) => ({ url: "/auth/token/refresh/", method: "POST", body }),
    }),
    getProfile: builder.query<User, void>({
      query: () => "/auth/profile/",
      providesTags: ["Profile"],
    }),
    updateProfile: builder.mutation<User, Partial<User>>({
      query: (body) => ({ url: "/auth/profile/", method: "PATCH", body }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useRefreshTokenMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} = authApi;

import { api } from "./api";
import { AuthResponse, LoginPayload, RegisterPayload } from "@/types/auth";

export const authService = {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/login", payload);
    return response.data;
  },

  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/register", payload);
    return response.data;
  },
};

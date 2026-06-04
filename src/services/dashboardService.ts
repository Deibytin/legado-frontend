import { api } from "./api";
import { DashboardData } from "@/types/dashboard";

interface DashboardResponse {
  data: DashboardData;
}

export const dashboardService = {
  async getDashboard(): Promise<DashboardData> {
    const response = await api.get<DashboardResponse>("/dashboard");
    return response.data.data;
  },
};

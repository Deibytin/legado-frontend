import { api } from "./api";
import { CreateTeamPayload, Team, UpdateTeamPayload } from "@/types/team";

interface TeamListResponse {
  data: Team[];
}

interface TeamResponse {
  data: Team;
}

export const teamService = {
  async list(): Promise<Team[]> {
    const response = await api.get<TeamListResponse>("/teams");
    return response.data.data;
  },

  async create(payload: CreateTeamPayload): Promise<Team> {
    const response = await api.post<TeamResponse>("/teams", payload);
    return response.data.data;
  },

  async update(id: string, payload: UpdateTeamPayload): Promise<Team> {
    const response = await api.put<TeamResponse>(`/teams/${id}`, payload);
    return response.data.data;
  },

  async remove(id: string): Promise<void> {
    await api.delete(`/teams/${id}`);
  },
};

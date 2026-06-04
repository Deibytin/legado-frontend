import { api } from "./api";
import {
  CreatePlayerPayload,
  PaginatedPlayers,
  Player,
  UpdatePlayerPayload,
} from "@/types/player";

interface PlayerResponse {
  data: Player;
}

export const playerService = {
  async list(page = 1, limit = 10): Promise<PaginatedPlayers> {
    const response = await api.get<PaginatedPlayers>("/players", {
      params: { page, limit },
    });
    return response.data;
  },

  async create(payload: CreatePlayerPayload): Promise<Player> {
    const response = await api.post<PlayerResponse>("/players", payload);
    return response.data.data;
  },

  async update(id: string, payload: UpdatePlayerPayload): Promise<Player> {
    const response = await api.put<PlayerResponse>(`/players/${id}`, payload);
    return response.data.data;
  },

  async remove(id: string): Promise<void> {
    await api.delete(`/players/${id}`);
  },
};

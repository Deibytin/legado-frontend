export interface Player {
  id: string;
  name: string;
  position: string;
  birthDate: string;
  teamId: string;
  createdAt: string;
}

export interface CreatePlayerPayload {
  name: string;
  position: string;
  birthDate: string;
  teamId: string;
}

export interface UpdatePlayerPayload {
  name?: string;
  position?: string;
  birthDate?: string;
  teamId?: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedPlayers {
  data: Player[];
  meta: PaginationMeta;
}

export interface Team {
  id: string;
  name: string;
  coachId: string;
  createdAt: string;
}

export interface CreateTeamPayload {
  name: string;
  coachId: string;
}

export interface UpdateTeamPayload {
  name?: string;
  coachId?: string;
}

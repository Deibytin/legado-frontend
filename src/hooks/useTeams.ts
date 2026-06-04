"use client";

import { useCallback, useEffect, useState } from "react";
import { teamService } from "@/services/teamService";
import { CreateTeamPayload, Team } from "@/types/team";

export function useTeams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTeams = useCallback(async (): Promise<void> => {
    setIsLoading(true);

    try {
      setTeams(await teamService.list());
      setError(null);
    } catch {
      setError("Unable to load teams");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadTeams();
  }, [loadTeams]);

  const createTeam = async (payload: CreateTeamPayload): Promise<void> => {
    await teamService.create(payload);
    await loadTeams();
  };

  const deleteTeam = async (id: string): Promise<void> => {
    await teamService.remove(id);
    await loadTeams();
  };

  return { teams, isLoading, error, createTeam, deleteTeam };
}

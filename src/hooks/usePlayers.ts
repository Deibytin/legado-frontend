"use client";

import { useCallback, useEffect, useState } from "react";
import { playerService } from "@/services/playerService";
import { CreatePlayerPayload, PaginationMeta, Player } from "@/types/player";

export function usePlayers(initialPage = 1, limit = 10) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [page, setPage] = useState(initialPage);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPlayers = useCallback(async (): Promise<void> => {
    setIsLoading(true);

    try {
      const result = await playerService.list(page, limit);
      setPlayers(result.data);
      setMeta(result.meta);
      setError(null);
    } catch {
      setError("Unable to load players");
    } finally {
      setIsLoading(false);
    }
  }, [limit, page]);

  useEffect(() => {
    void loadPlayers();
  }, [loadPlayers]);

  const createPlayer = async (payload: CreatePlayerPayload): Promise<void> => {
    await playerService.create(payload);
    await loadPlayers();
  };

  const deletePlayer = async (id: string): Promise<void> => {
    await playerService.remove(id);
    await loadPlayers();
  };

  return { players, meta, page, setPage, isLoading, error, createPlayer, deletePlayer };
}

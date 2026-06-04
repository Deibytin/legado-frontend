"use client";

import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { PrivateRoute } from "@/components/common/PrivateRoute";
import { PlayerForm } from "@/components/forms/PlayerForm";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { useI18n } from "@/context/I18nContext";
import { usePlayers } from "@/hooks/usePlayers";

export default function PlayersPage() {
  const { user } = useAuth();
  const { t } = useI18n();
  const { createPlayer, deletePlayer, error, isLoading, meta, page, players, setPage } = usePlayers();
  const canDelete = user?.role === "ADMIN";

  return (
    <PrivateRoute>
      <AppShell title={t("players")}>
        <div className="grid gap-6">
          <PlayerForm onSubmit={createPlayer} />
          {isLoading ? <p className="text-sm text-slate-500">Loading...</p> : null}
          {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}
          <section className="rounded-lg border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-950 dark:text-slate-400">
                  <tr>
                    <th className="px-5 py-3">{t("name")}</th>
                    <th className="px-5 py-3">{t("position")}</th>
                    <th className="px-5 py-3">{t("birthDate")}</th>
                    <th className="px-5 py-3">{t("teamId")}</th>
                    <th className="px-5 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {players.map((player) => (
                    <tr key={player.id}>
                      <td className="px-5 py-4 font-medium">{player.name}</td>
                      <td className="px-5 py-4 text-slate-500 dark:text-slate-400">{player.position}</td>
                      <td className="px-5 py-4 text-slate-500 dark:text-slate-400">
                        {new Date(player.birthDate).toLocaleDateString()}
                      </td>
                      <td className="px-5 py-4 font-mono text-xs text-slate-500 dark:text-slate-400">
                        {player.teamId}
                      </td>
                      <td className="px-5 py-4 text-right">
                        {canDelete ? (
                          <Button className="w-10 px-0" type="button" variant="danger" onClick={() => void deletePlayer(player.id)}>
                            <Trash2 size={16} />
                          </Button>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {meta ? (
              <div className="flex items-center justify-between border-t border-slate-200 px-5 py-4 dark:border-slate-800">
                <p className="text-sm text-slate-500">
                  {meta.page} / {meta.totalPages || 1}
                </p>
                <div className="flex gap-2">
                  <Button disabled={page <= 1} type="button" variant="secondary" onClick={() => setPage(page - 1)}>
                    <ChevronLeft size={16} />
                  </Button>
                  <Button disabled={page >= meta.totalPages} type="button" variant="secondary" onClick={() => setPage(page + 1)}>
                    <ChevronRight size={16} />
                  </Button>
                </div>
              </div>
            ) : null}
          </section>
        </div>
      </AppShell>
    </PrivateRoute>
  );
}

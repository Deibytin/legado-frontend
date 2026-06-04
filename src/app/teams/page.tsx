"use client";

import { Trash2 } from "lucide-react";
import { PrivateRoute } from "@/components/common/PrivateRoute";
import { TeamForm } from "@/components/forms/TeamForm";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { useI18n } from "@/context/I18nContext";
import { useTeams } from "@/hooks/useTeams";

export default function TeamsPage() {
  const { user } = useAuth();
  const { t } = useI18n();
  const { createTeam, deleteTeam, error, isLoading, teams } = useTeams();
  const canDelete = user?.role === "ADMIN";

  return (
    <PrivateRoute>
      <AppShell title={t("teams")}>
        <div className="grid gap-6">
          <TeamForm onSubmit={createTeam} />
          {isLoading ? <p className="text-sm text-slate-500">Loading...</p> : null}
          {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}
          <section className="rounded-lg border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-950 dark:text-slate-400">
                  <tr>
                    <th className="px-5 py-3">{t("name")}</th>
                    <th className="px-5 py-3">{t("coachId")}</th>
                    <th className="px-5 py-3">ID</th>
                    <th className="px-5 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {teams.map((team) => (
                    <tr key={team.id}>
                      <td className="px-5 py-4 font-medium">{team.name}</td>
                      <td className="px-5 py-4 font-mono text-xs text-slate-500 dark:text-slate-400">
                        {team.coachId}
                      </td>
                      <td className="px-5 py-4 font-mono text-xs text-slate-500 dark:text-slate-400">{team.id}</td>
                      <td className="px-5 py-4 text-right">
                        {canDelete ? (
                          <Button className="w-10 px-0" type="button" variant="danger" onClick={() => void deleteTeam(team.id)}>
                            <Trash2 size={16} />
                          </Button>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </AppShell>
    </PrivateRoute>
  );
}

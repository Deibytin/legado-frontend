"use client";

import { Trophy, UserRoundCheck, Users } from "lucide-react";
import { PrivateRoute } from "@/components/common/PrivateRoute";
import { AppShell } from "@/components/layout/AppShell";
import { StatCard } from "@/components/ui/StatCard";
import { useI18n } from "@/context/I18nContext";
import { useDashboard } from "@/hooks/useDashboard";

export default function DashboardPage() {
  const { t } = useI18n();
  const { data, error, isLoading } = useDashboard();

  return (
    <PrivateRoute>
      <AppShell title={t("dashboard")}>
        {isLoading ? <p className="text-sm text-slate-500">Loading...</p> : null}
        {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}
        {data ? (
          <div className="grid gap-6">
            <div className="grid gap-4 md:grid-cols-3">
              <StatCard icon={Trophy} label={t("totalTeams")} value={data.totalTeams} />
              <StatCard icon={Users} label={t("totalPlayers")} value={data.totalPlayers} />
              <StatCard icon={UserRoundCheck} label={t("totalCoaches")} value={data.totalCoaches} />
            </div>

            <section className="rounded-lg border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
              <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
                <h2 className="font-bold text-slate-950 dark:text-white">{t("recentPlayers")}</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-950 dark:text-slate-400">
                    <tr>
                      <th className="px-5 py-3">{t("name")}</th>
                      <th className="px-5 py-3">{t("position")}</th>
                      <th className="px-5 py-3">{t("teamId")}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {data.recentPlayers.map((player) => (
                      <tr key={player.id}>
                        <td className="px-5 py-4 font-medium">{player.name}</td>
                        <td className="px-5 py-4 text-slate-500 dark:text-slate-400">{player.position}</td>
                        <td className="px-5 py-4 font-mono text-xs text-slate-500 dark:text-slate-400">
                          {player.teamId}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        ) : null}
      </AppShell>
    </PrivateRoute>
  );
}

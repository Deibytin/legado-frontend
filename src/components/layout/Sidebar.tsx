"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, LogOut, Settings, Shield, Trophy, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { useI18n } from "@/context/I18nContext";
import { cn } from "@/lib/cn";

const items = [
  { href: "/dashboard", icon: LayoutDashboard, label: "dashboard" },
  { href: "/teams", icon: Trophy, label: "teams" },
  { href: "/players", icon: Users, label: "players" },
  { href: "/admin", icon: Shield, label: "admin" },
  { href: "/settings", icon: Settings, label: "settings" },
] as const;

export default function Sidebar() {
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const { t } = useI18n();

  return (
    <aside className="flex min-h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white px-4 py-5 dark:border-slate-800 dark:bg-slate-950">
      <div className="px-2">
        <p className="text-xl font-bold text-brand">Legado Sport</p>
        <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">{user?.role}</p>
      </div>

      <nav className="mt-8 grid gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              className={cn(
                "flex h-10 items-center gap-3 rounded-md px-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900",
                active && "bg-brand text-white hover:bg-brand dark:text-white dark:hover:bg-brand",
              )}
              href={item.href}
            >
              <Icon size={18} />
              {t(item.label)}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto">
        <Button className="w-full justify-start" type="button" variant="ghost" onClick={logout}>
          <LogOut size={18} />
          {t("logout")}
        </Button>
      </div>
    </aside>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  Megaphone,
  Image as ImageIcon,
  Radio,
  Settings
} from "lucide-react";
import { clsx } from "clsx";
import { useAuth } from "@/hooks/use-auth";
import { AdminGate } from "@/components/admin-gate";

const navItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/sermons", label: "Sermons", icon: BookOpen },
  { href: "/admin/events", label: "Events", icon: Calendar },
  { href: "/admin/announcements", label: "Announcements", icon: Megaphone },
  { href: "/admin/media", label: "Media", icon: ImageIcon },
  { href: "/admin/livestream", label: "Livestream", icon: Radio },
  { href: "/admin/site", label: "Site Content", icon: Settings }
];

export function AdminShell({
  title,
  subtitle,
  children,
  actions
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <AdminGate>
      <div className="min-h-screen bg-mist">
        <div className="mx-auto max-w-6xl px-4 py-10 grid gap-8 md:grid-cols-[220px_1fr]">
          <aside className="space-y-6">
            <div className="rounded-3xl bg-white/90 p-5 shadow-soft-md">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Admin Portal</p>
              <h1 className="mt-2 font-display text-xl text-ink">The Church of Pentecost</h1>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Oyarifa Worship Center</p>
            </div>
            <nav className="rounded-3xl bg-white/90 p-4 shadow-soft-md space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={clsx(
                      "flex items-center gap-3 rounded-2xl px-3 py-2 text-sm transition",
                      isActive
                        ? "bg-ember text-white"
                        : "text-slate-600 hover:bg-ember/10 hover:text-ember"
                    )}
                  >
                    <Icon size={16} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="rounded-3xl bg-white/90 p-4 shadow-soft-md text-sm text-slate-600">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Signed in</p>
              <p className="mt-2 font-medium text-ink">{user?.email}</p>
              <button
                onClick={logout}
                className="mt-4 w-full rounded-2xl border border-ember px-3 py-2 text-xs uppercase tracking-[0.2em] text-ember hover:bg-ember hover:text-white"
              >
                Sign out
              </button>
            </div>
          </aside>

          <main className="space-y-6">
            <div className="rounded-[2.5rem] bg-white/90 p-6 shadow-soft-xl flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Admin</p>
                <h2 className="font-display text-3xl text-ink">{title}</h2>
                {subtitle && <p className="mt-2 text-sm text-slate-600">{subtitle}</p>}
              </div>
              {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
            </div>

            <div className="space-y-6">{children}</div>
          </main>
        </div>
      </div>
    </AdminGate>
  );
}

"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { AdminShell } from "@/components/admin-shell";
import { fetchSermons } from "@/services/sermons";
import { fetchEvents } from "@/services/events";
import { fetchAnnouncements } from "@/services/announcements";
import { fetchMedia } from "@/services/media";
import { fetchLeaders } from "@/services/leaders";
import { useAuth } from "@/hooks/use-auth";

const adminCards = [
  { title: "Sermons", description: "Create, update, and publish sermon content.", href: "/admin/sermons" },
  { title: "Events", description: "Manage calendar listings and event details.", href: "/admin/events" },
  { title: "Leadership", description: "Maintain leadership profiles and visibility.", href: "/admin/leadership" },
  { title: "Announcements", description: "Post announcements and homepage alerts.", href: "/admin/announcements" },
  { title: "Media Library", description: "Upload photos and manage downloads.", href: "/admin/media" },
  { title: "Livestream", description: "Update embed URLs and live status.", href: "/admin/livestream" },
  { title: "Site Content", description: "Set hero images and featured content.", href: "/admin/site" }
];

export default function AdminDashboard() {
  const { token } = useAuth();
  const { data: sermons } = useQuery({ queryKey: ["admin-sermons"], queryFn: fetchSermons });
  const { data: events } = useQuery({ queryKey: ["admin-events"], queryFn: fetchEvents });
  const { data: announcements } = useQuery({
    queryKey: ["admin-announcements"],
    queryFn: () => fetchAnnouncements(token, false)
  });
  const { data: leaders } = useQuery({
    queryKey: ["admin-leaders"],
    queryFn: () => fetchLeaders(token)
  });
  const { data: media } = useQuery({
    queryKey: ["admin-media"],
    queryFn: () => fetchMedia(token)
  });

  return (
    <AdminShell
      title="Content management"
      subtitle="Manage sermons, events, announcements, and media in one place."
    >
      <div className="grid gap-4 md:grid-cols-4">
          {[
            { label: "Sermons", value: sermons?.total ?? 0 },
            { label: "Events", value: events?.total ?? 0 },
            { label: "Leaders", value: leaders?.total ?? 0 },
            { label: "Announcements", value: announcements?.total ?? 0 },
            { label: "Media", value: media?.total ?? 0 }
          ].map((stat) => (
          <div key={stat.label} className="rounded-3xl bg-white/90 p-5 shadow-soft-md">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{stat.label}</p>
            <p className="mt-3 font-display text-3xl text-ink">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {adminCards.map((card) => (
          <div key={card.title} className="rounded-3xl bg-white/90 p-6 shadow-soft-md">
            <h3 className="font-display text-2xl text-ink">{card.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{card.description}</p>
            <Link href={card.href} className="mt-4 inline-flex text-xs uppercase tracking-[0.3em] text-ember">
              Open
            </Link>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}

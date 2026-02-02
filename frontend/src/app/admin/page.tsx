"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { SectionHeading } from "@/components/section-heading";
import { AdminGate } from "@/components/admin-gate";

const adminCards = [
  { title: "Sermons", description: "Create, update, and publish sermon content.", href: "/admin/sermons" },
  { title: "Events", description: "Manage calendar listings and event details.", href: "/admin/events" },
  { title: "Announcements", description: "Post announcements and homepage alerts.", href: "/admin/announcements" },
  { title: "Media Library", description: "Upload photos and manage downloads.", href: "/admin/media" },
  { title: "Livestream", description: "Update embed URLs and live status.", href: "/admin/livestream" }
];

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <AdminGate>
      <div className="mx-auto max-w-5xl px-4 py-16 space-y-12">
        <SectionHeading
          eyebrow="Admin"
          title="Content management"
          description="Manage sermons, events, announcements, and media in one place."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {adminCards.map((card) => (
            <div key={card.title} className="rounded-3xl bg-white/80 p-6 shadow-soft-md">
              <h3 className="font-display text-2xl">{card.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{card.description}</p>
              <Link href={card.href} className="mt-4 inline-flex text-sm uppercase tracking-[0.2em] text-ember">
                Open
              </Link>
            </div>
          ))}
        </div>
      </div>
    </AdminGate>
  );
}

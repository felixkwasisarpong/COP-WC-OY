"use client";

import { SectionHeading } from "@/components/section-heading";

export default function AdminLivestreamPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 space-y-8">
      <SectionHeading
        eyebrow="Admin"
        title="Manage livestream"
        description="Update embed links, live status, and schedules."
      />
      <div className="rounded-3xl bg-white/80 p-6 shadow-soft-md text-sm text-slate-600">
        Livestream settings UI will live here. Connect to `/api/v1/livestream` to update the
        stream configuration.
      </div>
    </div>
  );
}

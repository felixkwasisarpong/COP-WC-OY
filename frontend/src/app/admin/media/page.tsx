"use client";

import { SectionHeading } from "@/components/section-heading";

export default function AdminMediaPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 space-y-8">
      <SectionHeading
        eyebrow="Admin"
        title="Manage media"
        description="Upload and organize photos, banners, and sermon thumbnails."
      />
      <div className="rounded-3xl bg-white/80 p-6 shadow-soft-md text-sm text-slate-600">
        Media upload UI will live here. Use `/api/v1/media/upload` for uploads and
        `/api/v1/media/:id/download` for protected downloads.
      </div>
    </div>
  );
}

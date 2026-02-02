"use client";

import { SectionHeading } from "@/components/section-heading";
import { AdminGate } from "@/components/admin-gate";

export default function AdminEventsPage() {
  return (
    <AdminGate>
      <div className="mx-auto max-w-4xl px-4 py-16 space-y-8">
        <SectionHeading
          eyebrow="Admin"
          title="Manage events"
          description="Update event schedules, locations, and registrations."
        />
        <div className="rounded-3xl bg-white/80 p-6 shadow-soft-md text-sm text-slate-600">
          Event management UI will live here. Connect to `/api/v1/events` endpoints and include
          gallery uploads when ready.
        </div>
      </div>
    </AdminGate>
  );
}

"use client";

import { SectionHeading } from "@/components/section-heading";
import { AdminGate } from "@/components/admin-gate";

export default function AdminSermonsPage() {
  return (
    <AdminGate>
      <div className="mx-auto max-w-4xl px-4 py-16 space-y-8">
        <SectionHeading
          eyebrow="Admin"
          title="Manage sermons"
          description="Create, update, and archive sermon content."
        />
        <div className="rounded-3xl bg-white/80 p-6 shadow-soft-md text-sm text-slate-600">
          Sermon management UI will live here. Connect to `/api/v1/sermons` endpoints to build CRUD
          forms and publishing controls.
        </div>
      </div>
    </AdminGate>
  );
}

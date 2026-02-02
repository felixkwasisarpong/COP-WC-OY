"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchEvent } from "@/services/events";
import { Button } from "@/components/button";

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const { data, isLoading } = useQuery({
    queryKey: ["event", params.id],
    queryFn: () => fetchEvent(params.id)
  });

  if (isLoading) {
    return <p className="py-16 text-center text-sm text-slate-500">Loading event...</p>;
  }

  if (!data) {
    return <p className="py-16 text-center text-sm text-slate-500">Event not found.</p>;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 space-y-10">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-ember">Event</p>
        <h1 className="font-display text-4xl">{data.title}</h1>
        <p className="text-sm text-slate-600">{new Date(data.start_time).toLocaleString()}</p>
        <p className="text-sm text-slate-600">{data.location}</p>
      </div>

      <div className="rounded-3xl bg-white/80 p-8 shadow-soft-md">
        <p className="text-sm text-slate-600">
          {data.description || "Details for this event will be shared soon."}
        </p>
      </div>

      <div className="flex flex-wrap gap-4">
        <Button href="/events" variant="outline">
          Back to Events
        </Button>
        <Button href="/contact">Questions?</Button>
      </div>
    </div>
  );
}

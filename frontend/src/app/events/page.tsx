"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "@/services/events";
import { SectionHeading } from "@/components/section-heading";
import { EventCard } from "@/components/event-card";
import { mediaViewUrl } from "@/services/media";

export default function EventsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 space-y-12">
      <SectionHeading
        eyebrow="Calendar"
        title="Gatherings and special events"
        description="Plan ahead for worship nights, outreach projects, and community moments."
      />
      {isLoading ? (
        <p className="text-center text-sm text-slate-500">Loading events...</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {(data?.items || []).map((event: any) => (
            <EventCard
              key={event.id}
              id={event.id}
              title={event.title}
              date={new Date(event.start_time).toLocaleString()}
              location={event.location}
              imageUrl={event.cover_image_id ? mediaViewUrl(event.cover_image_id) : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "@/services/events";
import { EventCard } from "@/components/event-card";
import { mediaViewUrl } from "@/services/media";

export function EventPreview() {
  const { data, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents
  });

  if (isLoading) {
    return <p className="text-center text-sm text-slate-500">Loading events...</p>;
  }

  const items = data?.items?.slice(0, 3) || [];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {items.map((event: any) => (
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
  );
}

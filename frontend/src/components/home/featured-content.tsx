"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchSiteContent } from "@/services/site-content";
import { fetchSermon, fetchSermons } from "@/services/sermons";
import { fetchEvent, fetchEvents } from "@/services/events";
import { SermonCard } from "@/components/sermon-card";
import { EventCard } from "@/components/event-card";
import { mediaViewUrl } from "@/services/media";

export function FeaturedContent() {
  const { data: site } = useQuery({
    queryKey: ["site-content"],
    queryFn: fetchSiteContent
  });

  const { data: sermon } = useQuery({
    queryKey: ["featured-sermon", site?.featured_sermon_id],
    queryFn: () => fetchSermon(site?.featured_sermon_id as number),
    enabled: Boolean(site?.featured_sermon_id)
  });

  const { data: event } = useQuery({
    queryKey: ["featured-event", site?.featured_event_id],
    queryFn: () => fetchEvent(site?.featured_event_id as number),
    enabled: Boolean(site?.featured_event_id)
  });

  const { data: latestSermons } = useQuery({
    queryKey: ["latest-sermons"],
    queryFn: fetchSermons,
    enabled: !site?.featured_sermon_id
  });

  const { data: latestEvents } = useQuery({
    queryKey: ["latest-events"],
    queryFn: fetchEvents,
    enabled: !site?.featured_event_id
  });

  const fallbackSermon = latestSermons?.items?.[0];
  const fallbackEvent = latestEvents?.items?.[0];
  const selectedSermon = sermon || fallbackSermon;
  const selectedEvent = event || fallbackEvent;

  if (!selectedSermon && !selectedEvent) {
    return (
      <div className="rounded-none bg-white/80 p-8 text-center text-sm text-slate-600 shadow-soft-md">
        Featured items will appear here once they are selected in Admin → Site Content.
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {selectedSermon && (
        <SermonCard
          id={selectedSermon.id}
          title={selectedSermon.title}
          speaker={selectedSermon.speaker}
          date={new Date(selectedSermon.sermon_date).toLocaleDateString()}
          scripture={selectedSermon.scripture}
          imageUrl={
            selectedSermon.thumbnail_media_id ? mediaViewUrl(selectedSermon.thumbnail_media_id) : undefined
          }
          rounded={false}
        />
      )}
      {selectedEvent && (
        <EventCard
          id={selectedEvent.id}
          title={selectedEvent.title}
          date={new Date(selectedEvent.start_time).toLocaleString()}
          location={selectedEvent.location}
          imageUrl={selectedEvent.cover_image_id ? mediaViewUrl(selectedEvent.cover_image_id) : undefined}
          rounded={false}
        />
      )}
    </div>
  );
}

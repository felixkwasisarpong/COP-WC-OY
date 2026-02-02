"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchSiteContent } from "@/services/site-content";
import { fetchSermon } from "@/services/sermons";
import { fetchEvent } from "@/services/events";
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

  if (!sermon && !event) {
    return null;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {sermon && (
        <SermonCard
          id={sermon.id}
          title={sermon.title}
          speaker={sermon.speaker}
          date={new Date(sermon.sermon_date).toLocaleDateString()}
          scripture={sermon.scripture}
          imageUrl={sermon.thumbnail_media_id ? mediaViewUrl(sermon.thumbnail_media_id) : undefined}
        />
      )}
      {event && (
        <EventCard
          id={event.id}
          title={event.title}
          date={new Date(event.start_time).toLocaleString()}
          location={event.location}
          imageUrl={event.cover_image_id ? mediaViewUrl(event.cover_image_id) : undefined}
        />
      )}
    </div>
  );
}

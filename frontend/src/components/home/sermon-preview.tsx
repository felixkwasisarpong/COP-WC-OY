"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchSermons } from "@/services/sermons";
import { SermonCard } from "@/components/sermon-card";
import { mediaViewUrl } from "@/services/media";

export function SermonPreview() {
  const { data, isLoading } = useQuery({
    queryKey: ["sermons"],
    queryFn: fetchSermons
  });

  if (isLoading) {
    return <p className="text-center text-sm text-slate-500">Loading sermons...</p>;
  }

  const items = data?.items?.slice(0, 3) || [];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {items.map((sermon: any) => (
        <SermonCard
          key={sermon.id}
          id={sermon.id}
          title={sermon.title}
          speaker={sermon.speaker}
          date={new Date(sermon.sermon_date).toLocaleDateString()}
          scripture={sermon.scripture}
          imageUrl={sermon.thumbnail_media_id ? mediaViewUrl(sermon.thumbnail_media_id) : undefined}
        />
      ))}
    </div>
  );
}

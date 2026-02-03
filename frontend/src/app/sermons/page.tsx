"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchSermons } from "@/services/sermons";
import { SectionHeading } from "@/components/section-heading";
import { SermonCard } from "@/components/sermon-card";
import { mediaViewUrl } from "@/services/media";

export default function SermonsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["sermons"],
    queryFn: fetchSermons
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 space-y-12">
      <SectionHeading
        eyebrow="Messages"
        title="Sermons to build your faith"
        description="Watch or listen to recent messages and revisit the Word anytime."
      />
      {isLoading ? (
        <p className="text-center text-sm text-slate-500">Loading sermons...</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {(data?.items || []).map((sermon: any) => (
            <SermonCard
              key={sermon.id}
              id={sermon.id}
              title={sermon.title}
              speaker={sermon.speaker}
              date={new Date(sermon.sermon_date).toLocaleDateString()}
              scripture={sermon.scripture}
              imageUrl={sermon.thumbnail_media_id ? mediaViewUrl(sermon.thumbnail_media_id) : undefined}
              rounded={false}
            />
          ))}
        </div>
      )}
    </div>
  );
}

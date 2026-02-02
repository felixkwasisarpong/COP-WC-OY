"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMedia } from "@/services/media";
import { MediaGrid } from "@/components/media-grid";
import { SectionHeading } from "@/components/section-heading";

export default function GalleryPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["media"],
    queryFn: () => fetchMedia()
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 space-y-12">
      <SectionHeading
        eyebrow="Gallery"
        title="Moments from our church family"
        description="Browse recent gatherings and ministry highlights."
      />
      {isLoading ? (
        <p className="text-center text-sm text-slate-500">Loading gallery...</p>
      ) : (
        <MediaGrid items={data?.items || []} />
      )}
    </div>
  );
}

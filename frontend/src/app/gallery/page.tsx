"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMedia, mediaViewUrl } from "@/services/media";
import { SectionHeading } from "@/components/section-heading";

export default function GalleryPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["media"],
    queryFn: fetchMedia
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
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {(data?.items || []).map((media: any) => (
            <div key={media.id} className="rounded-3xl bg-white/80 p-4 shadow-soft-md">
              <div className="h-40 rounded-2xl bg-gradient-to-br from-wheat via-white to-mist flex items-center justify-center text-ember overflow-hidden">
                <img
                  src={mediaViewUrl(media.id)}
                  alt={media.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="mt-4">
                <h3 className="font-display text-xl">{media.title}</h3>
                {media.description && <p className="text-sm text-slate-600">{media.description}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

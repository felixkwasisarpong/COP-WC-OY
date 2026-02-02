"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchSermon } from "@/services/sermons";
import { Button } from "@/components/button";

export default function SermonDetailPage({ params }: { params: { id: string } }) {
  const { data, isLoading } = useQuery({
    queryKey: ["sermon", params.id],
    queryFn: () => fetchSermon(params.id)
  });

  if (isLoading) {
    return <p className="py-16 text-center text-sm text-slate-500">Loading sermon...</p>;
  }

  if (!data) {
    return <p className="py-16 text-center text-sm text-slate-500">Sermon not found.</p>;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 space-y-10">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-ember">Sermon</p>
        <h1 className="font-display text-4xl">{data.title}</h1>
        <p className="text-sm text-slate-600">
          {data.speaker} • {new Date(data.sermon_date).toLocaleDateString()} • {data.scripture}
        </p>
        {data.description && <p className="text-slate-600">{data.description}</p>}
      </div>

      <div className="space-y-6">
        {data.video_url ? (
          <div className="aspect-video rounded-3xl overflow-hidden shadow-soft-xl">
            <iframe
              title={data.title}
              src={data.video_url}
              className="w-full h-full"
              allowFullScreen
              loading="lazy"
            />
          </div>
        ) : (
          <div className="rounded-3xl bg-white/80 p-10 text-center shadow-soft-md">
            <p className="text-sm text-slate-600">Video coming soon.</p>
          </div>
        )}

        {data.audio_url && (
          <audio controls className="w-full">
            <source src={data.audio_url} />
          </audio>
        )}
      </div>

      <div className="flex flex-wrap gap-4">
        <Button href="/sermons" variant="outline">
          Back to Sermons
        </Button>
        <Button href="/give">Support Ministry</Button>
      </div>
    </div>
  );
}

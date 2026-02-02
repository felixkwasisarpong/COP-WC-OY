"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAnnouncements } from "@/services/announcements";

export function AnnouncementPreview() {
  const { data, isLoading } = useQuery({
    queryKey: ["announcements"],
    queryFn: () => fetchAnnouncements(undefined, true)
  });

  if (isLoading) {
    return <p className="text-sm text-slate-600">Loading announcements...</p>;
  }

  const items = data?.items?.slice(0, 3) || [];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((item: any) => (
        <div key={item.id} className="rounded-3xl bg-white/90 p-5 shadow-soft-md">
          <p className="text-xs uppercase tracking-[0.3em] text-ember">Latest News</p>
          <h3 className="mt-3 font-display text-xl text-ink">{item.title}</h3>
          <p className="mt-2 text-sm text-slate-600">{item.body}</p>
        </div>
      ))}
    </div>
  );
}

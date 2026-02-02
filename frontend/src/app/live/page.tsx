"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchLivestream } from "@/services/livestream";
import { LiveIndicator } from "@/components/live-indicator";
import { SectionHeading } from "@/components/section-heading";

export default function LivePage() {
  const { data, isLoading } = useQuery({
    queryKey: ["livestream"],
    queryFn: fetchLivestream
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 space-y-12">
      <SectionHeading
        eyebrow="Livestream"
        title="Join us live for worship"
        description="Watch in real time or catch the replay if we are offline."
      />

      {isLoading ? (
        <p className="text-center text-sm text-slate-500">Loading livestream...</p>
      ) : data ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <LiveIndicator isLive={data.is_live} />
            <span className="text-xs uppercase tracking-[0.3em] text-slate-500">{data.schedule_text || "Sundays 9:00 AM & 11:00 AM"}</span>
          </div>
          {data.embed_url ? (
            <div className="aspect-video rounded-3xl overflow-hidden shadow-soft-xl">
              <iframe
                title="Live stream"
                src={data.embed_url}
                className="w-full h-full"
                allowFullScreen
                loading="lazy"
              />
            </div>
          ) : (
            <div className="rounded-3xl bg-white/80 p-12 text-center shadow-soft-md">
              <p className="text-sm text-slate-600">Livestream is offline. Check back during service times.</p>
            </div>
          )}
        </div>
      ) : (
        <p className="text-center text-sm text-slate-500">Livestream info not available.</p>
      )}

      <div className="rounded-3xl bg-white/80 p-8 shadow-soft-md">
        <h3 className="font-display text-2xl">Upcoming service times</h3>
        <ul className="mt-4 space-y-2 text-sm text-slate-600">
          <li>Sunday Morning Worship — 9:00 AM</li>
          <li>Sunday Morning Worship — 11:00 AM</li>
          <li>Wednesday Night Prayer — 7:00 PM</li>
        </ul>
      </div>
    </div>
  );
}

"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchSiteContent } from "@/services/site-content";
import { mediaViewUrl } from "@/services/media";

export function HeroMedia() {
  const { data } = useQuery({
    queryKey: ["site-content"],
    queryFn: fetchSiteContent
  });

  if (data?.hero_media_id) {
    return (
      <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-soft-xl">
        <img
          src={mediaViewUrl(data.hero_media_id)}
          alt="Church gathering"
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className="aspect-[4/5] rounded-[2.5rem] bg-white/80 shadow-soft-xl p-6">
      <div className="h-full rounded-[2rem] bg-gradient-to-br from-wheat via-white to-mist flex flex-col justify-between">
        <div className="p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-ember">This Week</p>
          <h2 className="mt-3 font-display text-3xl">"Faith that Moves"</h2>
          <p className="mt-3 text-sm text-slate-600">Join Pastor Jordan for a message on steadfast hope.</p>
        </div>
        <div className="p-6">
          <span className="inline-flex rounded-full border border-ember px-5 py-2 text-sm uppercase tracking-[0.2em] text-ember">
            Explore Sermons
          </span>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useQuery } from "@tanstack/react-query";
import { SectionHeading } from "@/components/section-heading";
import { fetchLeaders } from "@/services/leaders";
import { mediaViewUrl } from "@/services/media";

export default function LeadershipPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["leaders"],
    queryFn: () => fetchLeaders()
  });

  const leaders = data?.items || [];

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 space-y-14">
      <SectionHeading
        eyebrow="Leadership"
        title="Shepherds, servants, and builders"
        description="Meet the team that helps guide our church with prayer, wisdom, and compassion."
      />
      {isLoading ? (
        <p className="text-center text-sm text-slate-600">Loading leadership...</p>
      ) : leaders.length ? (
        <div className="grid gap-6 md:grid-cols-2">
          {leaders.map((leader: any) => (
            <div key={leader.id} className="rounded-none bg-white/80 p-6 shadow-soft-md">
              {leader.photo_media_id ? (
                <img
                  src={mediaViewUrl(leader.photo_media_id)}
                  alt={leader.name}
                  className="h-20 w-20 object-cover rounded-none"
                  loading="lazy"
                />
              ) : (
                <div className="h-16 w-16 rounded-none bg-hero-glow flex items-center justify-center text-ember font-display text-xl">
                  {leader.name.charAt(0)}
                </div>
              )}
              <h3 className="mt-4 font-display text-2xl">{leader.name}</h3>
              <p className="text-sm text-slate-600">{leader.role}</p>
              {leader.focus && (
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500 mt-2">
                  {leader.focus}
                </p>
              )}
              {leader.bio && <p className="mt-3 text-sm text-slate-600">{leader.bio}</p>}
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-none bg-white/80 p-8 text-center text-sm text-slate-600 shadow-soft-md">
          Leadership profiles will appear here once they are added in the admin portal.
        </div>
      )}
    </div>
  );
}

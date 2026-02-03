"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchSiteContent } from "@/services/site-content";
import { mediaViewUrl } from "@/services/media";

const ministries = [
  { name: "Kids Ministry", description: "Safe, joyful spaces where kids learn about Jesus." },
  { name: "Youth Collective", description: "Equipping students to lead with faith and courage." },
  { name: "Women of Grace", description: "Community and discipleship for women of all ages." },
  { name: "Men of Valor", description: "Brotherhood, accountability, and spiritual growth." },
  { name: "Outreach", description: "Serving our city through compassion and practical help." },
  { name: "Worship Arts", description: "Creating worship experiences that honor God." }
];

export default function MinistriesPage() {
  const { data } = useQuery({
    queryKey: ["site-content"],
    queryFn: fetchSiteContent
  });

  const mediaId = data?.ministries_media_id as number | undefined | null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 space-y-14">
      <div className="relative h-64 md:h-80 bg-ink overflow-hidden">
        {mediaId ? (
          <img
            src={mediaViewUrl(mediaId)}
            alt="Ministries"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-ink via-sage to-ember" />
        )}
        <div className="absolute inset-0 bg-slate-950/45" />
        <div className="absolute inset-0 flex items-center">
          <div className="px-6 md:px-10 text-white space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-wheat">Ministries</p>
            <h1 className="font-display text-3xl md:text-4xl">Where every generation belongs</h1>
            <p className="max-w-xl text-sm text-white/80">
              Find a ministry that helps you grow, serve, and connect in community.
            </p>
          </div>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {ministries.map((ministry) => (
          <div key={ministry.name} className="rounded-none border border-wheat bg-white/80 p-6 shadow-soft-md">
            <h3 className="font-display text-2xl">{ministry.name}</h3>
            <p className="mt-3 text-sm text-slate-600">{ministry.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

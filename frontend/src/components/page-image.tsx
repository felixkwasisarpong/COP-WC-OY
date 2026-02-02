"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchSiteContent } from "@/services/site-content";
import { mediaViewUrl } from "@/services/media";

const keyMap = {
  about: "about_media_id",
  ministries: "ministries_media_id",
  contact: "contact_media_id"
} as const;

export function PageImage({ kind, fallback }: { kind: keyof typeof keyMap; fallback: string }) {
  const { data } = useQuery({
    queryKey: ["site-content"],
    queryFn: fetchSiteContent
  });

  const mediaId = data?.[keyMap[kind]] as number | undefined | null;

  return (
    <div className="rounded-[2.5rem] bg-white/80 p-4 shadow-soft-xl">
      <div className="rounded-[2rem] overflow-hidden bg-gradient-to-br from-wheat via-white to-mist">
        {mediaId ? (
          <img
            src={mediaViewUrl(mediaId)}
            alt={fallback}
            className="h-72 w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="h-72 flex items-center justify-center text-ember font-display text-xl">{fallback}</div>
        )}
      </div>
    </div>
  );
}

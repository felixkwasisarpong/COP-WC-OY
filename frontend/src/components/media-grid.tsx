"use client";

import { useAuth } from "@/hooks/use-auth";
import { downloadMedia, mediaViewUrl } from "@/services/media";
import { Download, Eye } from "lucide-react";

export function MediaGrid({ items, rounded = true }: { items: any[]; rounded?: boolean }) {
  const { token } = useAuth();
  const cardRadius = rounded ? "rounded-3xl" : "rounded-none";
  const imageRadius = rounded ? "rounded-2xl" : "rounded-none";
  const cardBase = rounded ? "bg-white/90 p-4 shadow-soft-md" : "bg-transparent p-0";
  const overlayClass = rounded
    ? "bg-gradient-to-t from-ink/40 to-transparent group-hover:from-ink/70"
    : "bg-transparent group-hover:bg-slate-950/35";
  const iconButton = "text-white transition hover:text-wheat";

  const handleDownload = async (id: number, filename: string) => {
    if (!token) return;
    const blob = await downloadMedia(id, token);
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
      {items.map((media) => (
        <div key={media.id} className={`${cardRadius} ${cardBase}`}>
          <div className={`group relative h-44 ${imageRadius} overflow-hidden bg-mist`}>
            <img
              src={mediaViewUrl(media.id)}
              alt={media.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className={`absolute inset-0 transition ${overlayClass}`} />
            <div className="absolute inset-x-3 bottom-3 flex items-center justify-between">
              <a
                href={mediaViewUrl(media.id)}
                target="_blank"
                rel="noreferrer"
                aria-label="Preview image"
                className={iconButton}
              >
                <Eye className="h-5 w-5" />
              </a>
              {token && media.downloads_enabled && (
                <button
                  onClick={() => handleDownload(media.id, media.filename)}
                  aria-label="Download image"
                  className={iconButton}
                >
                  <Download className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

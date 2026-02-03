"use client";

import { useAuth } from "@/hooks/use-auth";
import { downloadMedia, mediaViewUrl } from "@/services/media";

export function MediaGrid({ items, rounded = true }: { items: any[]; rounded?: boolean }) {
  const { token } = useAuth();
  const cardRadius = rounded ? "rounded-3xl" : "rounded-none";
  const imageRadius = rounded ? "rounded-2xl" : "rounded-none";
  const buttonRadius = rounded ? "rounded-full" : "rounded-none";
  const cardBase = rounded ? "bg-white/90 p-4 shadow-soft-md" : "bg-transparent p-0";
  const actionSpacing = rounded ? "mt-4" : "mt-3";
  const overlayClass = rounded ? "bg-gradient-to-t from-ink/40 to-transparent" : "bg-transparent";

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
          <div className={`relative h-44 ${imageRadius} overflow-hidden bg-mist`}>
            <img
              src={mediaViewUrl(media.id)}
              alt={media.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className={`absolute inset-0 ${overlayClass}`} />
          </div>
          <div className={`${actionSpacing} flex flex-wrap gap-3`}>
            <a
              href={mediaViewUrl(media.id)}
              target="_blank"
              rel="noreferrer"
              className={`${buttonRadius} border border-ember px-4 py-2 text-xs uppercase tracking-[0.3em] text-ember`}
            >
              Preview
            </a>
            {token && media.downloads_enabled && (
              <button
                onClick={() => handleDownload(media.id, media.filename)}
                className={`${buttonRadius} bg-ember px-4 py-2 text-xs uppercase tracking-[0.3em] text-white`}
              >
                Download
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

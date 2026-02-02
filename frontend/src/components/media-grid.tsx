"use client";

import { useAuth } from "@/hooks/use-auth";
import { downloadMedia, mediaViewUrl } from "@/services/media";

export function MediaGrid({ items }: { items: any[] }) {
  const { token } = useAuth();

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
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {items.map((media) => (
        <div key={media.id} className="rounded-3xl bg-white/90 p-4 shadow-soft-md">
          <div className="relative h-44 rounded-2xl overflow-hidden bg-mist">
            <img
              src={mediaViewUrl(media.id)}
              alt={media.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={mediaViewUrl(media.id)}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-ember px-4 py-2 text-xs uppercase tracking-[0.3em] text-ember"
            >
              Preview
            </a>
            {token && media.downloads_enabled && (
              <button
                onClick={() => handleDownload(media.id, media.filename)}
                className="rounded-full bg-ember px-4 py-2 text-xs uppercase tracking-[0.3em] text-white"
              >
                Download
              </button>
            )}
          </div>
          {media.description && <p className="mt-3 text-xs text-slate-500">{media.description}</p>}
        </div>
      ))}
    </div>
  );
}

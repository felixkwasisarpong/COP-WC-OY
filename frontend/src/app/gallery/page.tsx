"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMedia, mediaViewUrl } from "@/services/media";
import { MediaGrid } from "@/components/media-grid";

export default function GalleryPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["media"],
    queryFn: () => fetchMedia()
  });

  const items = (data?.items || []) as any[];
  const sortedItems = useMemo(
    () => [...items].sort((a, b) => new Date(b.uploaded_at).getTime() - new Date(a.uploaded_at).getTime()),
    [items]
  );
  const recentTitles = useMemo(() => {
    const seen = new Set<string>();
    const titles: string[] = [];
    for (const item of sortedItems) {
      if (item.title && !seen.has(item.title)) {
        seen.add(item.title);
        titles.push(item.title);
      }
      if (titles.length === 3) break;
    }
    return titles;
  }, [sortedItems]);

  const categories = ["All Media", ...recentTitles];
  const [activeCategory, setActiveCategory] = useState("All Media");
  const filteredItems =
    activeCategory === "All Media"
      ? items
      : items.filter((item) => item.title === activeCategory);

  const heroItems = sortedItems.slice(0, 3);

  return (
    <div className="bg-white">
      <div className="w-full">
        <div className="grid md:grid-cols-3">
          {heroItems.length ? (
            heroItems.map((media: any, index: number) => (
              <div key={media.id} className="relative h-64 md:h-[420px] overflow-hidden bg-slate-900">
                <img
                  src={mediaViewUrl(media.id)}
                  alt={media.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-slate-950/30" />
                {index === 1 && (
                  <div className="absolute bottom-6 left-6 text-white">
                    <p className="text-xs uppercase tracking-[0.3em] text-wheat">The Church of Pentecost</p>
                    <h1 className="mt-3 font-display text-3xl md:text-4xl leading-tight">
                      Catch Us
                      <br />
                      In Action
                    </h1>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="col-span-full h-64 md:h-[420px] bg-slate-950 flex items-center justify-center text-sm text-slate-300">
              Media highlights will appear here.
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs uppercase tracking-[0.3em] text-slate-600">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`border-b-2 pb-2 transition ${
                activeCategory === category ? "border-ember text-ember" : "border-transparent hover:text-ember"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-16">
        {isLoading ? (
          <p className="text-center text-sm text-slate-500">Loading gallery...</p>
        ) : (
          <MediaGrid items={filteredItems} rounded={false} />
        )}
      </div>
    </div>
  );
}

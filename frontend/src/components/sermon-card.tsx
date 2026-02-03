import Link from "next/link";

export function SermonCard({
  id,
  title,
  speaker,
  date,
  scripture,
  imageUrl,
  rounded = true
}: {
  id: number;
  title: string;
  speaker: string;
  date: string;
  scripture: string;
  imageUrl?: string;
  rounded?: boolean;
}) {
  const cardRadius = rounded ? "rounded-3xl" : "rounded-none";
  const imageRadius = rounded ? "rounded-2xl" : "rounded-none";

  return (
    <Link
      href={`/sermons/${id}`}
      className={`group ${cardRadius} bg-white/80 p-6 shadow-soft-md transition hover:-translate-y-1 hover:shadow-soft-xl`}
    >
      <div
        className={`h-40 ${imageRadius} bg-hero-glow overflow-hidden flex items-center justify-center text-ember font-display text-xl`}
      >
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="h-full w-full object-cover" loading="lazy" />
        ) : (
          title.charAt(0)
        )}
      </div>
      <div className="mt-5 space-y-2">
        <h3 className="font-display text-xl group-hover:text-ember transition">{title}</h3>
        <p className="text-sm text-slate-600">{speaker}</p>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{date}</p>
        <p className="text-xs text-slate-500">{scripture}</p>
      </div>
    </Link>
  );
}

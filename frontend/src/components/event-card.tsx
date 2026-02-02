import Link from "next/link";

export function EventCard({
  id,
  title,
  date,
  location,
  imageUrl
}: {
  id: number;
  title: string;
  date: string;
  location: string;
  imageUrl?: string;
}) {
  return (
    <Link
      href={`/events/${id}`}
      className="rounded-3xl border border-wheat bg-white/80 p-6 shadow-soft-md transition hover:-translate-y-1 hover:shadow-soft-xl"
    >
      <div className="h-32 rounded-2xl bg-gradient-to-br from-wheat via-white to-mist overflow-hidden flex items-center justify-center text-ember font-display text-xl">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="h-full w-full object-cover" loading="lazy" />
        ) : (
          title.charAt(0)
        )}
      </div>
      <p className="mt-4 text-xs uppercase tracking-[0.3em] text-ember">Upcoming</p>
      <h3 className="mt-2 font-display text-2xl">{title}</h3>
      <p className="mt-3 text-sm text-slate-600">{date}</p>
      <p className="text-sm text-slate-500">{location}</p>
    </Link>
  );
}

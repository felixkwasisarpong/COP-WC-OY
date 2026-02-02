export function SectionHeading({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="text-center max-w-2xl mx-auto space-y-3">
      <p className="text-xs uppercase tracking-[0.3em] text-ember">{eyebrow}</p>
      <h2 className="font-display text-3xl md:text-4xl">{title}</h2>
      {description && <p className="text-sm text-slate-600">{description}</p>}
    </div>
  );
}

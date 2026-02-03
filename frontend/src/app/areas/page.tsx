import { SectionHeading } from "@/components/section-heading";

export default function AreasPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 space-y-12">
      <SectionHeading
        eyebrow="Areas and Districts"
        title="Our mission footprint"
        description="Explore the areas and districts served by The Church of Pentecost."
      />
      <div className="rounded-none bg-white/90 p-6 shadow-soft-md text-sm text-slate-600">
        Content for areas and districts will be added here.
      </div>
    </div>
  );
}

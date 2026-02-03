import { SectionHeading } from "@/components/section-heading";

const leaders = [
  { name: "Pastor Jordan Ellis", role: "Lead Pastor", focus: "Preaching & Vision" },
  { name: "Rev. Amelia Brooks", role: "Executive Pastor", focus: "Operations & Care" },
  { name: "Marcus Hill", role: "Worship Director", focus: "Music & Creative" },
  { name: "Sofia Grant", role: "Family Ministries", focus: "Kids & Students" }
];

export default function LeadershipPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 space-y-14">
      <SectionHeading
        eyebrow="Leadership"
        title="Shepherds, servants, and builders"
        description="Meet the team that helps guide our church with prayer, wisdom, and compassion."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {leaders.map((leader) => (
          <div key={leader.name} className="rounded-none bg-white/80 p-6 shadow-soft-md">
            <div className="h-16 w-16 rounded-full bg-hero-glow flex items-center justify-center text-ember font-display text-xl">
              {leader.name.charAt(0)}
            </div>
            <h3 className="mt-4 font-display text-2xl">{leader.name}</h3>
            <p className="text-sm text-slate-600">{leader.role}</p>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500 mt-2">{leader.focus}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

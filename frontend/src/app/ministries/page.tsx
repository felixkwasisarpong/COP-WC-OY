import { SectionHeading } from "@/components/section-heading";
import { PageImage } from "@/components/page-image";

const ministries = [
  { name: "Kids Ministry", description: "Safe, joyful spaces where kids learn about Jesus." },
  { name: "Youth Collective", description: "Equipping students to lead with faith and courage." },
  { name: "Women of Grace", description: "Community and discipleship for women of all ages." },
  { name: "Men of Valor", description: "Brotherhood, accountability, and spiritual growth." },
  { name: "Outreach", description: "Serving our city through compassion and practical help." },
  { name: "Worship Arts", description: "Creating worship experiences that honor God." }
];

export default function MinistriesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 space-y-14">
      <SectionHeading
        eyebrow="Ministries"
        title="Where every generation belongs"
        description="Find a ministry that helps you grow, serve, and connect in community."
      />
      <PageImage kind="ministries" fallback="Ministry moments" />
      <div className="grid gap-6 md:grid-cols-2">
        {ministries.map((ministry) => (
          <div key={ministry.name} className="rounded-3xl border border-wheat bg-white/80 p-6 shadow-soft-md">
            <h3 className="font-display text-2xl">{ministry.name}</h3>
            <p className="mt-3 text-sm text-slate-600">{ministry.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

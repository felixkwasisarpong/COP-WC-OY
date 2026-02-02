import { SectionHeading } from "@/components/section-heading";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 space-y-14">
      <SectionHeading
        eyebrow="Our story"
        title="A mission to love God and serve people"
        description="We exist to help people encounter Jesus, grow in faith, and live on mission together."
      />
      <div className="grid gap-10 md:grid-cols-2 items-center">
        <div className="space-y-4 text-slate-600">
          <p>
            Covenant of Praise Church is a vibrant community committed to authentic worship,
            compassionate outreach, and transformational discipleship. We believe the local church
            is the hope of the world when we gather, grow, and go together.
          </p>
          <p>
            Our vision is to create spaces where families thrive, students lead with courage, and
            every person can discover their God-given purpose.
          </p>
          <ul className="space-y-3 text-sm">
            <li>Mission: Help people know Jesus and make Him known.</li>
            <li>Vision: A thriving church impacting our city and beyond.</li>
            <li>Beliefs: Rooted in Scripture, empowered by grace, centered on Christ.</li>
          </ul>
        </div>
        <div className="rounded-[2.5rem] bg-white/80 p-8 shadow-soft-xl">
          <div className="rounded-[2rem] bg-gradient-to-br from-wheat via-white to-mist p-8 space-y-4">
            <h3 className="font-display text-2xl">What we value</h3>
            <p className="text-sm text-slate-600">
              Worship that is heartfelt. Community that is intentional. Service that is generous.
            </p>
            <div className="grid gap-4 text-sm text-slate-600">
              <div>Spirit-led worship and prayer</div>
              <div>Life-giving small groups</div>
              <div>Compassionate outreach</div>
              <div>Next generation leadership</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

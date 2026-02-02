import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/button";
import { PageImage } from "@/components/page-image";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 space-y-14">
      <SectionHeading
        eyebrow="About us"
        title="The Church of Pentecost — Oyarifa Worship Center"
        description="We are a Bible-believing, Holy Spirit, people and mission oriented church."
      />
      <div className="grid gap-10 md:grid-cols-2 items-center">
        <div className="space-y-4 text-slate-600">
          <p>
            We are part of The Church of Pentecost, a global Pentecostal movement devoted to
            proclaiming Christ, making disciples, and serving communities with compassion.
          </p>
          <p>
            Our local assembly gathers for vibrant worship, teaching, and fellowship, equipping
            believers to live Spirit-empowered lives.
          </p>
          <div className="grid gap-4 text-sm text-slate-600">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-ember">Mission</span>
              <p className="mt-2">
                We exist to establish responsible and self-sustaining churches filled with committed,
                Spirit-filled Christians of character, who will impact their communities.
              </p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-ember">Vision</span>
              <p className="mt-2">
                To become a global Pentecostal church that is culturally relevant in vibrant evangelism,
                church planting, discipleship and holistic ministry.
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <PageImage kind="about" fallback="Our community" />
          <div className="rounded-[2.5rem] bg-white/90 p-8 shadow-soft-xl">
            <div className="rounded-[2rem] bg-mist p-8 space-y-4">
              <h3 className="font-display text-2xl">Our Tenets & Core Beliefs</h3>
              <p className="text-sm text-slate-600">
                Our tenets form the foundation of our doctrine, while our core beliefs shape how we
                live, serve, and worship.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button href="/about" variant="outline">
                  Go to Tenets
                </Button>
                <Button href="/about" variant="outline">
                  Go to Core Beliefs
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

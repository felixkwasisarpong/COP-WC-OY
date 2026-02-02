import { Button } from "@/components/button";
import { SectionHeading } from "@/components/section-heading";
import { SermonPreview } from "@/components/home/sermon-preview";
import { EventPreview } from "@/components/home/event-preview";

export default function HomePage() {
  return (
    <div className="space-y-24">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 md:py-28 grid gap-12 md:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-6 animate-fade-up">
            <p className="text-xs uppercase tracking-[0.3em] text-ember">Welcome home</p>
            <h1 className="font-display text-4xl md:text-5xl leading-tight">
              A church family rooted in worship, shaped by love, and sent to serve.
            </h1>
            <p className="text-base text-slate-600">
              Experience uplifting worship, inspiring messages, and meaningful community every
              week. Whether you are new to faith or looking for a place to belong, there is a seat
              for you here.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="/live">Watch Live</Button>
              <Button href="/about" variant="outline">
                Our Story
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-white/80 p-5 shadow-soft-md">
                <p className="text-xs uppercase tracking-[0.3em] text-ember">Service Times</p>
                <p className="mt-2 text-sm text-slate-600">Sundays • 9:00 AM & 11:00 AM</p>
                <p className="text-sm text-slate-600">Wednesdays • 7:00 PM</p>
              </div>
              <div className="rounded-3xl bg-white/80 p-5 shadow-soft-md">
                <p className="text-xs uppercase tracking-[0.3em] text-ember">Location</p>
                <p className="mt-2 text-sm text-slate-600">123 Grace Avenue</p>
                <p className="text-sm text-slate-600">City, State 00000</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-[2.5rem] bg-white/80 shadow-soft-xl p-6">
              <div className="h-full rounded-[2rem] bg-gradient-to-br from-wheat via-white to-mist flex flex-col justify-between">
                <div className="p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-ember">This Week</p>
                  <h2 className="mt-3 font-display text-3xl">"Faith that Moves"</h2>
                  <p className="mt-3 text-sm text-slate-600">Join Pastor Jordan for a message on steadfast hope.</p>
                </div>
                <div className="p-6">
                  <Button href="/sermons" variant="outline">
                    Explore Sermons
                  </Button>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-8 -left-6 h-32 w-32 rounded-full bg-ember/20 blur-2xl animate-float" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 space-y-10">
        <SectionHeading
          eyebrow="Latest messages"
          title="Sermons for every season"
          description="Catch up on recent sermons or revisit powerful moments from past seasons."
        />
        <SermonPreview />
      </section>

      <section className="mx-auto max-w-6xl px-4 space-y-10">
        <SectionHeading
          eyebrow="Upcoming gatherings"
          title="Moments to connect"
          description="Join us for worship nights, outreach opportunities, and community events."
        />
        <EventPreview />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="rounded-[2.5rem] bg-ember text-white p-10 md:p-16 grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-white/80">Give with impact</p>
            <h2 className="font-display text-3xl md:text-4xl">Your generosity fuels ministry and mission.</h2>
            <p className="text-sm text-white/80">
              Support local outreach, global missions, and the ongoing work of our church family.
            </p>
          </div>
          <div className="flex items-center">
            <Button href="/give" variant="outline" className="border-white text-white hover:text-ember hover:bg-white">
              Give Online
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

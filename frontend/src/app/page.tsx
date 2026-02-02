import { Button } from "@/components/button";
import { SectionHeading } from "@/components/section-heading";
import { SermonPreview } from "@/components/home/sermon-preview";
import { EventPreview } from "@/components/home/event-preview";
import { HeroMedia } from "@/components/home/hero-media";
import { FeaturedContent } from "@/components/home/featured-content";
import { Tenets } from "@/components/home/tenets";
import { AnnouncementPreview } from "@/components/home/announcement-preview";

export default function HomePage() {
  return (
    <div className="space-y-24">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 md:py-28 grid gap-12 md:grid-cols-[1.05fr_0.95fr] items-center">
          <div className="space-y-6 animate-fade-up">
            <p className="text-xs uppercase tracking-[0.4em] text-ember">The Church of Pentecost</p>
            <h1 className="font-display text-4xl md:text-5xl leading-tight text-ink">
              Oyarifa Worship Center
            </h1>
            <p className="text-base text-slate-600">
              A Spirit-led community devoted to worship, discipleship, and mission. Join us as we
              grow deeper in Christ and serve with compassion.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="/live">Watch Live</Button>
              <Button href="/give" variant="outline">
                Give Online
              </Button>
              <Button href="/login" variant="outline">
                Member Login
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-white/90 p-5 shadow-soft-md">
                <p className="text-xs uppercase tracking-[0.3em] text-ember">Service Times</p>
                <p className="mt-2 text-sm text-slate-600">Sundays • 9:00 AM & 11:00 AM</p>
                <p className="text-sm text-slate-600">Wednesdays • 7:00 PM</p>
              </div>
              <div className="rounded-3xl bg-white/90 p-5 shadow-soft-md">
                <p className="text-xs uppercase tracking-[0.3em] text-ember">Location</p>
                <p className="mt-2 text-sm text-slate-600">Oyarifa Worship Center</p>
                <p className="text-sm text-slate-600">Accra, Ghana</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <HeroMedia />
            <div className="absolute -bottom-8 -left-6 h-32 w-32 rounded-full bg-ember/20 blur-2xl animate-float" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 space-y-10">
        <SectionHeading
          eyebrow="Featured"
          title="Highlighted for this season"
          description="Admin-selected sermon and event highlights for the church family."
        />
        <FeaturedContent />
      </section>

      <section className="mx-auto max-w-6xl px-4 space-y-10">
        <SectionHeading
          eyebrow="Our Tenets"
          title="What we believe"
          description="The foundations that shape our worship, community, and mission."
        />
        <Tenets />
      </section>

      <section className="mx-auto max-w-6xl px-4 space-y-10">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Our Vision",
              body: "To become a global Pentecostal church that is culturally relevant in vibrant evangelism, church planting, discipleship and holistic ministry."
            },
            {
              title: "Our Mission",
              body: "To bring all people to the saving knowledge of Christ and to discipleship, through the proclamation of the gospel, prayer, and service."
            },
            {
              title: "Core Values",
              body: "Prayer, holiness, evangelism, discipleship, stewardship, and servant leadership."
            }
          ].map((card) => (
            <div key={card.title} className="rounded-3xl bg-white/90 p-6 shadow-soft-md">
              <p className="text-xs uppercase tracking-[0.3em] text-ember">{card.title}</p>
              <p className="mt-3 text-sm text-slate-600">{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 space-y-10">
        <SectionHeading
          eyebrow="Latest updates"
          title="News and announcements"
          description="Stay connected with what is happening across the ministry."
        />
        <AnnouncementPreview />
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

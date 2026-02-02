import { Button } from "@/components/button";
import { SectionHeading } from "@/components/section-heading";
import { SermonPreview } from "@/components/home/sermon-preview";
import { EventPreview } from "@/components/home/event-preview";
import { HeroMedia } from "@/components/home/hero-media";
import { FeaturedContent } from "@/components/home/featured-content";
import { Tenets } from "@/components/home/tenets";
import { AnnouncementPreview } from "@/components/home/announcement-preview";

export default function HomePage() {
  const homeVideoUrl = process.env.NEXT_PUBLIC_HOME_VIDEO_URL;

  return (
    <div className="space-y-24">
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-hero-glow" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 md:py-28 grid gap-12 md:grid-cols-[1.05fr_0.95fr] items-center">
          <div className="space-y-6 animate-fade-up">
            <p className="text-xs uppercase tracking-[0.4em] text-ember">The Church of Pentecost</p>
            <h1 className="font-display text-4xl md:text-5xl leading-tight text-ink">
              We are a Bible-believing, Holy Spirit, people and mission oriented church.
            </h1>
            <p className="text-base text-slate-600">
              Oyarifa Worship Center is a Spirit-led community devoted to worship, discipleship, and
              mission. Join us as we grow deeper in Christ and serve with compassion.
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
          eyebrow="Welcome"
          title="A word of hope for every season"
          description="Watch a short message from our leadership and get to know our heart."
        />
        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="rounded-[2.5rem] bg-white/90 p-6 shadow-soft-xl">
            {homeVideoUrl ? (
              <div className="relative aspect-video rounded-3xl overflow-hidden">
                <iframe
                  title="Welcome video"
                  src={homeVideoUrl}
                  className="h-full w-full"
                  allowFullScreen
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                <div className="pointer-events-none absolute inset-x-6 bottom-6 flex items-center gap-4 text-white">
                  <div className="h-12 w-12 rounded-full bg-white/20 border border-white/40 flex items-center justify-center">
                    <span className="ml-1 text-lg">▶</span>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/80">Welcome video</p>
                    <p className="font-display text-2xl">A message of hope and purpose</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="aspect-video rounded-3xl border border-wheat bg-mist flex items-center justify-center text-sm text-slate-600">
                Add `NEXT_PUBLIC_HOME_VIDEO_URL` to show the welcome video.
              </div>
            )}
          </div>
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-ember">Our Story</p>
            <h3 className="font-display text-3xl text-ink">A Spirit-led church rooted in Scripture.</h3>
            <p className="text-sm text-slate-600">
              The Church of Pentecost exists to proclaim Christ, equip believers, and impact our
              communities through worship, prayer, and mission.
            </p>
            <Button href="/about" variant="outline">
              Learn more
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 space-y-10">
        <SectionHeading
          eyebrow="Our Tenets"
          title="What we believe"
          description="The foundations that shape our worship, community, and mission."
        />
        <div className="grid gap-8 md:grid-cols-[1fr_1.2fr] items-start">
          <div className="rounded-3xl bg-white/90 p-6 shadow-soft-md space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-ember">Our Tenets</p>
            <p className="text-sm text-slate-600">
              Discover the foundational beliefs that guide our worship and doctrine.
            </p>
            <Button href="/about" variant="outline">
              Read Tenets
            </Button>
          </div>
          <Tenets />
        </div>
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
              body: "To become a global Pentecostal church that is culturally relevant in vibrant evangelism, church planting, discipleship and holistic ministry.",
              action: "See the vision"
            },
            {
              title: "Our Mission",
              body: "To bring all people to the saving knowledge of Christ and to discipleship through the proclamation of the gospel, prayer, and service.",
              action: "Dive in"
            },
            {
              title: "Core Values",
              body: "Prayer, holiness, evangelism, discipleship, stewardship, and servant leadership.",
              action: "Discover"
            }
          ].map((card) => (
            <div key={card.title} className="rounded-3xl bg-white/90 p-6 shadow-soft-md space-y-3">
              <p className="text-xs uppercase tracking-[0.3em] text-ember">{card.title}</p>
              <p className="text-sm text-slate-600">{card.body}</p>
              <Button href="/about" variant="outline">
                {card.action}
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 space-y-10">
        <SectionHeading
          eyebrow="Latest posts"
          title="News and announcements"
          description="Stay connected with what is happening across the ministry."
        />
        <AnnouncementPreview />
      </section>

      <section className="mx-auto max-w-6xl px-4 space-y-10">
        <SectionHeading
          eyebrow="Get connected"
          title="Explore the life of the church"
          description="Discover ministries, gatherings, and resources to help you grow."
        />
        <div className="grid gap-6 md:grid-cols-4">
          {[
            { title: "Explore Ministries", body: "Find a ministry for every season and generation.", href: "/ministries" },
            { title: "Join Us", body: "Plan your visit and worship with us this Sunday.", href: "/contact" },
            { title: "Get Resources", body: "Watch sermons and access teaching materials.", href: "/sermons" },
            { title: "Know Our Leaders", body: "Meet the pastors and ministry leaders.", href: "/leadership" }
          ].map((card) => (
            <div key={card.title} className="rounded-3xl bg-white/90 p-6 shadow-soft-md">
              <p className="text-xs uppercase tracking-[0.3em] text-ember">{card.title}</p>
              <p className="mt-3 text-sm text-slate-600">{card.body}</p>
              <Button href={card.href} variant="outline" className="mt-4">
                Learn more
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 space-y-10">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              title: "Give towards the work of God",
              body: "Partner with us in kingdom impact through your generosity.",
              href: "/give",
              action: "Give now"
            },
            {
              title: "Have Questions?",
              body: "We are here to help you take your next step.",
              href: "/contact",
              action: "Reach out"
            }
          ].map((card) => (
            <div key={card.title} className="rounded-[2.5rem] bg-mist border border-wheat p-8 shadow-soft-md">
              <p className="text-xs uppercase tracking-[0.3em] text-ember">{card.title}</p>
              <p className="mt-3 text-sm text-slate-600">{card.body}</p>
              <Button href={card.href} variant="outline" className="mt-4">
                {card.action}
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-10">
        <div className="rounded-[2.5rem] bg-mist border border-wheat p-10 md:p-16 grid gap-10 md:grid-cols-[1.2fr_0.8fr] items-center">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-ember">Jesus is calling</p>
            <h2 className="font-display text-3xl md:text-4xl text-ink">Respond to the call of Jesus Christ today.</h2>
            <p className="text-sm text-slate-600">
              If you are ready to begin a new life in Christ, we would love to pray with you and
              help you take your next step.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button href="/contact">Accept Jesus</Button>
            <Button href="/contact" variant="outline">
              Reach out
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 space-y-10">
        <div className="grid gap-6 md:grid-cols-4">
          {[
            { title: "Pentecost Biblical Seminary", body: "Training leaders for ministry." },
            { title: "National Calendar of Events", body: "Stay updated on upcoming gatherings." },
            { title: "Prayer Request", body: "Submit a prayer request for our team." },
            { title: "Missions & Urban Outreach", body: "Serving communities with the gospel." }
          ].map((card) => (
            <div key={card.title} className="rounded-3xl bg-white/90 p-5 shadow-soft-md">
              <p className="text-xs uppercase tracking-[0.3em] text-ember">{card.title}</p>
              <p className="mt-3 text-sm text-slate-600">{card.body}</p>
            </div>
          ))}
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

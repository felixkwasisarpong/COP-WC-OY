import { Button } from "@/components/button";
import { SectionHeading } from "@/components/section-heading";
import { SermonPreview } from "@/components/home/sermon-preview";
import { EventPreview } from "@/components/home/event-preview";
import { HeroMedia } from "@/components/home/hero-media";
import { FeaturedContent } from "@/components/home/featured-content";
import { Tenets } from "@/components/home/tenets";
import { AnnouncementPreview } from "@/components/home/announcement-preview";
import { InteractiveSocial } from "@/components/home/interactive-social";

export default function HomePage() {
  const homeVideoUrl = process.env.NEXT_PUBLIC_HOME_VIDEO_URL;
  const embedUrl = homeVideoUrl
    ? homeVideoUrl.includes("youtube.com/embed")
      ? homeVideoUrl
      : homeVideoUrl.includes("youtu.be/")
        ? `https://www.youtube.com/embed/${homeVideoUrl.split("youtu.be/")[1].split("?")[0]}`
        : homeVideoUrl.includes("youtube.com/watch")
          ? `https://www.youtube.com/embed/${new URL(homeVideoUrl).searchParams.get("v")}`
          : homeVideoUrl
    : null;
  const youtubeId = embedUrl?.includes("youtube.com/embed/")
    ? embedUrl.split("youtube.com/embed/")[1].split("?")[0]
    : null;
  const videoSrc = embedUrl
    ? youtubeId
      ? `${embedUrl}?autoplay=1&mute=1&controls=0&loop=1&playlist=${youtubeId}&rel=0&modestbranding=1&playsinline=1`
      : embedUrl
    : null;

  return (
    <div className="space-y-24">
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-900" />
        <div className="relative">
          {videoSrc ? (
            <div className="relative aspect-video w-full overflow-hidden">
              <iframe
                title="Welcome video"
                src={videoSrc}
                className="h-full w-full"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-indigo-900/70" />
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
            <div className="aspect-video w-full border border-slate-700 bg-slate-900 flex items-center justify-center text-sm text-slate-300">
              Add `NEXT_PUBLIC_HOME_VIDEO_URL` (YouTube/Vimeo embed URL) to show the welcome video.
            </div>
          )}
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-10 md:py-12">
          <div className="grid gap-6 md:grid-cols-3 text-white">
            <div className="rounded-none bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-wheat">Service Times</p>
              <p className="mt-2 text-sm text-slate-200">Sundays • 9:00 AM & 11:00 AM</p>
              <p className="text-sm text-slate-300">Wednesdays • 7:00 PM</p>
            </div>
            <div className="rounded-none bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-wheat">Location</p>
              <p className="mt-2 text-sm text-slate-200">Oyarifa Worship Center</p>
              <p className="text-sm text-slate-300">Accra, Ghana</p>
            </div>
            <div className="rounded-none bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-wheat">Get Connected</p>
              <p className="mt-2 text-sm text-slate-200">Join a ministry or small group.</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button href="/contact" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-950">
                  Visit Us
                </Button>
                <Button href="/give" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-950">
                  Give
                </Button>
              </div>
            </div>
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
          <div className="rounded-none bg-white/90 p-6 shadow-soft-md space-y-4">
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
            <div key={card.title} className="rounded-none bg-white/90 p-6 shadow-soft-md space-y-3">
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
            <div key={card.title} className="rounded-none bg-white/90 p-6 shadow-soft-md">
              <p className="text-xs uppercase tracking-[0.3em] text-ember">{card.title}</p>
              <p className="mt-3 text-sm text-slate-600">{card.body}</p>
              <Button href={card.href} variant="outline" className="mt-4">
                Learn more
              </Button>
            </div>
          ))}
        </div>
      </section>

      <InteractiveSocial />

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
            <div key={card.title} className="rounded-none bg-mist border border-wheat p-8 shadow-soft-md">
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
        <div className="rounded-none bg-mist border border-wheat p-10 md:p-16 grid gap-10 md:grid-cols-[1.2fr_0.8fr] items-center">
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
            <div key={card.title} className="rounded-none bg-white/90 p-5 shadow-soft-md">
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
        <div className="rounded-none bg-ember text-white p-10 md:p-16 grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
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

import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-wheat bg-mist">
      <div className="mx-auto max-w-6xl px-4 py-12 grid gap-8 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <h3 className="font-display text-2xl">The Church of Pentecost</h3>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Oyarifa Worship Center</p>
          <p className="mt-3 text-sm text-slate-600 max-w-md">
            A community grounded in worship, discipleship, and service. Join us as we grow in
            faith and serve our city together.
          </p>
          <p className="mt-4 text-sm text-slate-600">Sundays 9:00 AM & 11:00 AM • Wednesdays 7:00 PM</p>
        </div>
        <div>
          <h4 className="font-display text-lg">Visit</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>123 Grace Avenue</li>
            <li>City, State 00000</li>
            <li>info@thechurchofpentecost.org</li>
            <li>(555) 555-1234</li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-lg">Explore</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>
              <Link href="/sermons">Sermons</Link>
            </li>
            <li>
              <Link href="/events">Events</Link>
            </li>
            <li>
              <Link href="/ministries">Ministries</Link>
            </li>
            <li>
              <Link href="/give">Online Giving</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-wheat py-4 text-center text-xs text-slate-500">
        © 2026 The Church of Pentecost, Oyarifa Worship Center. All rights reserved.
      </div>
    </footer>
  );
}

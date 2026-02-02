import { SectionHeading } from "@/components/section-heading";
import { PageImage } from "@/components/page-image";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 space-y-14">
      <SectionHeading
        eyebrow="Contact"
        title="We would love to hear from you"
        description="Reach out with questions, prayer requests, or ways we can serve you."
      />
      <div className="grid gap-10 md:grid-cols-2">
        <div className="space-y-4 text-slate-600">
          <p>123 Grace Avenue, City, State 00000</p>
          <p>(555) 555-1234</p>
          <p>hello@covenantofpraise.org</p>
          <div className="rounded-3xl bg-white/80 p-6 shadow-soft-md">
            <p className="text-xs uppercase tracking-[0.3em] text-ember">Office Hours</p>
            <p className="mt-2 text-sm">Mon - Thu: 9:00 AM - 4:00 PM</p>
            <p className="text-sm">Friday: 9:00 AM - 1:00 PM</p>
          </div>
          <PageImage kind="contact" fallback="Visit us" />
        </div>
        <div className="rounded-3xl overflow-hidden shadow-soft-xl">
          <iframe
            title="Church location map"
            src="https://maps.google.com/maps?q=church&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="w-full h-80"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

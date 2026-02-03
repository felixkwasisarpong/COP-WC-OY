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
          <p># 2 Pentecost lane Oyarifa-Teiman, Ghana</p>
          <p>+233 24 288 5908</p>
          <p>info@thechurchofpentecost.org</p>
          <div className="rounded-none bg-white/80 p-6 shadow-soft-md">
            <p className="text-xs uppercase tracking-[0.3em] text-ember">Office Hours</p>
            <p className="mt-2 text-sm">Mon - Thu: 9:00 AM - 4:00 PM</p>
            <p className="text-sm">Friday: 9:00 AM - 1:00 PM</p>
          </div>
          <PageImage kind="contact" fallback="Visit us" rounded={false} />
        </div>
        <div className="rounded-none overflow-hidden shadow-soft-xl">
          <iframe
            title="Church location map"
            src="https://maps.google.com/maps?ll=5.756235,-0.1816407&z=15&t=&hl=en&gl=GH&mapclient=embed&q=C.O.P.%20Oyarifa%20Worship%20Centre"
            className="w-full h-80"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchSiteContent, SiteContent } from "@/services/site-content";
import { Instagram, Music2, Youtube } from "lucide-react";

type SocialKey = "social_tiktok_url" | "social_youtube_url" | "social_instagram_url";

const socialCards: Array<{
  key: SocialKey;
  title: string;
  subtitle: string;
  button: string;
  bg: string;
  rounded: string;
  icon: JSX.Element;
}> = [
  {
    key: "social_tiktok_url",
    title: "TikTok",
    subtitle: "Short clips, testimonies, and worship highlights.",
    button: "Follow on TikTok",
    bg: "bg-ink text-white",
    rounded: "rounded-none",
    icon: <Music2 className="h-10 w-10 text-wheat" />
  },
  {
    key: "social_youtube_url",
    title: "YouTube",
    subtitle: "Full sermons, livestream replays, and special events.",
    button: "Subscribe on YouTube",
    bg: "bg-ember text-white",
    rounded: "rounded-3xl",
    icon: <Youtube className="h-10 w-10 text-white" />
  },
  {
    key: "social_instagram_url",
    title: "Instagram",
    subtitle: "Photo moments and weekly encouragement.",
    button: "Follow on Instagram",
    bg: "bg-sage text-white",
    rounded: "rounded-2xl",
    icon: <Instagram className="h-10 w-10 text-wheat" />
  }
];

export function InteractiveSocial() {
  const { data } = useQuery({
    queryKey: ["site-content"],
    queryFn: fetchSiteContent
  });

  const content = data as SiteContent | undefined;

  return (
    <section className="mx-auto max-w-6xl px-4 space-y-8">
      <div className="flex items-center justify-center">
        <h2 className="bg-mist px-6 py-2 font-display text-3xl text-ink">Let's Get Interactive</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {socialCards.map((social) => {
          const url = content?.[social.key];
          const buttonClass =
            "mt-8 inline-flex items-center justify-center rounded-none border border-white/60 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white transition";
          return (
            <div
              key={social.title}
              className={`${social.rounded} ${social.bg} p-8 shadow-soft-md flex flex-col justify-between min-h-[280px]`}
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  {social.icon}
                  <h3 className="font-display text-2xl">{social.title}</h3>
                </div>
                <p className="text-sm text-white/80">{social.subtitle}</p>
              </div>
              {url ? (
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className={`${buttonClass} hover:bg-white hover:text-ink`}
                >
                  {social.button}
                </a>
              ) : (
                <span className={`${buttonClass} cursor-not-allowed opacity-60`} aria-disabled="true">
                  {social.button}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

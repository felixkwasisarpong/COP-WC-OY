"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AdminShell } from "@/components/admin-shell";
import { fetchSiteContent, updateSiteContent } from "@/services/site-content";
import { fetchMedia } from "@/services/media";
import { fetchSermons } from "@/services/sermons";
import { fetchEvents } from "@/services/events";
import { useAuth } from "@/hooks/use-auth";

export default function AdminSiteContentPage() {
  const queryClient = useQueryClient();
  const { token } = useAuth();
  const { data: siteContent } = useQuery({
    queryKey: ["admin-site-content"],
    queryFn: fetchSiteContent
  });
  const { data: mediaData } = useQuery({
    queryKey: ["admin-media-options"],
    queryFn: () => fetchMedia(token)
  });
  const { data: sermons } = useQuery({ queryKey: ["admin-sermons"], queryFn: fetchSermons });
  const { data: events } = useQuery({ queryKey: ["admin-events"], queryFn: fetchEvents });

  const [form, setForm] = useState({
    hero_media_id: "",
    featured_sermon_id: "",
    featured_event_id: "",
    about_media_id: "",
    ministries_media_id: "",
    contact_media_id: "",
    social_facebook_url: "",
    social_instagram_url: "",
    social_youtube_url: "",
    social_tiktok_url: ""
  });

  useEffect(() => {
    if (!siteContent) return;
    setForm({
      hero_media_id: siteContent.hero_media_id ? String(siteContent.hero_media_id) : "",
      featured_sermon_id: siteContent.featured_sermon_id ? String(siteContent.featured_sermon_id) : "",
      featured_event_id: siteContent.featured_event_id ? String(siteContent.featured_event_id) : "",
      about_media_id: siteContent.about_media_id ? String(siteContent.about_media_id) : "",
      ministries_media_id: siteContent.ministries_media_id ? String(siteContent.ministries_media_id) : "",
      contact_media_id: siteContent.contact_media_id ? String(siteContent.contact_media_id) : "",
      social_facebook_url: siteContent.social_facebook_url || "",
      social_instagram_url: siteContent.social_instagram_url || "",
      social_youtube_url: siteContent.social_youtube_url || "",
      social_tiktok_url: siteContent.social_tiktok_url || ""
    });
  }, [siteContent]);

  const updateMutation = useMutation({
    mutationFn: () =>
      updateSiteContent(
        {
          hero_media_id: form.hero_media_id ? Number(form.hero_media_id) : null,
          featured_sermon_id: form.featured_sermon_id ? Number(form.featured_sermon_id) : null,
          featured_event_id: form.featured_event_id ? Number(form.featured_event_id) : null,
          about_media_id: form.about_media_id ? Number(form.about_media_id) : null,
          ministries_media_id: form.ministries_media_id ? Number(form.ministries_media_id) : null,
          contact_media_id: form.contact_media_id ? Number(form.contact_media_id) : null,
          social_facebook_url: form.social_facebook_url || null,
          social_instagram_url: form.social_instagram_url || null,
          social_youtube_url: form.social_youtube_url || null,
          social_tiktok_url: form.social_tiktok_url || null
        },
        token || ""
      ),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-site-content"] })
  });

  const mediaOptions = mediaData?.items || [];
  const sermonOptions = sermons?.items || [];
  const eventOptions = events?.items || [];

  return (
    <AdminShell title="Site content" subtitle="Control featured content and hero imagery.">
      <div className="rounded-[2rem] bg-white/90 p-6 shadow-soft-md space-y-4">
        <h3 className="font-display text-xl text-ink">Homepage highlights</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <select
            className="rounded-2xl border border-wheat px-4 py-3"
            value={form.hero_media_id}
            onChange={(event) => setForm({ ...form, hero_media_id: event.target.value })}
          >
            <option value="">Hero image (optional)</option>
            {mediaOptions.map((media: any) => (
              <option key={media.id} value={media.id}>
                {media.title}
              </option>
            ))}
          </select>
          <select
            className="rounded-2xl border border-wheat px-4 py-3"
            value={form.featured_sermon_id}
            onChange={(event) => setForm({ ...form, featured_sermon_id: event.target.value })}
          >
            <option value="">Featured sermon</option>
            {sermonOptions.map((sermon: any) => (
              <option key={sermon.id} value={sermon.id}>
                {sermon.title}
              </option>
            ))}
          </select>
          <select
            className="rounded-2xl border border-wheat px-4 py-3"
            value={form.featured_event_id}
            onChange={(event) => setForm({ ...form, featured_event_id: event.target.value })}
          >
            <option value="">Featured event</option>
            {eventOptions.map((event: any) => (
              <option key={event.id} value={event.id}>
                {event.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="rounded-[2rem] bg-white/90 p-6 shadow-soft-md space-y-4">
        <h3 className="font-display text-xl text-ink">Page imagery</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <select
            className="rounded-2xl border border-wheat px-4 py-3"
            value={form.about_media_id}
            onChange={(event) => setForm({ ...form, about_media_id: event.target.value })}
          >
            <option value="">About page image</option>
            {mediaOptions.map((media: any) => (
              <option key={media.id} value={media.id}>
                {media.title}
              </option>
            ))}
          </select>
          <select
            className="rounded-2xl border border-wheat px-4 py-3"
            value={form.ministries_media_id}
            onChange={(event) => setForm({ ...form, ministries_media_id: event.target.value })}
          >
            <option value="">Ministries page image</option>
            {mediaOptions.map((media: any) => (
              <option key={media.id} value={media.id}>
                {media.title}
              </option>
            ))}
          </select>
          <select
            className="rounded-2xl border border-wheat px-4 py-3"
            value={form.contact_media_id}
            onChange={(event) => setForm({ ...form, contact_media_id: event.target.value })}
          >
            <option value="">Contact page image</option>
            {mediaOptions.map((media: any) => (
              <option key={media.id} value={media.id}>
                {media.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="rounded-[2rem] bg-white/90 p-6 shadow-soft-md space-y-4">
        <h3 className="font-display text-xl text-ink">Social links</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-xs uppercase tracking-[0.3em] text-slate-500">
            Facebook URL
            <input
              className="mt-2 w-full rounded-2xl border border-wheat px-4 py-3 text-sm"
              value={form.social_facebook_url}
              onChange={(event) => setForm({ ...form, social_facebook_url: event.target.value })}
              placeholder="https://facebook.com/..."
              type="url"
            />
          </label>
          <label className="text-xs uppercase tracking-[0.3em] text-slate-500">
            Instagram URL
            <input
              className="mt-2 w-full rounded-2xl border border-wheat px-4 py-3 text-sm"
              value={form.social_instagram_url}
              onChange={(event) => setForm({ ...form, social_instagram_url: event.target.value })}
              placeholder="https://instagram.com/..."
              type="url"
            />
          </label>
          <label className="text-xs uppercase tracking-[0.3em] text-slate-500">
            YouTube URL
            <input
              className="mt-2 w-full rounded-2xl border border-wheat px-4 py-3 text-sm"
              value={form.social_youtube_url}
              onChange={(event) => setForm({ ...form, social_youtube_url: event.target.value })}
              placeholder="https://youtube.com/..."
              type="url"
            />
          </label>
          <label className="text-xs uppercase tracking-[0.3em] text-slate-500">
            TikTok URL
            <input
              className="mt-2 w-full rounded-2xl border border-wheat px-4 py-3 text-sm"
              value={form.social_tiktok_url}
              onChange={(event) => setForm({ ...form, social_tiktok_url: event.target.value })}
              placeholder="https://tiktok.com/@..."
              type="url"
            />
          </label>
        </div>
      </div>

      <button
        onClick={() => updateMutation.mutate()}
        className="rounded-full bg-ember px-6 py-3 text-xs uppercase tracking-[0.3em] text-white"
      >
        {updateMutation.isPending ? "Saving..." : "Save changes"}
      </button>
    </AdminShell>
  );
}

import { apiFetch } from "@/services/api";

export type SiteContent = {
  id: number;
  hero_media_id?: number | null;
  featured_sermon_id?: number | null;
  featured_event_id?: number | null;
  about_media_id?: number | null;
  ministries_media_id?: number | null;
  contact_media_id?: number | null;
  social_facebook_url?: string | null;
  social_instagram_url?: string | null;
  social_youtube_url?: string | null;
  social_tiktok_url?: string | null;
};

export async function fetchSiteContent() {
  return apiFetch("/site-content");
}

export async function updateSiteContent(payload: Partial<SiteContent>, token: string) {
  return apiFetch("/site-content", {
    method: "PUT",
    body: JSON.stringify(payload),
    token
  });
}

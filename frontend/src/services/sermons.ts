import { apiFetch } from "@/services/api";

export type Sermon = {
  id: number;
  title: string;
  speaker: string;
  sermon_date: string;
  scripture: string;
  description?: string;
  video_url?: string;
  audio_url?: string;
  thumbnail_media_id?: number | null;
};

export async function fetchSermons() {
  return apiFetch("/sermons?offset=0&limit=20");
}

export async function fetchSermon(id: string | number) {
  return apiFetch(`/sermons/${id}`);
}

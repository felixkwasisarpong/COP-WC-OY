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

export async function createSermon(payload: Partial<Sermon>, token: string) {
  return apiFetch("/sermons", {
    method: "POST",
    body: JSON.stringify(payload),
    token
  });
}

export async function updateSermon(id: number, payload: Partial<Sermon>, token: string) {
  return apiFetch(`/sermons/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
    token
  });
}

export async function deleteSermon(id: number, token: string) {
  return apiFetch(`/sermons/${id}`, {
    method: "DELETE",
    token
  });
}

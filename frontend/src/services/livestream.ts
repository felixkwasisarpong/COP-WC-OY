import { apiFetch } from "@/services/api";

export type Livestream = {
  id: number;
  embed_url: string;
  is_live: boolean;
  schedule_text?: string | null;
  cover_image_id?: number | null;
};

export async function fetchLivestream() {
  return apiFetch("/livestream");
}

export async function updateLivestream(payload: Partial<Livestream>, token: string) {
  return apiFetch("/livestream", {
    method: "PUT",
    body: JSON.stringify(payload),
    token
  });
}

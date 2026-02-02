import { apiFetch } from "@/services/api";

export type Event = {
  id: number;
  title: string;
  description?: string;
  location: string;
  start_time: string;
  end_time?: string;
  cover_image_id?: number | null;
};

export async function fetchEvents() {
  return apiFetch("/events?offset=0&limit=20");
}

export async function fetchEvent(id: string | number) {
  return apiFetch(`/events/${id}`);
}

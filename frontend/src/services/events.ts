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

export async function createEvent(payload: Partial<Event>, token: string) {
  return apiFetch("/events", {
    method: "POST",
    body: JSON.stringify(payload),
    token
  });
}

export async function updateEvent(id: number, payload: Partial<Event>, token: string) {
  return apiFetch(`/events/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
    token
  });
}

export async function deleteEvent(id: number, token: string) {
  return apiFetch(`/events/${id}`, {
    method: "DELETE",
    token
  });
}

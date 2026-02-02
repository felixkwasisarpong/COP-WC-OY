import { apiFetch } from "@/services/api";

export type Announcement = {
  id: number;
  title: string;
  body: string;
  start_date?: string | null;
  end_date?: string | null;
  is_active: boolean;
};

export async function fetchAnnouncements() {
  return apiFetch("/announcements?offset=0&limit=20&active_only=false");
}

export async function createAnnouncement(payload: Partial<Announcement>, token: string) {
  return apiFetch("/announcements", {
    method: "POST",
    body: JSON.stringify(payload),
    token
  });
}

export async function updateAnnouncement(id: number, payload: Partial<Announcement>, token: string) {
  return apiFetch(`/announcements/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
    token
  });
}

export async function deleteAnnouncement(id: number, token: string) {
  return apiFetch(`/announcements/${id}`, {
    method: "DELETE",
    token
  });
}

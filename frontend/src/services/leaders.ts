import { apiFetch } from "@/services/api";

export type Leader = {
  id: number;
  name: string;
  role: string;
  focus?: string | null;
  bio?: string | null;
  photo_media_id?: number | null;
  is_active: boolean;
  sort_order: number;
};

export async function fetchLeaders(token?: string | null) {
  return apiFetch("/leaders?offset=0&limit=50", { token });
}

export async function fetchLeader(id: string | number, token?: string | null) {
  return apiFetch(`/leaders/${id}`, { token });
}

export async function createLeader(payload: Partial<Leader>, token: string) {
  return apiFetch("/leaders", {
    method: "POST",
    body: JSON.stringify(payload),
    token
  });
}

export async function updateLeader(id: number, payload: Partial<Leader>, token: string) {
  return apiFetch(`/leaders/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
    token
  });
}

export async function deleteLeader(id: number, token: string) {
  return apiFetch(`/leaders/${id}`, {
    method: "DELETE",
    token
  });
}

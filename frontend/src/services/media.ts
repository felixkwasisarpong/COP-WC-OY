import { apiFetch, apiUpload } from "@/services/api";

export type MediaAsset = {
  id: number;
  title: string;
  description?: string;
  filename: string;
  content_type: string;
  size_bytes: number;
  storage_key: string;
  is_public: boolean;
  downloads_enabled: boolean;
};

export async function fetchMedia(token?: string | null) {
  return apiFetch("/media?offset=0&limit=30", { token });
}

export function mediaViewUrl(id: number) {
  const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
  return `${base}/media/${id}/view`;
}

export async function uploadMedia(form: FormData, token: string) {
  return apiUpload("/media/upload", form, token);
}

export async function updateMedia(id: number, payload: Partial<MediaAsset>, token: string) {
  return apiFetch(`/media/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
    token
  });
}

export async function downloadMedia(id: number, token: string) {
  const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
  const response = await fetch(`${base}/media/${id}/download`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Download failed");
  }
  return response.blob();
}

export async function deleteMedia(id: number, token: string) {
  return apiFetch(`/media/${id}`, {
    method: "DELETE",
    token
  });
}

export async function deleteAllMedia(token: string) {
  return apiFetch("/media", {
    method: "DELETE",
    token
  });
}

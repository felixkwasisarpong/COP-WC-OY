import { apiFetch } from "@/services/api";

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

export async function fetchMedia() {
  return apiFetch("/media?offset=0&limit=30");
}

export function mediaViewUrl(id: number) {
  const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
  return `${base}/media/${id}/view`;
}

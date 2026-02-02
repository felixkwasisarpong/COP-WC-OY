const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

type ApiOptions = RequestInit & { token?: string | null };

export async function apiFetch(path: string, options: ApiOptions = {}) {
  const headers = new Headers(options.headers || {});
  headers.set("Content-Type", "application/json");
  if (options.token) {
    headers.set("Authorization", `Bearer ${options.token}`);
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Request failed");
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export async function apiUpload(path: string, body: FormData, token?: string | null) {
  const headers = new Headers();
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers,
    body
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Upload failed");
  }

  return response.json();
}

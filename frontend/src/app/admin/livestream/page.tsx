"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AdminShell } from "@/components/admin-shell";
import { fetchLivestream, updateLivestream } from "@/services/livestream";
import { fetchMedia } from "@/services/media";
import { useAuth } from "@/hooks/use-auth";

export default function AdminLivestreamPage() {
  const queryClient = useQueryClient();
  const { token } = useAuth();
  const { data, isLoading } = useQuery({ queryKey: ["livestream-admin"], queryFn: fetchLivestream });
  const { data: mediaData } = useQuery({
    queryKey: ["admin-media-options"],
    queryFn: () => fetchMedia(token)
  });
  const [form, setForm] = useState({
    embed_url: "",
    is_live: false,
    schedule_text: "",
    cover_image_id: ""
  });

  const updateMutation = useMutation({
    mutationFn: () =>
      updateLivestream(
        {
          embed_url: form.embed_url,
          is_live: form.is_live,
          schedule_text: form.schedule_text || null,
          cover_image_id: form.cover_image_id ? Number(form.cover_image_id) : null
        },
        token || ""
      ),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["livestream-admin"] })
  });

  const mediaOptions = mediaData?.items || [];

  const hydrateFromApi = () => {
    if (!data) return;
    setForm({
      embed_url: data.embed_url || "",
      is_live: data.is_live,
      schedule_text: data.schedule_text || "",
      cover_image_id: data.cover_image_id ? String(data.cover_image_id) : ""
    });
  };

  return (
    <AdminShell title="Manage livestream" subtitle="Update embed links, live status, and schedules.">
      <div className="rounded-[2rem] bg-white/90 p-6 shadow-soft-md space-y-4">
        <h3 className="font-display text-xl text-ink">Livestream settings</h3>
        {isLoading ? (
          <p className="text-sm text-slate-600">Loading livestream settings...</p>
        ) : (
          <>
            <button
              onClick={hydrateFromApi}
              className="rounded-full border border-ember px-4 py-2 text-xs uppercase tracking-[0.3em] text-ember"
            >
              Load current settings
            </button>
            <div className="grid gap-4 md:grid-cols-2">
              <input
                className="rounded-2xl border border-wheat px-4 py-3 md:col-span-2"
                placeholder="YouTube/Vimeo embed URL"
                value={form.embed_url}
                onChange={(event) => setForm({ ...form, embed_url: event.target.value })}
              />
              <input
                className="rounded-2xl border border-wheat px-4 py-3"
                placeholder="Schedule text"
                value={form.schedule_text}
                onChange={(event) => setForm({ ...form, schedule_text: event.target.value })}
              />
              <select
                className="rounded-2xl border border-wheat px-4 py-3"
                value={form.cover_image_id}
                onChange={(event) => setForm({ ...form, cover_image_id: event.target.value })}
              >
                <option value="">Cover image (optional)</option>
                {mediaOptions.map((media: any) => (
                  <option key={media.id} value={media.id}>
                    {media.title}
                  </option>
                ))}
              </select>
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={form.is_live}
                  onChange={(event) => setForm({ ...form, is_live: event.target.checked })}
                />
                Live now
              </label>
            </div>
            <button
              onClick={() => updateMutation.mutate()}
              className="rounded-full bg-ember px-6 py-3 text-xs uppercase tracking-[0.3em] text-white"
            >
              {updateMutation.isPending ? "Saving..." : "Save changes"}
            </button>
          </>
        )}
      </div>
    </AdminShell>
  );
}

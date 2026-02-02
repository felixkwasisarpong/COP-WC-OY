"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AdminShell } from "@/components/admin-shell";
import { createSermon, deleteSermon, fetchSermons, updateSermon } from "@/services/sermons";
import { fetchMedia } from "@/services/media";
import { useAuth } from "@/hooks/use-auth";

export default function AdminSermonsPage() {
  const queryClient = useQueryClient();
  const { token } = useAuth();
  const { data, isLoading } = useQuery({ queryKey: ["admin-sermons"], queryFn: fetchSermons });
  const { data: mediaData } = useQuery({
    queryKey: ["admin-media-options"],
    queryFn: () => fetchMedia(token)
  });

  const [form, setForm] = useState({
    title: "",
    speaker: "",
    sermon_date: "",
    scripture: "",
    description: "",
    video_url: "",
    audio_url: "",
    thumbnail_media_id: ""
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState(form);

  const createMutation = useMutation({
    mutationFn: () =>
      createSermon(
        {
          ...form,
          description: form.description || null,
          video_url: form.video_url || null,
          audio_url: form.audio_url || null,
          thumbnail_media_id: form.thumbnail_media_id ? Number(form.thumbnail_media_id) : null
        },
        token || ""
      ),
    onSuccess: () => {
      setForm({
        title: "",
        speaker: "",
        sermon_date: "",
        scripture: "",
        description: "",
        video_url: "",
        audio_url: "",
        thumbnail_media_id: ""
      });
      queryClient.invalidateQueries({ queryKey: ["admin-sermons"] });
    }
  });

  const updateMutation = useMutation({
    mutationFn: () =>
      updateSermon(
        editingId as number,
        {
          ...editForm,
          description: editForm.description || null,
          video_url: editForm.video_url || null,
          audio_url: editForm.audio_url || null,
          thumbnail_media_id: editForm.thumbnail_media_id ? Number(editForm.thumbnail_media_id) : null
        },
        token || ""
      ),
    onSuccess: () => {
      setEditingId(null);
      queryClient.invalidateQueries({ queryKey: ["admin-sermons"] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteSermon(id, token || ""),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-sermons"] })
  });

  const mediaOptions = mediaData?.items || [];

  return (
    <AdminShell title="Manage sermons" subtitle="Create, update, and publish sermon content.">
      <div className="rounded-[2rem] bg-white/90 p-6 shadow-soft-md space-y-4">
        <h3 className="font-display text-xl text-ink">New sermon</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <input
            className="rounded-2xl border border-wheat px-4 py-3"
            placeholder="Title"
            value={form.title}
            onChange={(event) => setForm({ ...form, title: event.target.value })}
          />
          <input
            className="rounded-2xl border border-wheat px-4 py-3"
            placeholder="Speaker"
            value={form.speaker}
            onChange={(event) => setForm({ ...form, speaker: event.target.value })}
          />
          <input
            className="rounded-2xl border border-wheat px-4 py-3"
            type="date"
            value={form.sermon_date}
            onChange={(event) => setForm({ ...form, sermon_date: event.target.value })}
          />
          <input
            className="rounded-2xl border border-wheat px-4 py-3"
            placeholder="Scripture"
            value={form.scripture}
            onChange={(event) => setForm({ ...form, scripture: event.target.value })}
          />
          <input
            className="rounded-2xl border border-wheat px-4 py-3"
            placeholder="Video embed URL"
            value={form.video_url}
            onChange={(event) => setForm({ ...form, video_url: event.target.value })}
          />
          <input
            className="rounded-2xl border border-wheat px-4 py-3"
            placeholder="Audio URL"
            value={form.audio_url}
            onChange={(event) => setForm({ ...form, audio_url: event.target.value })}
          />
          <select
            className="rounded-2xl border border-wheat px-4 py-3"
            value={form.thumbnail_media_id}
            onChange={(event) => setForm({ ...form, thumbnail_media_id: event.target.value })}
          >
            <option value="">Thumbnail (optional)</option>
            {mediaOptions.map((media: any) => (
              <option key={media.id} value={media.id}>
                {media.title}
              </option>
            ))}
          </select>
          <textarea
            className="rounded-2xl border border-wheat px-4 py-3 md:col-span-2"
            placeholder="Description"
            value={form.description}
            onChange={(event) => setForm({ ...form, description: event.target.value })}
          />
        </div>
        <button
          onClick={() => createMutation.mutate()}
          className="rounded-full bg-ember px-6 py-3 text-xs uppercase tracking-[0.3em] text-white"
        >
          {createMutation.isPending ? "Saving..." : "Publish sermon"}
        </button>
        {createMutation.error && (
          <p className="text-sm text-ember">Unable to create sermon.</p>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="font-display text-xl text-ink">Existing sermons</h3>
        {isLoading ? (
          <p className="text-sm text-slate-600">Loading sermons...</p>
        ) : (
          <div className="space-y-4">
            {(data?.items || []).map((sermon: any) => (
              <div key={sermon.id} className="rounded-[2rem] bg-white/90 p-6 shadow-soft-md space-y-3">
                {editingId === sermon.id ? (
                  <>
                    <div className="grid gap-4 md:grid-cols-2">
                      <input
                        className="rounded-2xl border border-wheat px-4 py-3"
                        value={editForm.title}
                        onChange={(event) => setEditForm({ ...editForm, title: event.target.value })}
                      />
                      <input
                        className="rounded-2xl border border-wheat px-4 py-3"
                        value={editForm.speaker}
                        onChange={(event) => setEditForm({ ...editForm, speaker: event.target.value })}
                      />
                      <input
                        className="rounded-2xl border border-wheat px-4 py-3"
                        type="date"
                        value={editForm.sermon_date}
                        onChange={(event) => setEditForm({ ...editForm, sermon_date: event.target.value })}
                      />
                      <input
                        className="rounded-2xl border border-wheat px-4 py-3"
                        value={editForm.scripture}
                        onChange={(event) => setEditForm({ ...editForm, scripture: event.target.value })}
                      />
                      <input
                        className="rounded-2xl border border-wheat px-4 py-3"
                        value={editForm.video_url}
                        onChange={(event) => setEditForm({ ...editForm, video_url: event.target.value })}
                      />
                      <input
                        className="rounded-2xl border border-wheat px-4 py-3"
                        value={editForm.audio_url}
                        onChange={(event) => setEditForm({ ...editForm, audio_url: event.target.value })}
                      />
                      <select
                        className="rounded-2xl border border-wheat px-4 py-3"
                        value={editForm.thumbnail_media_id}
                        onChange={(event) => setEditForm({ ...editForm, thumbnail_media_id: event.target.value })}
                      >
                        <option value="">Thumbnail (optional)</option>
                        {mediaOptions.map((media: any) => (
                          <option key={media.id} value={media.id}>
                            {media.title}
                          </option>
                        ))}
                      </select>
                      <textarea
                        className="rounded-2xl border border-wheat px-4 py-3 md:col-span-2"
                        value={editForm.description}
                        onChange={(event) => setEditForm({ ...editForm, description: event.target.value })}
                      />
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => updateMutation.mutate()}
                        className="rounded-full bg-ember px-5 py-2 text-xs uppercase tracking-[0.3em] text-white"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="rounded-full border border-ember px-5 py-2 text-xs uppercase tracking-[0.3em] text-ember"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <h4 className="font-display text-2xl text-ink">{sermon.title}</h4>
                      <p className="text-sm text-slate-600">
                        {sermon.speaker} • {sermon.sermon_date} • {sermon.scripture}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => {
                          setEditingId(sermon.id);
                          setEditForm({
                            title: sermon.title,
                            speaker: sermon.speaker,
                            sermon_date: sermon.sermon_date,
                            scripture: sermon.scripture,
                            description: sermon.description || "",
                            video_url: sermon.video_url || "",
                            audio_url: sermon.audio_url || "",
                            thumbnail_media_id: sermon.thumbnail_media_id ? String(sermon.thumbnail_media_id) : ""
                          });
                        }}
                        className="rounded-full border border-ember px-5 py-2 text-xs uppercase tracking-[0.3em] text-ember"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteMutation.mutate(sermon.id)}
                        className="rounded-full border border-red-300 px-5 py-2 text-xs uppercase tracking-[0.3em] text-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  );
}

"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AdminShell } from "@/components/admin-shell";
import { createEvent, deleteEvent, fetchEvents, updateEvent } from "@/services/events";
import { fetchMedia } from "@/services/media";
import { useAuth } from "@/hooks/use-auth";
import { fromDateTimeLocal, toDateTimeLocal } from "@/utils/datetime";

export default function AdminEventsPage() {
  const queryClient = useQueryClient();
  const { token } = useAuth();
  const { data, isLoading } = useQuery({ queryKey: ["admin-events"], queryFn: fetchEvents });
  const { data: mediaData } = useQuery({
    queryKey: ["admin-media-options"],
    queryFn: () => fetchMedia(token)
  });

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    start_time: "",
    end_time: "",
    cover_image_id: "",
    is_public: true
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState(form);

  const createMutation = useMutation({
    mutationFn: () =>
      createEvent(
        {
          ...form,
          description: form.description || undefined,
          start_time: fromDateTimeLocal(form.start_time) || undefined,
          end_time: form.end_time ? fromDateTimeLocal(form.end_time) || undefined : undefined,
          cover_image_id: form.cover_image_id ? Number(form.cover_image_id) : undefined
        },
        token || ""
      ),
    onSuccess: () => {
      setForm({
        title: "",
        description: "",
        location: "",
        start_time: "",
        end_time: "",
        cover_image_id: "",
        is_public: true
      });
      queryClient.invalidateQueries({ queryKey: ["admin-events"] });
    }
  });

  const updateMutation = useMutation({
    mutationFn: () =>
      updateEvent(
        editingId as number,
        {
          ...editForm,
          description: editForm.description || undefined,
          start_time: fromDateTimeLocal(editForm.start_time) || undefined,
          end_time: editForm.end_time ? fromDateTimeLocal(editForm.end_time) || undefined : undefined,
          cover_image_id: editForm.cover_image_id ? Number(editForm.cover_image_id) : undefined
        },
        token || ""
      ),
    onSuccess: () => {
      setEditingId(null);
      queryClient.invalidateQueries({ queryKey: ["admin-events"] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteEvent(id, token || ""),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-events"] })
  });

  const mediaOptions = mediaData?.items || [];

  return (
    <AdminShell title="Manage events" subtitle="Update event schedules, locations, and visibility.">
      <div className="rounded-[2rem] bg-white/90 p-6 shadow-soft-md space-y-4">
        <h3 className="font-display text-xl text-ink">New event</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <input
            className="rounded-2xl border border-wheat px-4 py-3"
            placeholder="Title"
            value={form.title}
            onChange={(event) => setForm({ ...form, title: event.target.value })}
          />
          <input
            className="rounded-2xl border border-wheat px-4 py-3"
            placeholder="Location"
            value={form.location}
            onChange={(event) => setForm({ ...form, location: event.target.value })}
          />
          <input
            className="rounded-2xl border border-wheat px-4 py-3"
            type="datetime-local"
            value={form.start_time}
            onChange={(event) => setForm({ ...form, start_time: event.target.value })}
          />
          <input
            className="rounded-2xl border border-wheat px-4 py-3"
            type="datetime-local"
            value={form.end_time}
            onChange={(event) => setForm({ ...form, end_time: event.target.value })}
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
              checked={form.is_public}
              onChange={(event) => setForm({ ...form, is_public: event.target.checked })}
            />
            Publicly visible
          </label>
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
          {createMutation.isPending ? "Saving..." : "Publish event"}
        </button>
      </div>

      <div className="space-y-4">
        <h3 className="font-display text-xl text-ink">Existing events</h3>
        {isLoading ? (
          <p className="text-sm text-slate-600">Loading events...</p>
        ) : (
          <div className="space-y-4">
            {(data?.items || []).map((event: any) => (
              <div key={event.id} className="rounded-[2rem] bg-white/90 p-6 shadow-soft-md space-y-3">
                {editingId === event.id ? (
                  <>
                    <div className="grid gap-4 md:grid-cols-2">
                      <input
                        className="rounded-2xl border border-wheat px-4 py-3"
                        value={editForm.title}
                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      />
                      <input
                        className="rounded-2xl border border-wheat px-4 py-3"
                        value={editForm.location}
                        onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                      />
                      <input
                        className="rounded-2xl border border-wheat px-4 py-3"
                        type="datetime-local"
                        value={editForm.start_time}
                        onChange={(e) => setEditForm({ ...editForm, start_time: e.target.value })}
                      />
                      <input
                        className="rounded-2xl border border-wheat px-4 py-3"
                        type="datetime-local"
                        value={editForm.end_time}
                        onChange={(e) => setEditForm({ ...editForm, end_time: e.target.value })}
                      />
                      <select
                        className="rounded-2xl border border-wheat px-4 py-3"
                        value={editForm.cover_image_id}
                        onChange={(e) => setEditForm({ ...editForm, cover_image_id: e.target.value })}
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
                          checked={editForm.is_public}
                          onChange={(e) => setEditForm({ ...editForm, is_public: e.target.checked })}
                        />
                        Publicly visible
                      </label>
                      <textarea
                        className="rounded-2xl border border-wheat px-4 py-3 md:col-span-2"
                        value={editForm.description}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
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
                      <h4 className="font-display text-2xl text-ink">{event.title}</h4>
                      <p className="text-sm text-slate-600">
                        {event.location} • {event.start_time}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => {
                          setEditingId(event.id);
                          setEditForm({
                            title: event.title,
                            description: event.description || "",
                            location: event.location,
                            start_time: toDateTimeLocal(event.start_time),
                            end_time: toDateTimeLocal(event.end_time),
                            cover_image_id: event.cover_image_id ? String(event.cover_image_id) : "",
                            is_public: event.is_public
                          });
                        }}
                        className="rounded-full border border-ember px-5 py-2 text-xs uppercase tracking-[0.3em] text-ember"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteMutation.mutate(event.id)}
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

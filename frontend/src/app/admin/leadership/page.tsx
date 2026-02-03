"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AdminShell } from "@/components/admin-shell";
import { createLeader, deleteLeader, fetchLeaders, updateLeader } from "@/services/leaders";
import { fetchMedia, mediaViewUrl } from "@/services/media";
import { useAuth } from "@/hooks/use-auth";

export default function AdminLeadershipPage() {
  const queryClient = useQueryClient();
  const { token } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["admin-leaders"],
    queryFn: () => fetchLeaders(token)
  });
  const { data: mediaData } = useQuery({
    queryKey: ["admin-media-options"],
    queryFn: () => fetchMedia(token)
  });

  const [form, setForm] = useState({
    name: "",
    role: "",
    focus: "",
    bio: "",
    photo_media_id: "",
    sort_order: "0",
    is_active: true
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState(form);

  const createMutation = useMutation({
    mutationFn: () =>
      createLeader(
        {
          name: form.name,
          role: form.role,
          focus: form.focus || undefined,
          bio: form.bio || undefined,
          photo_media_id: form.photo_media_id ? Number(form.photo_media_id) : undefined,
          sort_order: Number(form.sort_order || 0),
          is_active: form.is_active
        },
        token || ""
      ),
    onSuccess: () => {
      setForm({
        name: "",
        role: "",
        focus: "",
        bio: "",
        photo_media_id: "",
        sort_order: "0",
        is_active: true
      });
      queryClient.invalidateQueries({ queryKey: ["admin-leaders"] });
    }
  });

  const updateMutation = useMutation({
    mutationFn: () =>
      updateLeader(
        editingId as number,
        {
          name: editForm.name,
          role: editForm.role,
          focus: editForm.focus || undefined,
          bio: editForm.bio || undefined,
          photo_media_id: editForm.photo_media_id ? Number(editForm.photo_media_id) : undefined,
          sort_order: Number(editForm.sort_order || 0),
          is_active: editForm.is_active
        },
        token || ""
      ),
    onSuccess: () => {
      setEditingId(null);
      queryClient.invalidateQueries({ queryKey: ["admin-leaders"] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteLeader(id, token || ""),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-leaders"] })
  });

  const mediaOptions = mediaData?.items || [];

  return (
    <AdminShell title="Manage leadership" subtitle="Add leaders and highlight ministry roles.">
      <div className="rounded-[2rem] bg-white/90 p-6 shadow-soft-md space-y-4">
        <h3 className="font-display text-xl text-ink">New leader</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <input
            className="rounded-2xl border border-wheat px-4 py-3"
            placeholder="Full name"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
          />
          <input
            className="rounded-2xl border border-wheat px-4 py-3"
            placeholder="Role or title"
            value={form.role}
            onChange={(event) => setForm({ ...form, role: event.target.value })}
          />
          <input
            className="rounded-2xl border border-wheat px-4 py-3"
            placeholder="Focus area (optional)"
            value={form.focus}
            onChange={(event) => setForm({ ...form, focus: event.target.value })}
          />
          <input
            className="rounded-2xl border border-wheat px-4 py-3"
            type="number"
            min="0"
            placeholder="Sort order"
            value={form.sort_order}
            onChange={(event) => setForm({ ...form, sort_order: event.target.value })}
          />
          <select
            className="rounded-2xl border border-wheat px-4 py-3 md:col-span-2"
            value={form.photo_media_id}
            onChange={(event) => setForm({ ...form, photo_media_id: event.target.value })}
          >
            <option value="">Portrait photo (optional)</option>
            {mediaOptions.map((media: any) => (
              <option key={media.id} value={media.id}>
                {media.title}
              </option>
            ))}
          </select>
          <textarea
            className="rounded-2xl border border-wheat px-4 py-3 md:col-span-2"
            placeholder="Short bio (optional)"
            value={form.bio}
            onChange={(event) => setForm({ ...form, bio: event.target.value })}
          />
          <label className="flex items-center gap-3 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(event) => setForm({ ...form, is_active: event.target.checked })}
            />
            Visible on public site
          </label>
        </div>
        <button
          onClick={() => createMutation.mutate()}
          className="rounded-full bg-ember px-6 py-3 text-xs uppercase tracking-[0.3em] text-white"
        >
          {createMutation.isPending ? "Saving..." : "Add leader"}
        </button>
        {createMutation.error && (
          <p className="text-sm text-ember">Unable to create leader.</p>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="font-display text-xl text-ink">Existing leaders</h3>
        {isLoading ? (
          <p className="text-sm text-slate-600">Loading leaders...</p>
        ) : (
          <div className="space-y-4">
            {(data?.items || []).map((leader: any) => (
              <div key={leader.id} className="rounded-[2rem] bg-white/90 p-6 shadow-soft-md space-y-3">
                {editingId === leader.id ? (
                  <>
                    <div className="grid gap-4 md:grid-cols-2">
                      <input
                        className="rounded-2xl border border-wheat px-4 py-3"
                        value={editForm.name}
                        onChange={(event) => setEditForm({ ...editForm, name: event.target.value })}
                      />
                      <input
                        className="rounded-2xl border border-wheat px-4 py-3"
                        value={editForm.role}
                        onChange={(event) => setEditForm({ ...editForm, role: event.target.value })}
                      />
                      <input
                        className="rounded-2xl border border-wheat px-4 py-3"
                        value={editForm.focus}
                        onChange={(event) => setEditForm({ ...editForm, focus: event.target.value })}
                        placeholder="Focus area"
                      />
                      <input
                        className="rounded-2xl border border-wheat px-4 py-3"
                        type="number"
                        min="0"
                        value={editForm.sort_order}
                        onChange={(event) => setEditForm({ ...editForm, sort_order: event.target.value })}
                      />
                      <select
                        className="rounded-2xl border border-wheat px-4 py-3 md:col-span-2"
                        value={editForm.photo_media_id}
                        onChange={(event) => setEditForm({ ...editForm, photo_media_id: event.target.value })}
                      >
                        <option value="">Portrait photo (optional)</option>
                        {mediaOptions.map((media: any) => (
                          <option key={media.id} value={media.id}>
                            {media.title}
                          </option>
                        ))}
                      </select>
                      <textarea
                        className="rounded-2xl border border-wheat px-4 py-3 md:col-span-2"
                        value={editForm.bio}
                        onChange={(event) => setEditForm({ ...editForm, bio: event.target.value })}
                        placeholder="Short bio"
                      />
                      <label className="flex items-center gap-3 text-sm text-slate-600">
                        <input
                          type="checkbox"
                          checked={editForm.is_active}
                          onChange={(event) => setEditForm({ ...editForm, is_active: event.target.checked })}
                        />
                        Visible on public site
                      </label>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => updateMutation.mutate()}
                        className="rounded-full bg-ember px-5 py-2 text-xs uppercase tracking-[0.3em] text-white"
                      >
                        {updateMutation.isPending ? "Saving..." : "Save"}
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
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h4 className="font-display text-xl text-ink">{leader.name}</h4>
                        <p className="text-sm text-slate-600">{leader.role}</p>
                        {leader.focus && (
                          <p className="text-xs uppercase tracking-[0.3em] text-slate-500 mt-2">
                            {leader.focus}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        {leader.photo_media_id ? (
                          <img
                            src={mediaViewUrl(leader.photo_media_id)}
                            alt={leader.name}
                            className="h-16 w-16 rounded-2xl object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="h-16 w-16 rounded-2xl bg-hero-glow flex items-center justify-center text-ember font-display text-xl">
                            {leader.name.charAt(0)}
                          </div>
                        )}
                      </div>
                    </div>
                    {leader.bio && <p className="text-sm text-slate-600">{leader.bio}</p>}
                    <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-slate-500">
                      <span>Sort {leader.sort_order}</span>
                      <span>{leader.is_active ? "Visible" : "Hidden"}</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => {
                          setEditingId(leader.id);
                          setEditForm({
                            name: leader.name,
                            role: leader.role,
                            focus: leader.focus || "",
                            bio: leader.bio || "",
                            photo_media_id: leader.photo_media_id ? String(leader.photo_media_id) : "",
                            sort_order: String(leader.sort_order ?? 0),
                            is_active: Boolean(leader.is_active)
                          });
                        }}
                        className="rounded-full border border-ember px-5 py-2 text-xs uppercase tracking-[0.3em] text-ember"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteMutation.mutate(leader.id)}
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

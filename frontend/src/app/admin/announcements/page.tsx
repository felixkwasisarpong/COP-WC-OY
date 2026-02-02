"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AdminShell } from "@/components/admin-shell";
import {
  createAnnouncement,
  deleteAnnouncement,
  fetchAnnouncements,
  updateAnnouncement
} from "@/services/announcements";
import { useAuth } from "@/hooks/use-auth";

export default function AdminAnnouncementsPage() {
  const queryClient = useQueryClient();
  const { token } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["admin-announcements"],
    queryFn: fetchAnnouncements
  });

  const [form, setForm] = useState({
    title: "",
    body: "",
    start_date: "",
    end_date: "",
    is_active: true
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState(form);

  const createMutation = useMutation({
    mutationFn: () =>
      createAnnouncement(
        {
          ...form,
          start_date: form.start_date || null,
          end_date: form.end_date || null
        },
        token || ""
      ),
    onSuccess: () => {
      setForm({ title: "", body: "", start_date: "", end_date: "", is_active: true });
      queryClient.invalidateQueries({ queryKey: ["admin-announcements"] });
    }
  });

  const updateMutation = useMutation({
    mutationFn: () =>
      updateAnnouncement(
        editingId as number,
        {
          ...editForm,
          start_date: editForm.start_date || null,
          end_date: editForm.end_date || null
        },
        token || ""
      ),
    onSuccess: () => {
      setEditingId(null);
      queryClient.invalidateQueries({ queryKey: ["admin-announcements"] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteAnnouncement(id, token || ""),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-announcements"] })
  });

  return (
    <AdminShell title="Manage announcements" subtitle="Highlight key updates for the church family.">
      <div className="rounded-[2rem] bg-white/90 p-6 shadow-soft-md space-y-4">
        <h3 className="font-display text-xl text-ink">New announcement</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <input
            className="rounded-2xl border border-wheat px-4 py-3"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
            />
            Active
          </label>
          <input
            className="rounded-2xl border border-wheat px-4 py-3"
            type="date"
            value={form.start_date}
            onChange={(e) => setForm({ ...form, start_date: e.target.value })}
          />
          <input
            className="rounded-2xl border border-wheat px-4 py-3"
            type="date"
            value={form.end_date}
            onChange={(e) => setForm({ ...form, end_date: e.target.value })}
          />
          <textarea
            className="rounded-2xl border border-wheat px-4 py-3 md:col-span-2"
            placeholder="Message"
            value={form.body}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
          />
        </div>
        <button
          onClick={() => createMutation.mutate()}
          className="rounded-full bg-ember px-6 py-3 text-xs uppercase tracking-[0.3em] text-white"
        >
          {createMutation.isPending ? "Saving..." : "Publish announcement"}
        </button>
      </div>

      <div className="space-y-4">
        <h3 className="font-display text-xl text-ink">Existing announcements</h3>
        {isLoading ? (
          <p className="text-sm text-slate-600">Loading announcements...</p>
        ) : (
          <div className="space-y-4">
            {(data?.items || []).map((item: any) => (
              <div key={item.id} className="rounded-[2rem] bg-white/90 p-6 shadow-soft-md space-y-3">
                {editingId === item.id ? (
                  <>
                    <div className="grid gap-4 md:grid-cols-2">
                      <input
                        className="rounded-2xl border border-wheat px-4 py-3"
                        value={editForm.title}
                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      />
                      <label className="flex items-center gap-2 text-sm text-slate-600">
                        <input
                          type="checkbox"
                          checked={editForm.is_active}
                          onChange={(e) => setEditForm({ ...editForm, is_active: e.target.checked })}
                        />
                        Active
                      </label>
                      <input
                        className="rounded-2xl border border-wheat px-4 py-3"
                        type="date"
                        value={editForm.start_date}
                        onChange={(e) => setEditForm({ ...editForm, start_date: e.target.value })}
                      />
                      <input
                        className="rounded-2xl border border-wheat px-4 py-3"
                        type="date"
                        value={editForm.end_date}
                        onChange={(e) => setEditForm({ ...editForm, end_date: e.target.value })}
                      />
                      <textarea
                        className="rounded-2xl border border-wheat px-4 py-3 md:col-span-2"
                        value={editForm.body}
                        onChange={(e) => setEditForm({ ...editForm, body: e.target.value })}
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
                      <h4 className="font-display text-2xl text-ink">{item.title}</h4>
                      <p className="text-sm text-slate-600">{item.body}</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => {
                          setEditingId(item.id);
                          setEditForm({
                            title: item.title,
                            body: item.body,
                            start_date: item.start_date || "",
                            end_date: item.end_date || "",
                            is_active: item.is_active
                          });
                        }}
                        className="rounded-full border border-ember px-5 py-2 text-xs uppercase tracking-[0.3em] text-ember"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteMutation.mutate(item.id)}
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

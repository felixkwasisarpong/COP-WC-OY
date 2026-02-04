"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AdminShell } from "@/components/admin-shell";
import {
  deleteAllMedia,
  deleteMedia,
  downloadMedia,
  fetchMedia,
  mediaViewUrl,
  updateMedia,
  uploadMedia
} from "@/services/media";
import { Download, Eye, Trash2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export default function AdminMediaPage() {
  const queryClient = useQueryClient();
  const { token } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["admin-media"],
    queryFn: () => fetchMedia(token)
  });

  const [files, setFiles] = useState<File[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [downloadsEnabled, setDownloadsEnabled] = useState(true);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [bulkLoading, setBulkLoading] = useState(false);
  const [bulkError, setBulkError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deleteAllError, setDeleteAllError] = useState<string | null>(null);

  const uploadMutation = useMutation({
    mutationFn: async () => {
      if (files.length === 0) {
        throw new Error("No file selected");
      }
      if (!title) {
        throw new Error("Title is required");
      }
      for (const file of files) {
        const form = new FormData();
        form.append("file", file);
        form.append("title", title);
        form.append("description", description);
        form.append("is_public", String(isPublic));
        form.append("downloads_enabled", String(downloadsEnabled));
        await uploadMedia(form, token || "");
      }
      return true;
    },
    onSuccess: () => {
      setFiles([]);
      setTitle("");
      setDescription("");
      setIsPublic(true);
      setDownloadsEnabled(false);
      setUploadError(null);
      queryClient.invalidateQueries({ queryKey: ["admin-media"] });
    },
    onError: (error) => setUploadError(error instanceof Error ? error.message : "Upload failed. Please try again.")
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: any }) => updateMedia(id, payload, token || ""),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-media"] })
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteMedia(id, token || ""),
    onSuccess: () => {
      setDeleteError(null);
      queryClient.invalidateQueries({ queryKey: ["admin-media"] });
    },
    onError: (error) =>
      setDeleteError(error instanceof Error ? error.message : "Delete failed. Please try again.")
  });

  const deleteAllMutation = useMutation({
    mutationFn: () => deleteAllMedia(token || ""),
    onSuccess: () => {
      setDeleteAllError(null);
      queryClient.invalidateQueries({ queryKey: ["admin-media"] });
    },
    onError: (error) =>
      setDeleteAllError(error instanceof Error ? error.message : "Delete all failed. Please try again.")
  });

  const applyBulkUpdate = async (payload: Record<string, any>) => {
    if (!data?.items?.length || !token) return;
    setBulkLoading(true);
    setBulkError(null);
    try {
      for (const item of data.items) {
        await updateMedia(item.id, payload, token);
      }
      queryClient.invalidateQueries({ queryKey: ["admin-media"] });
    } catch (error) {
      setBulkError("Bulk update failed. Please try again.");
    } finally {
      setBulkLoading(false);
    }
  };

  const handleDownload = async (id: number, filename: string) => {
    if (!token) return;
    const blob = await downloadMedia(id, token);
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const handleDelete = (id: number, title: string) => {
    if (!token) return;
    const confirmed = window.confirm(`Delete "${title}"? This cannot be undone.`);
    if (!confirmed) return;
    deleteMutation.mutate(id);
  };

  const handleDeleteAll = () => {
    if (!token || !data?.items?.length) return;
    const confirmed = window.confirm("Delete all media? This cannot be undone.");
    if (!confirmed) return;
    deleteAllMutation.mutate();
  };

  return (
    <AdminShell title="Manage media" subtitle="Upload and organize photos, banners, and sermon thumbnails.">
      <div className="rounded-[2rem] bg-white/90 p-6 shadow-soft-md space-y-4">
        <h3 className="font-display text-xl text-ink">Upload media</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="file"
            className="rounded-2xl border border-wheat px-4 py-3"
            multiple
            onChange={(event) => setFiles(Array.from(event.target.files || []))}
          />
          <input
            className="rounded-2xl border border-wheat px-4 py-3"
            placeholder="Title (required)"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <input
            className="rounded-2xl border border-wheat px-4 py-3"
            placeholder="Description (optional)"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input type="checkbox" checked={isPublic} onChange={(event) => setIsPublic(event.target.checked)} />
            Publicly visible
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={downloadsEnabled}
              onChange={(event) => setDownloadsEnabled(event.target.checked)}
            />
            Downloads enabled (members only)
          </label>
        </div>
        <button
          onClick={() => uploadMutation.mutate()}
          className="rounded-full bg-ember px-6 py-3 text-xs uppercase tracking-[0.3em] text-white"
        >
          {uploadMutation.isPending ? "Uploading..." : "Upload"}
        </button>
        {files.length > 0 && (
          <p className="text-xs text-slate-500">{files.length} file(s) selected</p>
        )}
        {uploadError && <p className="text-sm text-ember">{uploadError}</p>}
      </div>

      <div className="space-y-4">
        <h3 className="font-display text-xl text-ink">Library</h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => applyBulkUpdate({ is_public: true })}
            className="rounded-full border border-ember px-4 py-2 text-xs uppercase tracking-[0.3em] text-ember"
          >
            Make all public
          </button>
          <button
            onClick={() => applyBulkUpdate({ downloads_enabled: true })}
            className="rounded-full border border-ember px-4 py-2 text-xs uppercase tracking-[0.3em] text-ember"
          >
            Enable all downloads
          </button>
          <button
            onClick={handleDeleteAll}
            className="rounded-full border border-ember px-4 py-2 text-xs uppercase tracking-[0.3em] text-ember"
            disabled={deleteAllMutation.isPending || !(data?.items || []).length}
          >
            {deleteAllMutation.isPending ? "Deleting..." : "Delete all media"}
          </button>
          {bulkLoading && <span className="text-xs text-slate-500">Updating...</span>}
          {bulkError && <span className="text-xs text-ember">{bulkError}</span>}
          {deleteError && <span className="text-xs text-ember">{deleteError}</span>}
          {deleteAllError && <span className="text-xs text-ember">{deleteAllError}</span>}
        </div>
        {isLoading ? (
          <p className="text-sm text-slate-600">Loading media...</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {(data?.items || []).map((media: any) => (
              <div key={media.id} className="space-y-3">
                <div className="group relative h-44 overflow-hidden bg-mist">
                  {media.content_type?.startsWith("image/") ? (
                    <img
                      src={mediaViewUrl(media.id)}
                      alt={media.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-hero-glow flex items-center justify-center text-ember">
                      {media.filename}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-transparent group-hover:bg-slate-950/35 transition" />
                  <div className="absolute inset-x-3 bottom-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <a
                        href={mediaViewUrl(media.id)}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Preview image"
                        className="text-white transition hover:text-wheat"
                      >
                        <Eye className="h-5 w-5" />
                      </a>
                      <button
                        onClick={() => handleDownload(media.id, media.filename)}
                        aria-label="Download image"
                        disabled={!media.downloads_enabled}
                        className={`transition ${
                          media.downloads_enabled ? "text-white hover:text-wheat" : "text-white/40 cursor-not-allowed"
                        }`}
                      >
                        <Download className="h-5 w-5" />
                      </button>
                    </div>
                    <button
                      onClick={() => handleDelete(media.id, media.title || media.filename)}
                      aria-label="Delete image"
                      className="text-white transition hover:text-ember"
                      disabled={deleteMutation.isPending}
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={media.is_public}
                      onChange={(event) =>
                        updateMutation.mutate({ id: media.id, payload: { is_public: event.target.checked } })
                      }
                    />
                    Public
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={media.downloads_enabled}
                      onChange={(event) =>
                        updateMutation.mutate({
                          id: media.id,
                          payload: { downloads_enabled: event.target.checked }
                        })
                      }
                    />
                    Downloads
                  </label>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  );
}

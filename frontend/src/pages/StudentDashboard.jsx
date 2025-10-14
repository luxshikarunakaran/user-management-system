import React, { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { noteService } from "../services/noteService";

export default function StudentDashboard() {
  const qc = useQueryClient();

  // Fetch notes from API
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notes"],
    queryFn: noteService.list,
  });

  const notes = data?.notes || [];

  // UI state
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [deleteNoteId, setDeleteNoteId] = useState(null);

  // Form states
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [editingNote, setEditingNote] = useState(null);

  // Derived lists
  const filteredNotes = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return notes.filter(
      (n) =>
        n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)
    );
  }, [notes, searchTerm]);

  // Create note mutation
  const createNote = useMutation({
    mutationFn: noteService.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notes"] });
      setNewNote({ title: "", content: "" });
      setIsCreateOpen(false);
    },
    onError: () => {
      alert("Failed to create note. Please try again.");
    },
  });

  // Update note mutation
  const updateNote = useMutation({
    mutationFn: ({ id, data }) => noteService.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notes"] });
      setEditingNote(null);
      setIsEditOpen(false);
    },
    onError: () => {
      alert("Failed to update note. Please try again.");
    },
  });

  // Delete note mutation
  const deleteNote = useMutation({
    mutationFn: noteService.remove,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notes"] });
      setDeleteNoteId(null);
    },
    onError: () => {
      alert("Failed to delete note. Please try again.");
    },
  });

  // Handlers
  const handleCreateNote = () => {
    if (!newNote.title.trim() || !newNote.content.trim()) {
      alert("Please fill in all fields");
      return;
    }
    createNote.mutate({
      title: newNote.title.trim(),
      content: newNote.content.trim(),
    });
  };

  const handleUpdateNote = () => {
    if (!editingNote) return;
    const { title, content } = editingNote;
    if (!title.trim() || !content.trim()) {
      alert("Please fill in all fields");
      return;
    }
    updateNote.mutate({
      id: editingNote._id,
      data: {
        title: title.trim(),
        content: content.trim(),
      },
    });
  };

  const handleDeleteNote = () => {
    if (!deleteNoteId) return;
    deleteNote.mutate(deleteNoteId);
  };

  // Loading and error states
  if (isLoading) {
    return (
      <div className="bg-gray-50">
        <div className="mx-auto max-w-6xl space-y-8 animate-[fadeIn_0.25s_ease-out]">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="h-96 bg-gray-200 rounded-2xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-gray-50">
        <div className="mx-auto max-w-6xl space-y-8 animate-[fadeIn_0.25s_ease-out]">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            Failed to load notes: {error?.message || "Unknown error"}
          </div>
        </div>
      </div>
    );
  }

  // Icons (inline SVGs)
  const IconPlus = (props) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  const IconSearch = (props) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
    </svg>
  );
  const IconEdit = (props) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <path d="M12 20h9" />
      <path
        d="M16.5 3.5a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
  const IconTrash = (props) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" strokeLinecap="round" />
      <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
    </svg>
  );
  const IconBook = (props) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M4 4v15.5A2.5 2.5 0 0 0 6.5 22h13.5V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2z" />
    </svg>
  );

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-6xl space-y-8 animate-[fadeIn_0.25s_ease-out]">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-[slideUp_0.25s_ease-out]">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                My Notes
              </span>
            </h1>
            <p className="text-gray-600 mt-2 text-lg">
              Manage your personal notes and ideas
            </p>
          </div>

          <button
            onClick={() => setIsCreateOpen(true)}
            className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl text-white font-semibold shadow-md bg-gradient-to-r from-indigo-600 to-cyan-500 hover:opacity-90 transition"
          >
            <IconPlus className="h-5 w-5" />
            New Note
          </button>
        </div>

        {/* Notes Card */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-center gap-3 text-2xl font-semibold text-gray-900">
              <span className="h-10 w-10 rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-500 text-white inline-flex items-center justify-center">
                <IconBook className="h-5 w-5" />
              </span>
              All Notes ({filteredNotes.length})
            </div>

            <div className="relative mt-4">
              <IconSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-11 w-full rounded-xl border border-gray-300 bg-white pl-10 pr-3 text-gray-900 outline-none transition focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)]"
              />
            </div>
          </div>

          <div className="p-6">
            {filteredNotes.length === 0 ? (
              <div className="text-center py-12">
                <IconBook className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  No notes found. Create your first note!
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredNotes.map((note, index) => (
                  <div
                    key={note._id}
                    className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition hover:-translate-y-0.5"
                    style={{
                      animation: `fadeIn 0.25s ease-out ${index * 0.04}s both`,
                    }}
                  >
                    <div className="p-5 border-b border-gray-100">
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                        {note.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <span className="inline-block w-2 h-2 rounded-full bg-cyan-500" />
                        {new Date(note.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="p-5">
                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-4">
                        {note.content}
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingNote(note);
                            setIsEditOpen(true);
                          }}
                          className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 hover:bg-indigo-50 hover:border-indigo-300 transition"
                        >
                          <IconEdit className="h-4 w-4" /> Edit
                        </button>
                        <button
                          onClick={() => setDeleteNoteId(note._id)}
                          className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 hover:bg-red-50 hover:border-red-300 transition"
                        >
                          <IconTrash className="h-4 w-4" /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Create Modal */}
        {isCreateOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            role="dialog"
            aria-modal="true"
          >
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setIsCreateOpen(false)}
            />
            <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white shadow-xl border border-gray-200 p-6 animate-[slideUp_0.2s_ease-out]">
              <h2 className="text-xl font-semibold text-gray-900">
                Create New Note
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                Add a new note to your collection
              </p>

              <div className="mt-4 space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Note title"
                    value={newNote.title}
                    onChange={(e) =>
                      setNewNote({ ...newNote, title: e.target.value })
                    }
                    className="w-full h-11 rounded-lg border border-gray-300 px-3 outline-none focus:ring-2 focus:ring-indigo-400 transition"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Note content"
                    rows={6}
                    value={newNote.content}
                    onChange={(e) =>
                      setNewNote({ ...newNote, content: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-indigo-400 transition"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsCreateOpen(false)}
                    className="h-11 flex-1 rounded-lg border border-gray-300 px-4 font-medium text-gray-800 hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateNote}
                    className="h-11 flex-1 rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold shadow-md hover:opacity-90 transition"
                  >
                    Create Note
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {isEditOpen && editingNote && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            role="dialog"
            aria-modal="true"
          >
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setIsEditOpen(false)}
            />
            <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white shadow-xl border border-gray-200 p-6 animate-[slideUp_0.2s_ease-out]">
              <h2 className="text-xl font-semibold text-gray-900">Edit Note</h2>
              <p className="text-gray-600 text-sm mt-1">Update your note</p>

              <div className="mt-4 space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Note title"
                    value={editingNote.title}
                    onChange={(e) =>
                      setEditingNote({ ...editingNote, title: e.target.value })
                    }
                    className="w-full h-11 rounded-lg border border-gray-300 px-3 outline-none focus:ring-2 focus:ring-indigo-400 transition"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Note content"
                    rows={6}
                    value={editingNote.content}
                    onChange={(e) =>
                      setEditingNote({
                        ...editingNote,
                        content: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-indigo-400 transition"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsEditOpen(false)}
                    className="h-11 flex-1 rounded-lg border border-gray-300 px-4 font-medium text-gray-800 hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateNote}
                    className="h-11 flex-1 rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold shadow-md hover:opacity-90 transition"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirm Dialog */}
        {deleteNoteId && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            role="dialog"
            aria-modal="true"
          >
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setDeleteNoteId(null)}
            />
            <div className="relative z-10 w-full max-w-md rounded-2xl bg-white shadow-xl border border-gray-200 p-6 animate-[slideUp_0.2s_ease-out]">
              <h3 className="text-lg font-semibold text-gray-900">
                Delete Note
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                Are you sure you want to delete this note? This action cannot be
                undone.
              </p>

              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => setDeleteNoteId(null)}
                  className="h-11 flex-1 rounded-lg border border-gray-300 px-4 font-medium text-gray-800 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteNote}
                  className="h-11 flex-1 rounded-lg bg-red-600 text-white font-semibold shadow-md hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Small CSS animations */}
      <style>{`
        @keyframes fadeIn { from {opacity:0; transform: translateY(4px);} to {opacity:1; transform: translateY(0);} }
        @keyframes slideUp { from {opacity:0; transform: translateY(10px);} to {opacity:1; transform: translateY(0);} }
      `}</style>
    </div>
  );
}

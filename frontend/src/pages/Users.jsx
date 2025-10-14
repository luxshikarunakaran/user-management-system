import React, { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "../services/userService";

export default function Users() {
  const qc = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users", "list"],
    queryFn: userService.list,
  });

  // Optimistic role change
  const changeRole = useMutation({
    mutationFn: ({ id, role }) => userService.changeRole(id, role),
    onMutate: async ({ id, role }) => {
      await qc.cancelQueries({ queryKey: ["users", "list"] });
      const prev = qc.getQueryData(["users", "list"]);
      qc.setQueryData(["users", "list"], (old) => {
        if (!old?.users) return old;
        return {
          ...old,
          users: old.users.map((u) => (u._id === id ? { ...u, role } : u)),
        };
      });
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(["users", "list"], ctx.prev);
      alert("Failed to change role. Please try again.");
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["users", "list"] });
    },
  });

  // Optimistic delete
  const remove = useMutation({
    mutationFn: (id) => userService.remove(id),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: ["users", "list"] });
      const prev = qc.getQueryData(["users", "list"]);
      qc.setQueryData(["users", "list"], (old) => {
        if (!old?.users) return old;
        return { ...old, users: old.users.filter((u) => u._id !== id) };
      });
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(["users", "list"], ctx.prev);
      alert("Failed to delete user. Please try again.");
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["users", "list"] });
    },
  });

  const [search, setSearch] = useState("");
  const [confirmId, setConfirmId] = useState(null);

  const users = data?.users || [];
  const filtered = useMemo(() => {
    const term = search.toLowerCase().trim();
    if (!term) return users;
    return users.filter(
      (u) =>
        u.name?.toLowerCase().includes(term) ||
        u.email?.toLowerCase().includes(term)
    );
  }, [users, search]);

  // Inline SVGs (no icon library)
  const IconSearch = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <circle cx="11" cy="11" r="8" strokeWidth="2" />
      <path d="M21 21l-4.3-4.3" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
  const IconTrash = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <polyline points="3 6 5 6 21 6" strokeWidth="2" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" strokeWidth="2" />
      <path d="M10 11v6M14 11v6" strokeWidth="2" strokeLinecap="round" />
      <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" strokeWidth="2" />
    </svg>
  );

  if (isLoading) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <Header />
        <div className="mt-4">
          <div className="h-11 w-full rounded-xl bg-gray-100 animate-pulse" />
        </div>
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="grid grid-cols-12 gap-4 p-4 border-b">
              <div className="col-span-3 h-5 bg-gray-100 rounded animate-pulse" />
              <div className="col-span-4 h-5 bg-gray-100 rounded animate-pulse" />
              <div className="col-span-2 h-5 bg-gray-100 rounded animate-pulse" />
              <div className="col-span-3 h-9 bg-gray-100 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <Header />
        <div className="mt-4 text-red-700 bg-red-50 border border-red-200 p-4 rounded-xl">
          Failed to load users:{" "}
          <span className="font-medium">
            {error?.message || "Unknown error"}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Header />

      {/* Search */}
      <div className="mt-4 relative">
        <IconSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
        <input
          className="border border-gray-300 rounded-xl p-3 pl-10 w-full outline-none focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)] transition"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table / Card list */}
      <div className="mt-6 rounded-2xl border border-gray-200 bg-white overflow-hidden">
        {/* Desktop table */}
        <div className="hidden md:block">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50 text-left text-sm text-gray-600">
                <th className="p-3 border-b">Name</th>
                <th className="p-3 border-b">Email</th>
                <th className="p-3 border-b">Role</th>
                <th className="p-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u._id} className="hover:bg-gray-50">
                  <td className="p-3 border-b font-medium text-gray-900">
                    {u.name}
                  </td>
                  <td className="p-3 border-b text-gray-700">{u.email}</td>
                  <td className="p-3 border-b">
                    <span
                      className={
                        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset " +
                        (u.role === "admin"
                          ? "bg-indigo-50 text-indigo-700 ring-indigo-200"
                          : "bg-gray-100 text-gray-800 ring-gray-200")
                      }
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="p-3 border-b">
                    <div className="flex items-center gap-3">
                      <select
                        className="border border-gray-300 rounded-lg p-2 text-sm outline-none focus:border-indigo-500"
                        value={u.role}
                        onChange={(e) =>
                          changeRole.mutate({ id: u._id, role: e.target.value })
                        }
                        disabled={changeRole.isPending}
                      >
                        <option value="student">Student</option>
                        <option value="admin">Admin</option>
                      </select>
                      <button
                        className="inline-flex items-center gap-2 px-3 py-2 text-sm border border-red-300 text-red-700 rounded-lg hover:bg-red-50"
                        onClick={() => setConfirmId(u._id)}
                        disabled={remove.isPending}
                      >
                        <IconTrash className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-gray-500">
                    No users match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden p-4 grid gap-4">
          {filtered.length === 0 ? (
            <div className="text-center text-gray-500">
              No users match your search.
            </div>
          ) : (
            filtered.map((u) => (
              <div
                key={u._id}
                className="rounded-xl border border-gray-200 p-4 shadow-sm"
              >
                <div className="font-semibold text-gray-900">{u.name}</div>
                <div className="text-sm text-gray-700">{u.email}</div>
                <div className="mt-2">
                  <span
                    className={
                      "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset " +
                      (u.role === "admin"
                        ? "bg-indigo-50 text-indigo-700 ring-indigo-200"
                        : "bg-gray-100 text-gray-800 ring-gray-200")
                    }
                  >
                    {u.role}
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <select
                    className="border border-gray-300 rounded-lg p-2 text-sm flex-1 outline-none focus:border-indigo-500"
                    value={u.role}
                    onChange={(e) =>
                      changeRole.mutate({ id: u._id, role: e.target.value })
                    }
                    disabled={changeRole.isPending}
                  >
                    <option value="student">Student</option>
                    <option value="admin">Admin</option>
                  </select>
                  <button
                    className="inline-flex items-center gap-2 px-3 py-2 text-sm border border-red-300 text-red-700 rounded-lg hover:bg-red-50"
                    onClick={() => setConfirmId(u._id)}
                    disabled={remove.isPending}
                  >
                    <IconTrash className="h-4 w-4" />
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Confirm delete dialog (Tailwind only) */}
      {confirmId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setConfirmId(null)}
          />
          <div className="relative z-10 w-full max-w-md rounded-2xl bg-white shadow-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900">Delete user</h3>
            <p className="text-sm text-gray-600 mt-1">
              Are you sure you want to delete this user? This action cannot be
              undone.
            </p>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setConfirmId(null)}
                className="h-11 flex-1 rounded-lg border border-gray-300 px-4 font-medium text-gray-800 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  remove.mutate(confirmId, {
                    onSuccess: () => setConfirmId(null),
                  });
                }}
                className="h-11 flex-1 rounded-lg bg-red-600 text-white font-semibold shadow-md hover:bg-red-700 transition disabled:opacity-60"
                disabled={remove.isPending}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Header() {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
        Users
      </h2>
      <div className="text-sm text-gray-500">
        Manage roles and remove accounts
      </div>
    </div>
  );
}

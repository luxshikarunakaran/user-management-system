import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { userService } from "../services/userService";
import { IconUsers, IconUserCog, IconSearch } from "../icons/index.jsx";
import { Alert, LoadingState } from "../components/ui";

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users", "list"],
    queryFn: userService.list,
  });

  const users = useMemo(() => data?.users || [], [data?.users]);

  const filteredUsers = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  }, [users, searchTerm]);

  const studentCount = useMemo(
    () => users.filter((u) => u.role === "student").length,
    [users]
  );
  const adminCount = useMemo(
    () => users.filter((u) => u.role === "admin").length,
    [users]
  );

  const handleRoleChange = () => {
    // This will be handled by the Users page component
    // For now, we'll just show a message
    alert("Role changes should be made from the Users page");
  };

  if (isLoading) {
    return (
      <div className="bg-gray-50">
        <div className="mx-auto max-w-7xl p-6 lg:p-8">
          <LoadingState />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-gray-50">
        <div className="mx-auto max-w-7xl p-6 lg:p-8">
          <Alert type="error">
            Failed to load users: {error?.message || "Unknown error"}
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="space-y-2 animate-[fadeIn_0.3s_ease-out]">
          <h1 className="text-4xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
              Admin Dashboard
            </span>
          </h1>
          <p className="text-gray-600 text-lg">Manage users and assign roles</p>
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-600">Total Users</h3>
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50">
                <IconUsers className="h-5 w-5 text-indigo-600" />
              </span>
            </div>
            <div className="mt-3 text-3xl font-bold text-indigo-700">
              {users.length}
            </div>
            <p className="mt-1 text-xs text-gray-500">Registered accounts</p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-600">Students</h3>
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-50">
                <IconUserCog className="h-5 w-5 text-cyan-600" />
              </span>
            </div>
            <div className="mt-3 text-3xl font-bold text-cyan-700">
              {studentCount}
            </div>
            <p className="mt-1 text-xs text-gray-500">Active learners</p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-600">Admins</h3>
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50">
                <IconUserCog className="h-5 w-5 text-indigo-600" />
              </span>
            </div>
            <div className="mt-3 text-3xl font-bold text-indigo-700">
              {adminCount}
            </div>
            <p className="mt-1 text-xs text-gray-500">System administrators</p>
          </div>
        </div>

        {/* User Management */}
        <div className="mt-8 rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 p-6">
            <h2 className="text-2xl font-semibold">User Management</h2>
            <p className="mt-1 text-base text-gray-600">
              View and manage all users in the system
            </p>

            <div className="relative mt-4">
              <IconSearch className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-11 w-full rounded-xl border border-gray-300 bg-white pl-10 pr-3 text-gray-900 outline-none ring-0 transition focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)]"
              />
            </div>
          </div>

          <div className="p-6 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="text-gray-600">
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Email</th>
                  <th className="px-4 py-3 font-semibold">Role</th>
                  <th className="px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {user.name}
                    </td>
                    <td className="px-4 py-3 text-gray-700">{user.email}</td>
                    <td className="px-4 py-3">
                      <span
                        className={
                          "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium " +
                          (user.role === "admin"
                            ? "bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-200"
                            : "bg-gray-100 text-gray-800 ring-1 ring-inset ring-gray-200")
                        }
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <label className="sr-only" htmlFor={`role-${user._id}`}>
                        Change role
                      </label>
                      <select
                        id={`role-${user._id}`}
                        className="w-36 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                        value={user.role}
                        onChange={handleRoleChange}
                      >
                        <option value="student">Student</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredUsers.length === 0 && (
              <div className="py-16 text-center text-gray-500">
                No users found.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tiny CSS keyframes for subtle intro animation */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(4px);} to { opacity: 1; transform: translateY(0);} }
      `}</style>
    </div>
  );
}

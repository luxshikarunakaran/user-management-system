import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { logout } from "../features/auth/authSlice";
import {
  IconCap,
  IconUser,
  IconLogout,
  IconDashboard,
} from "../icons/index.jsx";
import { toast } from "./ui";

export default function Layout() {
  const currentUser = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const menuRef = useRef(null);

  // Close dropdown on outside click or Esc
  useEffect(() => {
    const onClick = (e) => {
      if (
        open &&
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const avatarLetter =
    (currentUser?.name && currentUser.name.trim()[0]?.toUpperCase()) || "U";

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className=" bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 flex items-center justify-center shadow-md">
                <IconCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                  EduPortal
                </h1>
                <p className="text-xs text-gray-500">
                  Learning Management System
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={() =>
                  navigate(
                    currentUser?.role === "admin"
                      ? "/admin/dashboard"
                      : "/student/dashboard"
                  )
                }
                className="hidden sm:inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-indigo-50 transition"
              >
                <IconDashboard className="h-4 w-4" />
                Dashboard
              </button>

              {/* Avatar dropdown */}
              <div className="relative">
                <button
                  ref={btnRef}
                  onClick={() => setOpen((v) => !v)}
                  aria-haspopup="menu"
                  aria-expanded={open}
                  className="rounded-full p-1 hover:shadow-md transition"
                >
                  <div className="h-9 w-9 rounded-full border-2 border-indigo-200 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold flex items-center justify-center">
                    {avatarLetter}
                  </div>
                </button>

                {open && (
                  <div
                    ref={menuRef}
                    role="menu"
                    className="absolute right-0 mt-2 w-56 rounded-xl border border-gray-200 bg-white shadow-lg p-2"
                  >
                    {/* Label */}
                    <div className="px-3 py-2">
                      <p className="text-sm font-medium text-gray-900">
                        {currentUser?.name || "User"}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {currentUser?.email || "user@example.com"}
                      </p>
                    </div>
                    <div className="my-2 h-px bg-gray-100" />

                    {/* Profile */}
                    <button
                      role="menuitem"
                      onClick={() => {
                        setOpen(false);
                        navigate("/profile");
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-gray-50 text-gray-800"
                    >
                      <IconUser className="h-4 w-4" />
                      Profile
                    </button>

                    {/* Dashboard */}
                    <button
                      role="menuitem"
                      onClick={() => {
                        setOpen(false);
                        navigate(
                          currentUser?.role === "admin"
                            ? "/admin/dashboard"
                            : "/student/dashboard"
                        );
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-gray-50 text-gray-800"
                    >
                      <IconDashboard className="h-4 w-4" />
                      Dashboard
                    </button>

                    <div className="my-2 h-px bg-gray-100" />

                    {/* Logout */}
                    <button
                      role="menuitem"
                      onClick={() => {
                        setOpen(false);
                        handleLogout();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-red-50 text-red-700"
                    >
                      <IconLogout className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}

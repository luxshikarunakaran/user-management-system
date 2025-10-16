import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../store/hooks";
import { Alert, Button, Input, toast } from "../components/ui";
import authService from "../services/authService";
import { setCredentials } from "../features/auth/authSlice";

export default function Profile() {
  const currentUser = useAppSelector((state) => state.auth.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setEmail(currentUser.email || "");
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const payload = { name, email };
      const result = await authService.updateProfile(payload);
      if (result?.user) {
        // Update redux auth state while preserving token from localStorage
        const stored = localStorage.getItem("auth");
        let token = null;
        if (stored) {
          try {
            token = JSON.parse(stored)?.token || null;
          } catch {
            token = null;
          }
        }
        if (token) dispatch(setCredentials({ token, user: result.user }));
      }
      setSuccess("Profile updated successfully!");
      toast.success("Profile updated");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      const msg =
        err?.response?.data?.error ||
        "Failed to update profile. Please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 py-12 px-6">
      <div className="max-w-2xl mx-auto space-y-8 animate-[fadeIn_0.3s_ease-out]">
        {/* Header */}
        <div className="animate-[slideUp_0.3s_ease-out]">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
            Profile
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Manage your account settings
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">
          {/* Avatar and Header */}
          <div className="flex items-center gap-5 mb-8">
            <div className="h-24 w-24 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 flex items-center justify-center text-white text-3xl font-bold shadow-md">
              {name ? name.charAt(0).toUpperCase() : "U"}
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                {name || "User Name"}
              </h2>
              <p className="text-gray-500 text-base mt-1">
                {email || "user@example.com"}
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {success && <Alert type="success">{success}</Alert>}
            {error && <Alert type="error">{error}</Alert>}

            <Input
              id="name"
              label="Full Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
            />

            <Input
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <input
                value={currentUser?.role || ""}
                disabled
                className="w-full h-11 bg-gray-100 border border-gray-200 rounded-lg px-3 text-gray-600 cursor-not-allowed"
              />
            </div>

            <Button
              type="submit"
              loading={loading}
              disabled={loading}
              className="w-full mt-6"
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </div>
      </div>

      {/* Small CSS animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

import React, { useState } from "react";

export default function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated successfully");
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
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full h-11 border border-gray-300 rounded-lg px-3 outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-11 border border-gray-300 rounded-lg px-3 outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <input
                value="admin"
                disabled
                className="w-full h-11 bg-gray-100 border border-gray-200 rounded-lg px-3 text-gray-600 cursor-not-allowed"
              />
            </div>

            <button
              type="submit"
              className="w-full h-11 mt-6 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition"
            >
              {/* Inline User Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Save Changes
            </button>
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

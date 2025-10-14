import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-indigo-600 via-cyan-500 to-blue-500 text-white">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />

      <div className="relative z-10 max-w-4xl text-center px-6">
        {/* Title */}
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-6">
          User Management System
        </h1>

        {/* Description */}
        <p className="text-lg sm:text-xl leading-relaxed text-white/90 mb-10">
          A simple and secure platform designed to streamline user management
          for both administrators and students. Administrators can easily manage
          users, assign roles, and oversee system activities, while students can
          access personalized dashboards, organize their notes, and stay engaged
          with their learning progress — all in one place.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/login"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-white text-indigo-700 font-semibold px-8 shadow-md hover:bg-gray-100 transition"
          >
            Get Started — Login
          </Link>
          <Link
            to="/register"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-white/80 px-8 font-semibold hover:bg-white/10 transition"
          >
            Create an Account
          </Link>
        </div>
      </div>

      {/* Animated circles for background depth */}
      <div className="absolute top-[-10rem] right-[-10rem] w-[20rem] h-[20rem] bg-white/20 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute bottom-[-10rem] left-[-10rem] w-[22rem] h-[22rem] bg-white/10 blur-3xl rounded-full animate-pulse"></div>
    </div>
  );
}

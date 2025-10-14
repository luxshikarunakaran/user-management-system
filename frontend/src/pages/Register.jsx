import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "../services/authService";
import { Alert, Button, Input } from "../components/ui";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await authService.register({
        name,
        email,
        password,
        role: "student", // Default role is always student
      });

      if (response.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gray-50">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-cyan-200/40 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 left-10 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Card */}
      <div className="w-full max-w-md relative z-10 bg-white/90 backdrop-blur-md border border-gray-100 shadow-lg rounded-2xl p-8 animate-[slideUp_0.3s_ease-out]">
        <div className="text-center space-y-1 mb-6">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 flex items-center justify-center shadow-md">
              {/* Graduation cap icon (inline SVG) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 10L12 4 2 10l10 6 10-6z" />
                <path d="M6 12v5c0 .6.4 1 1 1h10a1 1 0 0 0 1-1v-5" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
            Create Account
          </h1>
          <p className="text-gray-600 text-base">
            Join us and start your learning journey
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {success && (
            <Alert type="success">
              Account created successfully! Redirecting to login...
            </Alert>
          )}
          {error && <Alert type="error">{error}</Alert>}

          <Input
            id="name"
            label="Full Name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={loading}
          />

          <Input
            id="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />

          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />

          <Button
            type="submit"
            loading={loading}
            disabled={loading}
            className="w-full mt-2"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 hover:text-cyan-500 font-semibold"
          >
            Sign in
          </Link>
        </div>
      </div>

      {/* Tiny keyframes for the slide-in */}
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

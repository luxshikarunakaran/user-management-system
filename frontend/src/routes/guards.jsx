import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

// Ensures the user is authenticated before accessing nested routes
export const PrivateRoute = () => {
  const token = useSelector((state) => state.auth.token);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

// Restricts nested routes to users with a specific role
export const RoleRoute = ({ role }) => {
  const { token, user } = useSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!user || (role && user.role !== role)) {
    // Fallback redirect based on user role if present
    if (user && user.role === "admin") {
      return <Navigate to="/admin" replace />;
    }
    if (user && user.role === "student") {
      return <Navigate to="/student" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

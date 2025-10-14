import { Routes, Route, Link, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import Users from "./pages/Users";
import StudentDashboard from "./pages/StudentDashboard";
import Profile from "./pages/Profile";
import Layout from "./components/Layout";
import { PrivateRoute, RoleRoute } from "./routes/guards";
import Home from "./pages/Home";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes with Layout */}
      {/* <Route element={<PrivateRoute />}> */}
      <Route element={<Layout />}>
        <Route path="/profile" element={<Profile />} />

        {/* Admin routes */}
        {/* <Route element={<RoleRoute role="admin" />}> */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<Users />} />
        {/* </Route> */}

        {/* Student routes */}
        {/* <Route element={<RoleRoute role="student" />}> */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/notes" element={<StudentDashboard />} />
        {/* </Route> */}
      </Route>
      {/* </Route> */}

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

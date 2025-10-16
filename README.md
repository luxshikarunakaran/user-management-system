## User Management (MERN) – Setup Guide

This project is a MERN stack app with role-based auth (admin/student), user management, and student notes, built with

- Backend: Node.js, Express, MongoDB, JWT
- Frontend: React (Vite), React Router, Redux Toolkit, React Query, Tailwind CSS, React Toastify

### Prerequisites

- Node.js 18+ and npm 9+
- MongoDB instance/cluster and a connection string

### 1) Backend Setup

1. Configure environment variables in `backend/.env`:

```
PORT=5001
MONGO_URI=mongodb://localhost:27017/user_management
JWT_SECRET=your_long_random_secret
```

2. Install dependencies and start the server:

```bash
cd backend
npm install
npm run dev
```

3. Server will start on `http://localhost:5001`. On successful DB connect, you’ll see a MongoDB connected log.

### 2) Frontend Setup

1. Optional: create a `.env` in `frontend/` to point to the backend (defaults to 5001):

```
VITE_API_BASE_URL=http://localhost:5001
```

2. Install dependencies and run dev server:

```bash
cd frontend
npm install
npm run dev
```

3. Open the printed URL (usually `http://localhost:5173`).

### 3) Login / Register

- Register at `/register` (defaults to student role).
- Login at `/login`.
- After login:
  - Admin users can access `/admin/dashboard` and manage users.
  - Students can access `/student/dashboard` to manage notes.

### 4) Notable Endpoints (Backend)

- Auth
  - `POST /api/auth/register` – Register user
  - `POST /api/auth/login` – Login and receive token
  - `GET /api/auth/profile` – Get current user (requires Bearer token)
  - `PUT /api/auth/profile` – Update current user (name, email, password)
- Users (admin only)
  - `GET /api/users` – List users
  - `PUT /api/users/:id/role` – Change role
  - `DELETE /api/users/:id` – Delete user
- Notes (student)
  - `GET /api/notes` – List my notes
  - `POST /api/notes` – Create note
  - `PUT /api/notes/:id` – Update note
  - `DELETE /api/notes/:id` – Delete note

All protected routes require `Authorization: Bearer <token>` header.

### 5) Frontend Tech Notes

- API base URL: `frontend/src/services/api.js` uses `VITE_API_BASE_URL` or `http://localhost:5001`.
- Auth persistence: token and user stored in Redux and `localStorage`.
- Data fetching: React Query (`@tanstack/react-query`).
- UI: Tailwind CSS + custom components.
- Notifications: React Toastify – a global `<ToastContainer />` is mounted in `src/main.jsx`. Use:


### 6) Common Issues

- 401 Unauthorized: Ensure requests include `Authorization: Bearer <token>` (auto-set via axios interceptor).
- MongoDB connection error: verify `MONGO_URI` in `backend/.env` and that MongoDB is reachable.
- CORS: server enables CORS; if accessing from a different origin fails, confirm backend is running and URL is correct.
- Toasts not visible: ensure only one ToastContainer is mounted (this project mounts it in `src/main.jsx`).

### 7) Scripts

- Backend
  - `npm run dev` – start with nodemon
  - `npm start` – start in production mode
- Frontend
  - `npm run dev` – start Vite dev server
  - `npm run build` – build for production
  - `npm run preview` – preview built app

### 8) Project Structure

```
User-Management/
  backend/
    controllers/ routes/ services/ models/ middlewares/ utils/
    server.js app.js config/db.js
  frontend/
    src/ components/ pages/ services/ features/ routes/ store/
    vite.config.js
```

### 9) Environment Checklist

- backend/.env:
  - `PORT` set (e.g., 5001)
  - `MONGO_URI` valid
  - `JWT_SECRET` set
- frontend/.env:
  - `VITE_API_BASE_URL` points to backend URL

You’re ready to go. Start backend first, then frontend.

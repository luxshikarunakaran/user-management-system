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
  - Place one `<ToastContainer />` at app root only (already set in `src/main.jsx`).


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


### 10) UI Screenshots (Desktop & Mobile)


#### Desktop Views

<img width="1511" height="763" alt="Home" src="https://github.com/user-attachments/assets/c143c794-399b-42e1-8242-9d3b884a93aa" />
<img width="1510" height="759" alt="Screenshot 2025-10-16 at 12 18 40 PM" src="https://github.com/user-attachments/assets/b234a5ed-56f0-479b-b72f-b1c3d739efca" />
<img width="1506" height="745" alt="Screenshot 2025-10-16 at 12 18 54 PM" src="https://github.com/user-attachments/assets/78217971-d1b5-41f8-9c3a-c029161ef099" />
<img width="1499" height="749" alt="Screenshot 2025-10-16 at 12 20 54 PM" src="https://github.com/user-attachments/assets/be31536a-ed19-4470-966f-de8bc95c27ac" />
<img width="1500" height="754" alt="Screenshot 2025-10-16 at 12 21 28 PM" src="https://github.com/user-attachments/assets/a1bdbfbb-7055-4ae5-91e2-934e855d754f" />
<img width="1495" height="746" alt="Screenshot 2025-10-16 at 12 22 02 PM" src="https://github.com/user-attachments/assets/650e5237-f508-4d36-ad81-acbcc4005ebf" />
<img width="1492" height="740" alt="Screenshot 2025-10-16 at 12 24 50 PM" src="https://github.com/user-attachments/assets/4fd6c0cb-ee84-4e06-90be-70fb2727325e" />
<img width="1488" height="741" alt="Screenshot 2025-10-16 at 12 25 09 PM" src="https://github.com/user-attachments/assets/238bb9cc-cc1a-4a96-9d3b-6c545231d680" />
<img width="1492" height="740" alt="Screenshot 2025-10-16 at 12 24 50 PM" src="https://github.com/user-attachments/assets/86fb5f54-2186-49eb-bb5f-6648fe9f767d" />
<img width="1488" height="744" alt="Screenshot 2025-10-16 at 12 25 23 PM" src="https://github.com/user-attachments/assets/444bd431-e166-4968-93cb-bad58d3e962c" />
<img width="1492" height="745" alt="Screenshot 2025-10-16 at 12 26 24 PM" src="https://github.com/user-attachments/assets/dc254d1e-e484-45e8-a611-4be3ba628b65" />

#### Mobile Views

<img width="496" height="754" alt="Screenshot 2025-10-16 at 8 31 35 PM" src="https://github.com/user-attachments/assets/fdbe3314-8c45-4a7b-a4a0-b4261209e9dc" />
<img width="496" height="754" alt="Screenshot 2025-10-16 at 12 27 02 PM" src="https://github.com/user-attachments/assets/6e3372af-9a43-4d20-9903-2e1613eb3e1e" />
<img width="496" height="754" alt="Screenshot 2025-10-16 at 12 27 15 PM" src="https://github.com/user-attachments/assets/8684b374-a54b-4f43-b5d9-c882e57b6e04" />
<img width="496" height="754" alt="Screenshot 2025-10-16 at 12 27 37 PM" src="https://github.com/user-attachments/assets/b64cb42d-feff-45b1-858f-78511509f3b1" />
<img width="496" height="754" alt="Screenshot 2025-10-16 at 12 27 56 PM" src="https://github.com/user-attachments/assets/32774c42-3b7a-4150-ba96-a69faa991951" />
<img width="496" height="754" alt="Screenshot 2025-10-16 at 12 28 20 PM" src="https://github.com/user-attachments/assets/a06b7be8-87c0-4809-86c3-885e0d3fd038" />

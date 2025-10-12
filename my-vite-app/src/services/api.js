// src/services/api.js
const API = import.meta.env.VITE_API_URL || ""; // nếu rỗng sẽ gọi relative /api/...

const jsonHeaders = (token) => {
  const h = { "Content-Type": "application/json" };
  if (token) h.Authorization = `Bearer ${token}`;
  return h;
};

export const registerUser = async (data) => {
  const res = await fetch(`${API}/api/auth/register`, {
    method: "POST",
    headers: jsonHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
};

export const loginUser = async (data) => {
  const res = await fetch(`${API}/api/auth/login`, {
    method: "POST",
    headers: jsonHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
};

// assumed profile route is mounted under /api/auth/profile
export const fetchUserProfile = async (token) => {
  const res = await fetch(`${API}/api/auth/profile`, {
    method: "GET",
    headers: jsonHeaders(token),
  });
  return res.json();
};

// Tracks endpoints (match backend /api/tracks)
export const fetchTracks = async (params = "", token) => {
  const res = await fetch(`${API}/api/tracks${params}`, {
    method: "GET",
    headers: jsonHeaders(token),
  });
  return res.json();
};

export const fetchTrackById = async (id, token) => {
  const res = await fetch(`${API}/api/tracks/${id}`, {
    method: "GET",
    headers: jsonHeaders(token),
  });
  return res.json();
};

// Search endpoint (match backend /api/search)
export const search = async (q, limit = 10) => {
  const res = await fetch(`${API}/api/search?q=${encodeURIComponent(q)}&limit=${limit}`, {
    method: "GET",
    headers: jsonHeaders(),
  });
  return res.json();
};

// server.js (hosted): allow frontend origin
app.use(cors({ origin: 'https://your-frontend.com', credentials: true }));
// src/services/api.js
import axios from 'axios';

const API_ORIGIN = import.meta.env.BACKEND_API_URL || ''; // '' => dùng relative /api/ (dev proxy)
const api = axios.create({
  baseURL: API_ORIGIN, // gọi các đường dẫn bắt đầu bằng '/api/...'
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true // bật nếu dùng cookie-based auth
});

// helper để set token Bearer khi cần
export const setAuthToken = (token) => {
  if (token) api.defaults.headers.common.Authorization = `Bearer ${token}`;
  else delete api.defaults.headers.common.Authorization;
};

const handleError = (err) => {
  if (err.response && err.response.data) throw err.response.data;
  throw { message: err.message || 'Unknown error' };
};

// Auth
export const registerUser = async (data) => {
  try {
    const res = await api.post('https://music-project-back-end.vercel.app/api/auth/register', data);
    return res.data;
  } catch (err) { handleError(err); }
};

export const loginUser = async (data) => {
  try {
    const res = await api.post('https://music-project-back-end.vercel.app/api/auth/login', data);
    return res.data;
  } catch (err) { handleError(err); }
};

export const fetchUserProfile = async (token = null, withCredentials = false) => {
  try {
    if (token) setAuthToken(token);
    const res = await api.get('https://music-project-back-end.vercel.app/api/auth/profile', { withCredentials });
    return res.data;
  } catch (err) { handleError(err); }
};

// Tracks
export const fetchTracks = async (params = '', token = null, withCredentials = false) => {
  try {
    if (token) setAuthToken(token);
    const res = await api.get(`https://music-project-back-end.vercel.app/api/tracks${params}`, { withCredentials });
    return res.data;
  } catch (err) { handleError(err); }
};

export const fetchTrackById = async (id, token = null, withCredentials = false) => {
  try {
    if (token) setAuthToken(token);
    const res = await api.get(`https://music-project-back-end.vercel.app/api/tracks/${id}`, { withCredentials });
    return res.data;
  } catch (err) { handleError(err); }
};

// Search
export const search = async (q, limit = 10) => {
  try {
    const res = await api.get(`https://movie-project-back-end.vercel.app/api/search`, {
      params: { q, limit }
    });
    return res.data;
  } catch (err) { handleError(err); }
};

export default api;
import api from './api';

// Get all tracks
export const fetchTracks = async (params = {}) => {
  const response = await api.get('/tracks', { params });
  return response.data;
};

// Get track by ID
export const fetchTrackById = async (id) => {
  const response = await api.get(`/tracks/${id}`);
  return response.data;
};

// Create track (admin)
export const createTrack = async (trackData) => {
  const response = await api.post('/tracks', trackData);
  return response.data;
};

// Update play count
export const playTrack = async (id) => {
  const response = await api.put(`/tracks/${id}/play`);
  return response.data;
};
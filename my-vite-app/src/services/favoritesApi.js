import api from './api'; // axios instance

export const saveFavorite = async (track, userId) => {
  return api.post(`/favorites/${userId}`, track);
};

export const removeFavorite = async (trackId) => {
  return api.delete(`/favorites/${trackId}`);
};

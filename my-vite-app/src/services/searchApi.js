import api from './api';

// Search tracks and artists
export const search = async (query, limit = 10) => {
  const response = await api.get('/search', {
    params: { q: query, limit }
  });
  return response.data;
};
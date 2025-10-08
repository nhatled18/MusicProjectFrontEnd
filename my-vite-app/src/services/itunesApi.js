const BASE_URL = 'https://itunes.apple.com';

// Search tracks
export const searchTracks = async (query, limit = 50) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search?term=${encodeURIComponent(query)}&entity=song&limit=${limit}&country=US`
    );
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error searching tracks:', error);
    return [];
  }
};

// Search by genre
export const searchTracksByGenre = async (genre, limit = 50) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search?term=${encodeURIComponent(genre)}&entity=song&limit=${limit}&country=US`
    );
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error searching tracks by genre:', error);
    return [];
  }
};

// Get top songs (search popular terms)
export const getTopSongs = async (limit = 50) => {
  const popularTerms = ['top hits 2024', 'popular music', 'trending songs'];
  const randomTerm = popularTerms[Math.floor(Math.random() * popularTerms.length)];
  return searchTracks(randomTerm, limit);
};
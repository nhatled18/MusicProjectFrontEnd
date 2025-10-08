const API_KEY = 'aa82445023ba0985d684cb625ba1b744'; // Thay bằng API key của bạn
const BASE_URL = 'https://ws.audioscrobbler.com/2.0/';

// Get top artists
export const getTopArtists = async (limit = 50) => {
  try {
    const response = await fetch(
      `${BASE_URL}?method=chart.gettopartists&api_key=${API_KEY}&format=json&limit=${limit}`
    );
    const data = await response.json();
    return data.artists.artist;
  } catch (error) {
    console.error('Error fetching top artists:', error);
    return [];
  }
};

// Get artist info
export const getArtistInfo = async (artistName) => {
  try {
    const response = await fetch(
      `${BASE_URL}?method=artist.getinfo&artist=${encodeURIComponent(artistName)}&api_key=${API_KEY}&format=json`
    );
    const data = await response.json();
    return data.artist;
  } catch (error) {
    console.error('Error fetching artist info:', error);
    return null;
  }
};

// Search artists
export const searchArtists = async (query, limit = 20) => {
  try {
    const response = await fetch(
      `${BASE_URL}?method=artist.search&artist=${encodeURIComponent(query)}&api_key=${API_KEY}&format=json&limit=${limit}`
    );
    const data = await response.json();
    return data.results.artistmatches.artist;
  } catch (error) {
    console.error('Error searching artists:', error);
    return [];
  }
};

// Get similar artists
export const getSimilarArtists = async (artistName, limit = 10) => {
  try {
    const response = await fetch(
      `${BASE_URL}?method=artist.getsimilar&artist=${encodeURIComponent(artistName)}&api_key=${API_KEY}&format=json&limit=${limit}`
    );
    const data = await response.json();
    return data.similarartists.artist;
  } catch (error) {
    console.error('Error fetching similar artists:', error);
    return [];
  }
  
};
// Get top tracks by genre/tag
export const getTopTracksByTag = async (tag, limit = 50) => {
  try {
    const response = await fetch(
      `${BASE_URL}?method=tag.gettoptracks&tag=${encodeURIComponent(tag)}&api_key=${API_KEY}&format=json&limit=${limit}`
    );
    const data = await response.json();
    return data.tracks?.track || [];
  } catch (error) {
    console.error('Error fetching tracks by tag:', error);
    return [];
  }
};

// Get track info
export const getTrackInfo = async (artist, track) => {
  try {
    const response = await fetch(
      `${BASE_URL}?method=track.getinfo&artist=${encodeURIComponent(artist)}&track=${encodeURIComponent(track)}&api_key=${API_KEY}&format=json`
    );
    const data = await response.json();
    return data.track;
  } catch (error) {
    console.error('Error fetching track info:', error);
    return null;
  }
};

// Search tracks
export const searchTracks = async (query, limit = 30) => {
  try {
    const response = await fetch(
      `${BASE_URL}?method=track.search&track=${encodeURIComponent(query)}&api_key=${API_KEY}&format=json&limit=${limit}`
    );
    const data = await response.json();
    return data.results?.trackmatches?.track || [];
  } catch (error) {
    console.error('Error searching tracks:', error);
    return [];
  }
};
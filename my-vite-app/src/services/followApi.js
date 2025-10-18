import api from './api';

// Theo dõi nghệ sĩ (gửi thông tin artist qua body)
export const followArtist = async (artistData) => {
  try {
    const res = await api.post('/follow', artistData);
    return res.data;
  } catch (error) {
    console.error('Error following artist:', error);
    throw error;
  }
};

// Bỏ theo dõi nghệ sĩ (gửi tên qua body)
export const unfollowArtist = async (artistName) => {
  try {
    const res = await api.delete('/follow', { 
      data: { name: artistName } 
    });
    return res.data;
  } catch (error) {
    console.error('Error unfollowing artist:', error);
    throw error;
  }
};

// Lấy danh sách nghệ sĩ đã theo dõi
export const getFollowedArtists = async () => {
  try {
    const res = await api.get('/follow');
    return res.data;
  } catch (error) {
    console.error('Error fetching followed artists:', error);
    throw error;
  }
};
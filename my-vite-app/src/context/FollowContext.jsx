import { createContext, useContext, useEffect, useState } from 'react';
import { followArtist as followApi, unfollowArtist as unfollowApi, getFollowedArtists } from '../services/followApi';

const FollowContext = createContext();

export const FollowProvider = ({ children }) => {
  const [followedArtists, setFollowedArtists] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFollowed = async () => {
      try {
        setLoading(true);
        const result = await getFollowedArtists();
        setFollowedArtists(result.data || []);
      } catch (err) {
        console.error('Lỗi tải danh sách follow:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFollowed();
  }, []);

  const followArtist = async (artistData) => {
    try {
      const res = await followApi(artistData);
      
      // Thêm artist vào danh sách
      setFollowedArtists((prev) => [...prev, res.data]);
      console.log('Đã theo dõi:', artistData.name);
      return res;
    } catch (err) {
      console.error('Lỗi khi follow:', err);
      throw err;
    }
  };

  const unfollowArtist = async (artistName) => {
    try {
      await unfollowApi(artistName);
      setFollowedArtists((prev) => prev.filter(a => a.name !== artistName));
      console.log('Đã bỏ theo dõi:', artistName);
    } catch (err) {
      console.error('Lỗi khi unfollow:', err);
      throw err;
    }
  };

  const isFollowingArtist = (artistName) => {
    return followedArtists.some(a => a.name === artistName);
  };

  const toggleFollowArtist = async (artistData) => {
    if (isFollowingArtist(artistData.name)) {
      await unfollowArtist(artistData.name);
    } else {
      await followArtist(artistData);
    }
  };

  return (
    <FollowContext.Provider value={{
      followedArtists,
      followArtist,
      unfollowArtist,
      isFollowingArtist,
      toggleFollowArtist,
      loading
    }}>
      {children}
    </FollowContext.Provider>
  );
};

export const useFollow = () => {
  const context = useContext(FollowContext);
  if (!context) {
    throw new Error('useFollow phải được dùng trong FollowProvider');
  }
  return context;
};
// FollowContext.jsx - Tạo context riêng cho Follow
import { createContext, useContext, useState } from 'react';

const FollowContext = createContext();

export const FollowProvider = ({ children }) => {
  const [followedArtists, setFollowedArtists] = useState([]);

  // Theo dõi nghệ sĩ
  const followArtist = (artist) => {
    setFollowedArtists(prev => {
      const isFollowed = prev.some(a => a.name === artist.name);
      if (isFollowed) {
        console.log('Đã theo dõi nghệ sĩ này rồi!');
        return prev;
      }
      console.log('Đã theo dõi:', artist.name);
      return [...prev, artist];
    });
  };

  // Bỏ theo dõi nghệ sĩ
  const unfollowArtist = (artistName) => {
    setFollowedArtists(prev => prev.filter(a => a.name !== artistName));
    console.log('Đã bỏ theo dõi:', artistName);
  };

  // Kiểm tra đã theo dõi chưa
  const isFollowingArtist = (artistName) => {
    return followedArtists.some(a => a.name === artistName);
  };

  // Toggle follow/unfollow
  const toggleFollowArtist = (artist) => {
    if (isFollowingArtist(artist.name)) {
      unfollowArtist(artist.name);
    } else {
      followArtist(artist);
    }
  };

  return (
    <FollowContext.Provider 
      value={{ 
        followedArtists,
        followArtist,
        unfollowArtist,
        isFollowingArtist,
        toggleFollowArtist
      }}
    >
      {children}
    </FollowContext.Provider>
  );
};


export const useFollow = () => {
  const context = useContext(FollowContext);
  if (!context) {
    throw new Error('useFollow phải được sử dụng trong FollowProvider');
  }
  return context;
};
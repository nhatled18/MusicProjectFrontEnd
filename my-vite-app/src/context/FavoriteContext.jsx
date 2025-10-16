import { createContext, useContext, useState, useEffect } from 'react';

const FavoriteContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoriteProvider');
  }
  return context;
};

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('soundwave_favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('soundwave_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (track) => {
    setFavorites(prev => {
      // Check if already exists
      if (prev.some(t => t.trackId === track.trackId)) {
        return prev;
      }
      return [...prev, track];
    });
  };

  const removeFavorite = (trackId) => {
    setFavorites(prev => prev.filter(t => t.trackId !== trackId));
  };

  const isFavorite = (trackId) => {
    return favorites.some(t => t.trackId === trackId);
  };

  const toggleFavorite = (track) => {
    if (isFavorite(track.trackId)) {
      removeFavorite(track.trackId);
      return false; // removed
    } else {
      addFavorite(track);
      return true; // added
    }
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  return (
    <FavoriteContext.Provider value={{
      favorites,
      addFavorite,
      removeFavorite,
      isFavorite,
      toggleFavorite,
      clearFavorites
    }}>
      {children}
    </FavoriteContext.Provider>
  );
};
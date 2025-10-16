import { useState, useEffect } from 'react';
import { useFavorites } from '../context/FavoriteContext';
import BackgroundAnimation from '../Components/BackgroundAnimation';
import Header from '../Components/Header';
import '../assets/Favorite.css';

export default function FavoritePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { favorites, removeFavorite, clearFavorites } = useFavorites();
  const [playingTrack, setPlayingTrack] = useState(null);
  const [audioRef, setAudioRef] = useState(null);
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest', 'name'

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  useEffect(() => {
    return () => {
      if (audioRef) {
        audioRef.pause();
        audioRef.currentTime = 0;
      }
    };
  }, [audioRef]);

  const formatDuration = (millis) => {
    if (!millis) return '0:00';
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds.padStart(2, '0')}`;
  };

  const handlePlayPause = (track) => {
    if (playingTrack?.trackId === track.trackId) {
      if (audioRef) {
        audioRef.pause();
      }
      setPlayingTrack(null);
    } else {
      if (audioRef) {
        audioRef.pause();
      }
      if (track.previewUrl) {
        const audio = new Audio(track.previewUrl);
        audio.play();
        audio.onended = () => setPlayingTrack(null);
        setAudioRef(audio);
        setPlayingTrack(track);
      }
    }
  };

  const handleRemove = (trackId, trackName) => {
    if (confirm(`Xóa "${trackName}" khỏi danh sách yêu thích?`)) {
      removeFavorite(trackId);
      if (playingTrack?.trackId === trackId && audioRef) {
        audioRef.pause();
        setPlayingTrack(null);
      }
    }
  };

  const handleClearAll = () => {
    if (confirm(`Xóa tất cả ${favorites.length} bài hát yêu thích?`)) {
      clearFavorites();
      if (audioRef) {
        audioRef.pause();
        setPlayingTrack(null);
      }
    }
  };

  // Sort favorites
  const sortedFavorites = [...favorites].sort((a, b) => {
    if (sortBy === 'newest') return -1; // Keep original order (newest first)
    if (sortBy === 'oldest') return 1;
    if (sortBy === 'name') return a.trackName.localeCompare(b.trackName);
    return 0;
  });

  return (
    <div className="favorite-page">
      <BackgroundAnimation />
      <Header isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout} />
      
      <div className="favorite-container">
        <section className="favorite-hero">
          <div className="favorite-hero-icon">❤️</div>
          <h1>Bài Hát Yêu Thích</h1>
          <p>{favorites.length} bài hát trong danh sách</p>
        </section>

        {favorites.length > 0 ? (
          <>
            {/* Controls */}
            <div className="favorite-controls">
              <div className="sort-controls">
                <label>Sắp xếp:</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="newest">Mới nhất</option>
                  <option value="oldest">Cũ nhất</option>
                  <option value="name">Tên A-Z</option>
                </select>
              </div>
              <button className="clear-all-btn" onClick={handleClearAll}>
                🗑️ Xóa tất cả
              </button>
            </div>

            {/* Favorites Grid */}
            <div className="favorites-grid">
              {sortedFavorites.map((track, index) => (
                <div key={track.trackId} className="favorite-track-card">
                  <div className="track-number">#{index + 1}</div>
                  
                  <div className="track-cover-container">
                    <img 
                      src={track.artworkUrl100} 
                      alt={track.trackName}
                      className="track-cover"
                    />
                    <div className="cover-overlay">
                      <button 
                        className="play-overlay-button"
                        onClick={() => handlePlayPause(track)}
                      >
                        {playingTrack?.trackId === track.trackId ? '⏸' : '▶'}
                      </button>
                    </div>
                  </div>

                  <div className="track-details">
                    <h3 className="track-name">{track.trackName}</h3>
                    <p className="track-artist">{track.artistName}</p>
                    <div className="track-meta">
                      <span>💿 {track.collectionName}</span>
                      <span>⏱️ {formatDuration(track.trackTimeMillis)}</span>
                    </div>
                  </div>

                  <div className="track-actions">
                    <button 
                      className="play-button"
                      onClick={() => handlePlayPause(track)}
                      title="Nghe preview 30s"
                    >
                      {playingTrack?.trackId === track.trackId ? '⏸️ Dừng' : '▶️ Nghe'}
                    </button>
                    <button 
                      className="remove-button"
                      onClick={() => handleRemove(track.trackId, track.trackName)}
                      title="Xóa khỏi yêu thích"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">💔</div>
            <h2>Chưa có bài hát yêu thích</h2>
            <p>Khám phá và thêm những bài hát yêu thích của bạn</p>
            <a href="/playlist" className="explore-btn">
              🎵 Khám phá ngay
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
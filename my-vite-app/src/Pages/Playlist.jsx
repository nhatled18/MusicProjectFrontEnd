import { useState, useEffect } from 'react';
import BackgroundAnimation from '../Components/BackgroundAnimation';
import Header from '../Components/Header';
import '../assets/Playlist.css';
import { searchTracks, searchTracksByGenre, getTopSongs } from '../services/itunesApi';

export default function PlaylistPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState('pop');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [playingTrack, setPlayingTrack] = useState(null);
  const [audioRef, setAudioRef] = useState(null);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  const genres = [
    { id: 'pop', name: 'Pop', emoji: '🎤', color: '#FF6B9D' },
    { id: 'rock', name: 'Rock', emoji: '🎸', color: '#C23B22' },
    { id: 'dance', name: 'Dance', emoji: '💃', color: '#FF10F0' },
    { id: 'hip hop', name: 'Hip Hop', emoji: '🎧', color: '#3498DB' },
    { id: 'jazz', name: 'Jazz', emoji: '🎷', color: '#FFA500' },
    { id: 'electronic', name: 'Electronic', emoji: '🎛️', color: '#E74C3C' },
    { id: 'indie', name: 'Indie', emoji: '🌊', color: '#1ABC9C' },
    { id: 'classical', name: 'Classical', emoji: '🎻', color: '#9B59B6' },
  ];

  useEffect(() => {
    fetchTracks();
  }, [selectedGenre]);

  const fetchTracks = async () => {
    setLoading(true);
    const data = await searchTracksByGenre(selectedGenre, 50);
    setTracks(data);
    setLoading(false);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setSearching(true);
    const results = await searchTracks(searchQuery, 30);
    setSearchResults(results);
    setSearching(false);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const formatDuration = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds.padStart(2, '0')}`;
  };

  const handlePlayPause = (track) => {
    if (playingTrack?.trackId === track.trackId) {
      // Pause current track
      if (audioRef) {
        audioRef.pause();
      }
      setPlayingTrack(null);
    } else {
      // Play new track
      if (audioRef) {
        audioRef.pause();
      }
      const audio = new Audio(track.previewUrl);
      audio.play();
      audio.onended = () => setPlayingTrack(null);
      setAudioRef(audio);
      setPlayingTrack(track);
    }
  };

  const displayTracks = searchResults.length > 0 ? searchResults : tracks;

  return (
    <div className="playlist-page">
      <BackgroundAnimation />
      <Header isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout} />
      
      <div className="playlist-container">
        <section className="playlist-hero">
          <h1>🎵 Khám Phá Playlist</h1>
          <p>Nghe những bản nhạc hot nhất - Preview 30s</p>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="playlist-search-form">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm bài hát, nghệ sĩ..."
              className="playlist-search-input"
            />
            <button type="submit" className="playlist-search-btn">
              🔍 Tìm kiếm
            </button>
            {searchResults.length > 0 && (
              <button type="button" onClick={clearSearch} className="playlist-clear-btn">
                ✕ Xóa
              </button>
            )}
          </form>
        </section>

        {/* Genre Filter */}
        {searchResults.length === 0 && (
          <div className="genre-filter">
            <h3>Chọn thể loại:</h3>
            <div className="genre-buttons">
              {genres.map(genre => (
                <button
                  key={genre.id}
                  className={`genre-btn ${selectedGenre === genre.id ? 'active' : ''}`}
                  style={{ 
                    background: selectedGenre === genre.id ? genre.color : 'rgba(255,255,255,0.1)',
                    borderColor: genre.color 
                  }}
                  onClick={() => setSelectedGenre(genre.id)}
                >
                  <span>{genre.emoji}</span> {genre.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading */}
        {(loading || searching) && (
          <div className="loading-section">
            <div className="loading-spinner">🎵</div>
            <p>{searching ? 'Đang tìm kiếm...' : 'Đang tải bài hát...'}</p>
          </div>
        )}

        {/* Results Header */}
        {!loading && !searching && displayTracks.length > 0 && (
          <div className="results-header">
            <h2>
              {searchResults.length > 0 
                ? `🔍 Kết quả cho "${searchQuery}"` 
                : `${genres.find(g => g.id === selectedGenre)?.emoji} Top ${genres.find(g => g.id === selectedGenre)?.name} Tracks`
              }
            </h2>
            <p>{displayTracks.length} bài hát</p>
          </div>
        )}

        {/* Tracks Grid */}
        {!loading && !searching && displayTracks.length > 0 && (
          <div className="tracks-grid">
            {displayTracks.map((track, index) => (
              <div key={track.trackId} className="track-card">
                <div className="track-rank">#{index + 1}</div>
                <div className="track-cover-wrapper">
                  <img 
                    src={track.artworkUrl100} 
                    alt={track.trackName}
                    className="track-cover-img"
                  />
                  <div className="track-overlay">
                    <button 
                      className="play-overlay-btn"
                      onClick={() => handlePlayPause(track)}
                    >
                      {playingTrack?.trackId === track.trackId ? '⏸' : '▶'}
                    </button>
                  </div>
                </div>
                <div className="track-info-card">
                  <h3>{track.trackName}</h3>
                  <p className="track-artist-name">{track.artistName}</p>
                  <div className="track-stats">
                    <span>💿 {track.collectionName}</span>
                    <span>⏱️ {formatDuration(track.trackTimeMillis)}</span>
                  </div>
                  <div className="track-actions-card">
                    <button 
                      className="action-btn play-btn-card"
                      onClick={() => handlePlayPause(track)}
                      title="Nghe preview 30s"
                    >
                      {playingTrack?.trackId === track.trackId ? '⏸️' : '▶️'}
                    </button>
                    <button className="action-btn like-btn" title="Yêu thích">
                      ❤️
                    </button>
                    <button className="action-btn add-btn" title="Thêm vào playlist">
                      ➕
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && !searching && displayTracks.length === 0 && (
          <div className="no-results">
            <div className="no-results-icon">🎵</div>
            <h3>Không tìm thấy bài hát nào</h3>
            <p>Thử tìm kiếm với từ khóa khác</p>
          </div>
        )}
      </div>
    </div>
  );
}
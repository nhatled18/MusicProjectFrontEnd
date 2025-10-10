import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/Header.css';
import { searchTracks } from '../services/itunesApi';
import { searchArtists } from '../services/lastfmapi';

export default function Header({ isLoggedIn, onLogin, onLogout }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({ tracks: [], artists: [] });
  const [showResults, setShowResults] = useState(false);
  const [searching, setSearching] = useState(false);
  const [playingTrack, setPlayingTrack] = useState(null);
  const [audioRef, setAudioRef] = useState(null);
  const searchRef = useRef(null);

  // Close dropdown when click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef) {
        audioRef.pause();
        audioRef.currentTime = 0;
      }
    };
  }, [audioRef]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setShowResults(false);
      return;
    }

    setSearching(true);
    setShowResults(true);

    try {
      // Search tracks and artists
      const [tracksData, artistsData] = await Promise.all([
        searchTracks(searchQuery, 5),
        searchArtists(searchQuery, 5)
      ]);

      setSearchResults({
        tracks: tracksData,
        artists: artistsData
      });
    } catch (error) {
      console.error('Search error:', error);
    }

    setSearching(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    if (!e.target.value.trim()) {
      setShowResults(false);
    }
  };

  const formatNumber = (num) => {
    if (!num) return '0';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num;
  };

  const getAvatarUrl = (name) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=100&background=random&color=fff&bold=true`;
  };

  const clearSearch = () => {
    setSearchQuery('');
    setShowResults(false);
    setSearchResults({ tracks: [], artists: [] });
  };

  const handleArtistClick = (artist) => {
    clearSearch();
    // Navigate to artist page with query parameter
    navigate(`/artist?q=${encodeURIComponent(artist.name)}`);
  };

  const handleTrackClick = (track) => {
    clearSearch();
    
    // Stop current playing track if any
    if (audioRef) {
      audioRef.pause();
      audioRef.currentTime = 0;
    }

    // Play preview if available
    if (track.previewUrl) {
      const audio = new Audio(track.previewUrl);
      audio.play();
      audio.onended = () => {
        setPlayingTrack(null);
        setAudioRef(null);
      };
      setAudioRef(audio);
      setPlayingTrack(track);
    }
  };

  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="logo">
          <span className="logo-icon">🎵</span>
          SoundWave
        </Link>

        <div className="nav-center">
          <div className="search-container" ref={searchRef}>
            <input
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              onFocus={() => searchQuery && setShowResults(true)}
              placeholder="Tìm kiếm bài hát, nghệ sĩ, album..."
              className="search-bar"
            />
            <span onClick={handleSearch} className="search-icon">
              🔍
            </span>

            {/* Search Results Dropdown */}
            {showResults && (
              <div className="search-dropdown">
                {searching ? (
                  <div className="search-loading">
                    <span className="loading-spinner-small">🔍</span>
                    <p>Đang tìm kiếm...</p>
                  </div>
                ) : (
                  <>
                    {/* Artists Results */}
                    {searchResults.artists.length > 0 && (
                      <div className="search-section">
                        <h4>👥 Nghệ sĩ</h4>
                        {searchResults.artists.map((artist, index) => {
                          const hasValidImage = artist.image?.[1]?.['#text'] && 
                            !artist.image[1]['#text'].includes('2a96cbd8b46e442fc41c2b86b821562f');
                          
                          return (
                            <div 
                              key={artist.mbid || index} 
                              className="search-result-item"
                              onClick={() => handleArtistClick(artist)}
                            >
                              <img 
                                src={hasValidImage ? artist.image[1]['#text'] : getAvatarUrl(artist.name)}
                                alt={artist.name}
                                className="result-img"
                              />
                              <div className="result-info">
                                <p className="result-title">{artist.name}</p>
                                <p className="result-subtitle">
                                  {artist.listeners ? `${formatNumber(artist.listeners)} người nghe` : 'Nghệ sĩ'}
                                </p>
                              </div>
                              <span className="result-arrow">→</span>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Tracks Results */}
                    {searchResults.tracks.length > 0 && (
                      <div className="search-section">
                        <h4>🎵 Bài hát</h4>
                        {searchResults.tracks.map((track) => (
                          <div 
                            key={track.trackId} 
                            className="search-result-item"
                            onClick={() => handleTrackClick(track)}
                          >
                            <img 
                              src={track.artworkUrl60}
                              alt={track.trackName}
                              className="result-img"
                            />
                            <div className="result-info">
                              <p className="result-title">{track.trackName}</p>
                              <p className="result-subtitle">{track.artistName}</p>
                            </div>
                            {track.previewUrl && (
                              <span className="result-play">
                                {playingTrack?.trackId === track.trackId ? '⏸' : '▶'}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* No Results */}
                    {searchResults.artists.length === 0 && searchResults.tracks.length === 0 && (
                      <div className="search-no-results">
                        <p>😔 Không tìm thấy kết quả</p>
                        <span>Thử tìm kiếm với từ khóa khác</span>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>

          <ul className="nav-links">
            <li><Link to="/">Trang chủ</Link></li>
            <li><Link to="/discover">Khám phá</Link></li>
            <li><Link to="/playlist">Playlist</Link></li>
            <li><Link to="/artist">Nghệ sĩ</Link></li>
          </ul>
        </div>

        {!isLoggedIn ? (
          <div className="auth-buttons">
            <Link to="/login" className="auth-btn">
              Đăng nhập
            </Link>
            <Link to="/register" className="auth-btn signup-btn">
              Đăng ký
            </Link>
          </div>
        ) : (
          <div className={`user-menu ${isLoggedIn ? 'active' : ''}`}>
            <div className="user-avatar">👤</div>
            <button onClick={onLogout} className="logout-btn">
              Đăng xuất
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
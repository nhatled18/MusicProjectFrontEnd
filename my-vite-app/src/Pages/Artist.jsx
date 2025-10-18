import { useState, useEffect } from 'react';
import BackgroundAnimation from '../Components/BackgroundAnimation';
import Header from '../Components/Header';
import '../assets/Artist.css';
import { getTopArtists, searchArtists } from '../services/lastfmapi';
import { useFollow } from '../context/FollowContext'; 


export default function Artist() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  // Lấy functions từ FollowContext
  const { followArtist, unfollowArtist, isFollowingArtist } = useFollow();

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  // Fetch top artists khi component mount
  useEffect(() => {
    fetchTopArtists();
  }, []);

  const fetchTopArtists = async () => {
    setLoading(true);
    const data = await getTopArtists(50);
    setArtists(data);
    setLoading(false);
  };

  // Handle search
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setSearching(true);
    const results = await searchArtists(searchQuery, 20);
    setSearchResults(results);
    setSearching(false);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  // Handle follow/unfollow
  const handleFollowClick = (artist) => {
    const isFollowing = isFollowingArtist(artist.name);
    
    if (isFollowing) {
      unfollowArtist(artist.name);
    } else {
      followArtist({
        name: artist.name,
        listeners: artist.listeners,
        playcount: artist.playcount,
        image: artist.image,
        mbid: artist.mbid,
        url: artist.url
      });
    }
  };

  // Format số followers
  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num;
  };

  // Tạo avatar đẹp từ tên nghệ sĩ
  const getAvatarUrl = (name) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=300&background=random&color=fff&bold=true&font-size=0.4`;
  };

  // Check xem có ảnh hợp lệ không
  const hasValidImage = (imageArray, index) => {
    return imageArray?.[index]?.['#text'] && 
           imageArray[index]['#text'] !== '' &&
           !imageArray[index]['#text'].includes('2a96cbd8b46e442fc41c2b86b821562f');
  };

  // Chia artists thành các nhóm
  const featuredArtists = artists.slice(0, 4);
  const popularArtists = artists.slice(4, 16);
  const risingStars = artists.slice(16, 20);

  return (
    <div className="artist-page">
      <BackgroundAnimation />
      <Header isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout} />
      
      <div className="artist-container">
        <section className="artist-hero">
          <h1>Nghệ Sĩ Nổi Bật</h1>
          <p>Khám phá các nghệ sĩ hàng đầu và tài năng mới nổi</p>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="artist-search-form">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm nghệ sĩ..."
              className="artist-search-input"
            />
            <button type="submit" className="artist-search-btn">
              🔍 Tìm kiếm
            </button>
            {searchResults.length > 0 && (
              <button type="button" onClick={clearSearch} className="artist-clear-btn">
                ✕ Xóa
              </button>
            )}
          </form>
        </section>

        {/* Search Results */}
        {searching && (
          <div className="loading-section">
            <div className="loading-spinner">🎵</div>
            <p>Đang tìm kiếm...</p>
          </div>
        )}

        {searchResults.length > 0 && !searching && (
          <section className="search-results-section">
            <h2>🔍 Kết quả tìm kiếm "{searchQuery}"</h2>
            <div className="popular-grid">
              {searchResults.map((artist, index) => {
                const isFollowing = isFollowingArtist(artist.name);
                return (
                  <div key={artist.mbid || index} className="artist-card">
                    <div className="artist-avatar">
                      {hasValidImage(artist.image, 2) ? (
                        <img src={artist.image[2]['#text']} alt={artist.name} />
                      ) : (
                        <img src={getAvatarUrl(artist.name)} alt={artist.name} />
                      )}
                    </div>
                    <h3>{artist.name}</h3>
                    <p className="followers">
                      {artist.listeners ? `${formatNumber(artist.listeners)} người nghe` : 'Nghệ sĩ'}
                    </p>
                    <button 
                      className={`follow-btn-small ${isFollowing ? 'following' : ''}`}
                      onClick={() => handleFollowClick(artist)}
                    >
                      {isFollowing ? '✓ Đang theo dõi' : '+ Theo dõi'}
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Loading State */}
        {loading && searchResults.length === 0 && (
          <div className="loading-section">
            <div className="loading-spinner">🎵</div>
            <p>Đang tải dữ liệu nghệ sĩ...</p>
          </div>
        )}

        {/* Main Content - Chỉ hiện khi không search */}
        {!loading && searchResults.length === 0 && (
          <>
            <section className="featured-artists-section">
              <h2>⭐ Nghệ Sĩ Nổi Bật</h2>
              <div className="featured-grid">
                {featuredArtists.map((artist, index) => {
                  const isFollowing = isFollowingArtist(artist.name);
                  return (
                    <div key={artist.mbid || index} className="featured-artist-card">
                      <div className="featured-avatar">
                        {hasValidImage(artist.image, 3) ? (
                          <img src={artist.image[3]['#text']} alt={artist.name} />
                        ) : (
                          <img src={getAvatarUrl(artist.name)} alt={artist.name} />
                        )}
                      </div>
                      <div className="featured-info">
                        <h3>
                          {artist.name}
                          <span className="verified">✓</span>
                        </h3>
                        <p className="followers">
                          👥 {formatNumber(artist.listeners)} người nghe
                        </p>
                        <p className="playcount">
                          ▶ {formatNumber(artist.playcount)} lượt phát
                        </p>
                        <button 
                          className={`follow-btn ${isFollowing ? 'following' : ''}`}
                          onClick={() => handleFollowClick(artist)}
                        >
                          {isFollowing ? '✓ Đang theo dõi' : '+ Theo dõi'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="popular-artists-section">
              <h2>🔥 Nghệ Sĩ Phổ Biến</h2>
              <div className="popular-grid">
                {popularArtists.map((artist, index) => {
                  const isFollowing = isFollowingArtist(artist.name);
                  return (
                    <div key={artist.mbid || index} className="artist-card">
                      <div className="artist-avatar">
                        {hasValidImage(artist.image, 2) ? (
                          <img src={artist.image[2]['#text']} alt={artist.name} />
                        ) : (
                          <img src={getAvatarUrl(artist.name)} alt={artist.name} />
                        )}
                      </div>
                      <h3>{artist.name}</h3>
                      <p className="followers">
                        {formatNumber(artist.listeners)} người nghe
                      </p>
                      <button 
                        className={`follow-btn-small ${isFollowing ? 'following' : ''}`}
                        onClick={() => handleFollowClick(artist)}
                      >
                        {isFollowing ? '✓ Đang theo dõi' : '+ Theo dõi'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="rising-stars-section">
              <h2>🚀 Tài Năng Mới Nổi</h2>
              <div className="rising-grid">
                {risingStars.map((artist, index) => {
                  const isFollowing = isFollowingArtist(artist.name);
                  return (
                    <div key={artist.mbid || index} className="rising-card">
                      <div className="rising-badge">NEW</div>
                      <div className="rising-avatar">
                        {hasValidImage(artist.image, 2) ? (
                          <img src={artist.image[2]['#text']} alt={artist.name} />
                        ) : (
                          <img src={getAvatarUrl(artist.name)} alt={artist.name} />
                        )}
                      </div>
                      <h3>{artist.name}</h3>
                      <p className="followers">
                        {formatNumber(artist.listeners)} người nghe
                      </p>
                      <button 
                        className={`follow-btn-small ${isFollowing ? 'following' : ''}`}
                        onClick={() => handleFollowClick(artist)}
                      >
                        {isFollowing ? '✓ Đang theo dõi' : '+ Theo dõi'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
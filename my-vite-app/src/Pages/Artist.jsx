import { useState } from 'react';
import BackgroundAnimation from '../Components/BackgroundAnimation';
import Header from '../Components/Header';
import '../assets/Artist.css';

export default function Artist() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  const featuredArtists = [
    { id: 1, name: 'Luna Sky', genre: 'Pop', followers: '2.5M', avatar: '👩‍🎤', verified: true },
    { id: 2, name: 'Neon Pulse', genre: 'EDM', followers: '1.8M', avatar: '🎧', verified: true },
    { id: 3, name: 'Jazz Master', genre: 'Jazz', followers: '950K', avatar: '🎷', verified: true },
    { id: 4, name: 'Rock Legend', genre: 'Rock', followers: '3.2M', avatar: '🎸', verified: true },
  ];

  const popularArtists = [
    { id: 5, name: 'Acoustic Soul', genre: 'Acoustic', followers: '1.2M', avatar: '🎹' },
    { id: 6, name: 'Hip Hop King', genre: 'Hip Hop', followers: '2.1M', avatar: '🎤' },
    { id: 7, name: 'Classical Dream', genre: 'Classical', followers: '850K', avatar: '🎻' },
    { id: 8, name: 'Country Star', genre: 'Country', followers: '1.5M', avatar: '🤠' },
    { id: 9, name: 'R&B Queen', genre: 'R&B', followers: '1.9M', avatar: '👸' },
    { id: 10, name: 'Latin Fire', genre: 'Latin', followers: '1.3M', avatar: '💃' },
    { id: 11, name: 'Indie Wave', genre: 'Indie', followers: '780K', avatar: '🌊' },
    { id: 12, name: 'Metal Storm', genre: 'Metal', followers: '920K', avatar: '🤘' },
  ];

  const risingStars = [
    { id: 13, name: 'Fresh Beat', genre: 'Pop', followers: '150K', avatar: '⭐', trending: '+45%' },
    { id: 14, name: 'New Wave', genre: 'Electronic', followers: '220K', avatar: '🌟', trending: '+62%' },
    { id: 15, name: 'Young Soul', genre: 'R&B', followers: '180K', avatar: '✨', trending: '+38%' },
    { id: 16, name: 'Beat Maker', genre: 'Hip Hop', followers: '195K', avatar: '🔥', trending: '+51%' },
  ];

  return (
    <div className="artist-page">
      <BackgroundAnimation />
      <Header isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout} />
      
      <div className="artist-container">
        <section className="artist-hero">
          <h1>Nghệ Sĩ Nổi Bật</h1>
          <p>Khám phá các nghệ sĩ hàng đầu và tài năng mới nổi</p>
        </section>

        <section className="featured-artists-section">
          <h2>⭐ Nghệ Sĩ Nổi Bật</h2>
          <div className="featured-grid">
            {featuredArtists.map(artist => (
              <div key={artist.id} className="featured-artist-card">
                <div className="featured-avatar">{artist.avatar}</div>
                <div className="featured-info">
                  <h3>
                    {artist.name}
                    {artist.verified && <span className="verified">✓</span>}
                  </h3>
                  <p className="genre">{artist.genre}</p>
                  <p className="followers">👥 {artist.followers} người theo dõi</p>
                  <button className="follow-btn">Theo dõi</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="popular-artists-section">
          <h2>🔥 Nghệ Sĩ Phổ Biến</h2>
          <div className="popular-grid">
            {popularArtists.map(artist => (
              <div key={artist.id} className="artist-card">
                <div className="artist-avatar">{artist.avatar}</div>
                <h3>{artist.name}</h3>
                <p className="genre">{artist.genre}</p>
                <p className="followers">{artist.followers}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rising-stars-section">
          <h2>🚀 Tài Năng Mới Nổi</h2>
          <div className="rising-grid">
            {risingStars.map(artist => (
              <div key={artist.id} className="rising-card">
                <div className="rising-badge">{artist.trending}</div>
                <div className="rising-avatar">{artist.avatar}</div>
                <h3>{artist.name}</h3>
                <p className="genre">{artist.genre}</p>
                <p className="followers">{artist.followers} người theo dõi</p>
                <button className="follow-btn-small">+ Theo dõi</button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
import { useState } from 'react';
import BackgroundAnimation from '../Components/BackgroundAnimation';
import Header from '../Components/Header';
import GenreCards from '../Components/GenreCards'; // ← THÊM DÒNG NÀY
import '../assets/Discover.css';

export default function Discover() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  const trending = [
    { id: 1, title: 'Midnight Dreams', artist: 'Luna Sky', plays: '2.4M', cover: '🌙' },
    { id: 2, title: 'Electric Soul', artist: 'Neon Pulse', plays: '1.8M', cover: '⚡' },
    { id: 3, title: 'Ocean Waves', artist: 'Blue Horizon', plays: '3.1M', cover: '🌊' },
    { id: 4, title: 'Golden Hour', artist: 'Sunset Band', plays: '2.7M', cover: '🌅' },
    { id: 5, title: 'Starlight', artist: 'Cosmic Dreams', plays: '1.5M', cover: '✨' },
    { id: 6, title: 'Fire Dance', artist: 'Rhythm Crew', plays: '2.2M', cover: '🔥' },
  ];

  const newReleases = [
    { id: 1, title: 'New Beginnings', artist: 'Fresh Start', date: '2024-03-15', cover: '🎵' },
    { id: 2, title: 'City Lights', artist: 'Urban Tales', date: '2024-03-14', cover: '🌃' },
    { id: 3, title: 'Paradise', artist: 'Island Vibes', date: '2024-03-13', cover: '🏝️' },
    { id: 4, title: 'Revolution', artist: 'Change Makers', date: '2024-03-12', cover: '🚀' },
  ];

  return (
    <div className="discover-page">
      <BackgroundAnimation />
      <Header isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout} />
      
      <div className="discover-container">
        <section className="discover-hero">
          <h1>Khám Phá Âm Nhạc</h1>
          <p>Tìm kiếm thể loại yêu thích và khám phá những bản nhạc mới nhất</p>
        </section>

    
        <GenreCards />

     

        <section className="trending-section">
          <h2>🔥 Trending Ngay Bây Giờ</h2>
          <div className="trending-grid">
            {trending.map((song, index) => (
              <div key={song.id} className="trending-card">
                <div className="trending-rank">#{index + 1}</div>
                <div className="trending-cover">{song.cover}</div>
                <div className="trending-info">
                  <h3>{song.title}</h3>
                  <p className="artist">{song.artist}</p>
                  <p className="plays">▶ {song.plays} lượt nghe</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="new-releases-section">
          <h2>🎉 Phát Hành Mới</h2>
          <div className="releases-grid">
            {newReleases.map(release => (
              <div key={release.id} className="release-card">
                <div className="release-cover">{release.cover}</div>
                <h3>{release.title}</h3>
                <p className="artist">{release.artist}</p>
                <p className="date">{release.date}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
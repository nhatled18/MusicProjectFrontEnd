import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/Header.css';

export default function Header({ isLoggedIn, onLogin, onLogout }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      alert(`Đang tìm kiếm: "${searchQuery}" 🔍`);
      setSearchQuery('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
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
          <div className="search-container">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Tìm kiếm bài hát, nghệ sĩ, album..."
              className="search-bar"
            />
            <span onClick={handleSearch} className="search-icon">
              🔍
            </span>
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
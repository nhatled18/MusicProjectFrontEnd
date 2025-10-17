import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFollow } from '../context/FollowContext'; 
import '../assets/Dropdown.css';

const DropdownMenu = ({ favoritesCount = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  
  // Lấy dữ liệu từ FollowContext
  const { followedArtists } = useFollow();

  // Đóng dropdown khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleFollow = () => {
    navigate('/follow');
    setIsOpen(false);
  };

  const handleGoToFavorites = () => {
    setIsOpen(false);
    navigate('/favorites');
  };

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button 
        className={`dropdown-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Danh sách</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {isOpen && (
        <div className="dropdown-menu show">
          <button className="dropdown-item" onClick={handleFollow}>
            <div className="icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <line x1="19" y1="8" x2="19" y2="14"></line>
                <line x1="22" y1="11" x2="16" y2="11"></line>
              </svg>
            </div>
            <div className="item-content">
              <div className="item-title">
                Theo dõi {followedArtists.length > 0 && `(${followedArtists.length})`}
              </div>
              <div className="item-description">
                {followedArtists.length > 0 
                  ? `${followedArtists.length} nghệ sĩ đang theo dõi`
                  : 'Nhận thông báo mới'}
              </div>
            </div>
            <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          <div className="divider"></div>

          <button className="dropdown-item favorite" onClick={handleGoToFavorites}>
            <div className="icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </div>
            <div className="item-content">
              <div className="item-title">Yêu thích ({favoritesCount})</div>
              <div className="item-description">Xem trang yêu thích</div>
            </div>
            <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
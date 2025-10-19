import { useFollow } from '../context/FollowContext';
import '../assets/FollowPage.css';

const FollowPage = () => {
  const { followedArtists, unfollowArtist } = useFollow();

  const handleUnfollow = (artistName) => {
    if (window.confirm(`Bạn có chắc muốn bỏ theo dõi ${artistName}?`)) {
      unfollowArtist(artistName);
    }
  };

  const handleArtistClick = (artist) => {
    console.log('Xem chi tiết:', artist.name);
  };

  const formatNumber = (num) => {
    if (!num) return '0';
    return new Intl.NumberFormat('vi-VN').format(num);
  };

  const getAvatarUrl = (name) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=200&background=1db954&color=fff`;
  };

  if (followedArtists.length === 0) {
    return (
      <div className="follow-page">
        <div className="page-header">
          <button className="back-btn" onClick={() => window.history.back()}>
            ← Quay lại
          </button>
          <h1>Nghệ Sĩ Đang Theo Dõi</h1>
        </div>

        <div className="empty-state">
          <div className="empty-icon">🎵</div>
          <h2>Chưa có nghệ sĩ nào</h2>
          <p>Bạn chưa theo dõi nghệ sĩ nào. Hãy khám phá và theo dõi nghệ sĩ yêu thích của bạn!</p>
          <button className="explore-btn" onClick={() => window.location.href = '/artist'}>
            Khám phá nghệ sĩ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="follow-page">
      <div className="page-header">
        <button className="back-btn" onClick={() => window.history.back()}>
          ← Quay lại
        </button>
        <div className="header-content">
          <h1>Nghệ Sĩ Đang Theo Dõi</h1>
          <p className="subtitle">{followedArtists.length} nghệ sĩ</p>
        </div>
      </div>

      <div className="follow-grid">
        {followedArtists.map((artist, index) => (
          <div key={artist.mbid || index} className="follow-card">
            <div 
              className="artist-content"
              onClick={() => handleArtistClick(artist)}
            >
              <div className="artist-avatar">
                {artist.image && artist.image[2] && artist.image[2]['#text'] ? (
                  <img src={artist.image[2]['#text']} alt={artist.name} />
                ) : (
                  <img src={getAvatarUrl(artist.name)} alt={artist.name} />
                )}
                <div className="following-badge">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              </div>
              
              <div className="artist-info">
                <h3>{artist.name}</h3>
                <p className="listeners">
                  {formatNumber(artist.listeners)} người nghe
                </p>
              </div>
            </div>

            <div className="card-actions">
              <button 
                className="unfollow-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleUnfollow(artist.name);
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                Bỏ theo dõi
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowPage;
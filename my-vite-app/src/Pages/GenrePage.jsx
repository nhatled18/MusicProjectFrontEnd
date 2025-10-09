import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import BackgroundAnimation from '../Components/BackgroundAnimation';
import Header from '../Components/Header';
import '../assets/GenrePage.css';
import { searchTracksByGenre } from '../services/itunesApi';
import { getTopArtists } from '../services/lastfmapi';

export default function GenrePage() {
  const { genreName } = useParams();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [playingTrack, setPlayingTrack] = useState(null);
  const [audioRef, setAudioRef] = useState(null);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  // Genre configurations
  const genreConfig = {
    pop: {
      name: 'Pop',
      emoji: '🎤',
      color: '#FF6B9D',
      gradient: 'from-pink-500 to-rose-500',
      description: 'The hottest pop hits right now',
      tags: ['pop', 'top 40', 'mainstream'],
      relatedGenres: ['dance', 'electronic', 'indie']
    },
    rock: {
      name: 'Rock',
      emoji: '🎸',
      color: '#C23B22',
      gradient: 'from-red-700 to-orange-600',
      description: 'Rock legends and modern rock hits',
      tags: ['rock', 'alternative', 'indie rock'],
      relatedGenres: ['metal', 'punk', 'grunge']
    },
    jazz: {
      name: 'Jazz',
      emoji: '🎷',
      color: '#FFA500',
      gradient: 'from-yellow-500 to-orange-500',
      description: 'Smooth jazz and classic masterpieces',
      tags: ['jazz', 'smooth jazz', 'bebop'],
      relatedGenres: ['blues', 'soul', 'funk']
    },
    classical: {
      name: 'Classical',
      emoji: '🎻',
      color: '#9B59B6',
      gradient: 'from-purple-600 to-indigo-600',
      description: 'Timeless classical compositions',
      tags: ['classical', 'orchestra', 'symphony'],
      relatedGenres: ['opera', 'baroque', 'romantic']
    },
    'hip-hop': {
      name: 'Hip Hop',
      emoji: '🎧',
      color: '#3498DB',
      gradient: 'from-blue-500 to-cyan-500',
      description: 'Top hip hop and rap tracks',
      tags: ['hip hop', 'rap', 'trap'],
      relatedGenres: ['r&b', 'trap', 'drill']
    },
    edm: {
      name: 'EDM',
      emoji: '🎛️',
      color: '#E74C3C',
      gradient: 'from-red-500 to-pink-500',
      description: 'Electronic dance music anthems',
      tags: ['edm', 'house', 'techno'],
      relatedGenres: ['house', 'dubstep', 'trance']
    },
    rnb: {
      name: 'R&B',
      emoji: '🎹',
      color: '#1ABC9C',
      gradient: 'from-teal-500 to-green-500',
      description: 'Smooth R&B and soul music',
      tags: ['r&b', 'soul', 'neo soul'],
      relatedGenres: ['soul', 'funk', 'hip-hop']
    },
    country: {
      name: 'Country',
      emoji: '🤠',
      color: '#F39C12',
      gradient: 'from-yellow-600 to-orange-600',
      description: 'Country classics and modern hits',
      tags: ['country', 'folk', 'bluegrass'],
      relatedGenres: ['folk', 'americana', 'bluegrass']
    }
  };

  const currentGenre = genreConfig[genreName] || genreConfig.pop;

  useEffect(() => {
    fetchGenreData();
  }, [genreName]);

  const fetchGenreData = async () => {
    setLoading(true);
    
    // Fetch tracks
    const tracksData = await searchTracksByGenre(currentGenre.name, 50);
    setTracks(tracksData);
    
    // Fetch artists (simulated - using top artists)
    const artistsData = await getTopArtists(12);
    setArtists(artistsData);
    
    setLoading(false);
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
      const audio = new Audio(track.previewUrl);
      audio.play();
      audio.onended = () => setPlayingTrack(null);
      setAudioRef(audio);
      setPlayingTrack(track);
    }
  };

  const formatDuration = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds.padStart(2, '0')}`;
  };

  const relatedGenres = currentGenre.relatedGenres.map(genre => {
    const relatedConfig = genreConfig[genre] || genreConfig[genre.replace(' ', '-')];
    return relatedConfig ? { ...relatedConfig, slug: genre } : null;
  }).filter(Boolean);

  return (
    <div className="genre-page">
      <BackgroundAnimation />
      <Header isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout} />
      
      <div className="genre-container">
        {/* Genre Hero */}
        <section 
          className="genre-hero"
          style={{ 
            background: `linear-gradient(135deg, ${currentGenre.color}, ${currentGenre.color}dd)`
          }}
        >
          <div className="genre-hero-content">
            <div className="genre-icon-large">{currentGenre.emoji}</div>
            <h1>{currentGenre.name} Music</h1>
            <p>{currentGenre.description}</p>
            <div className="genre-tags">
              {currentGenre.tags.map((tag, index) => (
                <span key={index} className="genre-tag">#{tag}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Loading */}
        {loading && (
          <div className="loading-section">
            <div className="loading-spinner">🎵</div>
            <p>Đang tải {currentGenre.name} tracks...</p>
          </div>
        )}

        {!loading && (
          <>
            {/* Top Tracks Section */}
            <section className="genre-section">
              <div className="section-header">
                <h2>🔥 Top {currentGenre.name} Tracks</h2>
                <p>{tracks.length} bài hát</p>
              </div>
              
              <div className="tracks-grid-genre">
                {tracks.slice(0, 12).map((track, index) => (
                  <div key={track.trackId} className="track-card-genre">
                    <div className="track-rank-genre">#{index + 1}</div>
                    <div className="track-cover-wrapper-genre">
                      <img 
                        src={track.artworkUrl100} 
                        alt={track.trackName}
                        className="track-cover-genre"
                      />
                      <div className="track-overlay-genre">
                        <button 
                          className="play-overlay-btn-genre"
                          onClick={() => handlePlayPause(track)}
                        >
                          {playingTrack?.trackId === track.trackId ? '⏸' : '▶'}
                        </button>
                      </div>
                    </div>
                    <div className="track-info-genre">
                      <h3>{track.trackName}</h3>
                      <p>{track.artistName}</p>
                      <span className="track-duration-genre">
                        {formatDuration(track.trackTimeMillis)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Popular Artists Section */}
            <section className="genre-section artists-section">
              <div className="section-header">
                <h2>👥 Popular {currentGenre.name} Artists</h2>
                <p>Nghệ sĩ nổi bật</p>
              </div>
              
              <div className="artists-grid-genre">
                {artists.slice(0, 6).map((artist, index) => {
                  const hasValidImage = artist.image?.[2]?.['#text'] && 
                    !artist.image[2]['#text'].includes('2a96cbd8b46e442fc41c2b86b821562f');
                  
                  return (
                    <div key={artist.mbid || index} className="artist-card-genre">
                      <div className="artist-avatar-genre">
                        {hasValidImage ? (
                          <img src={artist.image[2]['#text']} alt={artist.name} />
                        ) : (
                          <img 
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(artist.name)}&size=200&background=random&color=fff&bold=true`}
                            alt={artist.name}
                          />
                        )}
                      </div>
                      <h3>{artist.name}</h3>
                      <button className="follow-btn-genre">+ Theo dõi</button>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Playlists Section */}
            <section className="genre-section playlists-section">
              <div className="section-header">
                <h2>📝 {currentGenre.name} Playlists</h2>
                <p>Playlist được tuyển chọn</p>
              </div>
              
              <div className="playlists-grid-genre">
                {[
                  { name: `Best of ${currentGenre.name}`, count: 100, icon: '🔥' },
                  { name: `${currentGenre.name} Classics`, count: 75, icon: '⭐' },
                  { name: `New ${currentGenre.name} Releases`, count: 50, icon: '🎉' },
                  { name: `${currentGenre.name} Workout`, count: 60, icon: '💪' },
                ].map((playlist, index) => (
                  <div key={index} className="playlist-card-genre" style={{ background: currentGenre.color }}>
                    <div className="playlist-icon-genre">{playlist.icon}</div>
                    <h3>{playlist.name}</h3>
                    <p>{playlist.count} bài hát</p>
                    <button className="play-playlist-btn">▶ Phát</button>
                  </div>
                ))}
              </div>
            </section>

            {/* Related Genres Section */}
            <section className="genre-section related-section">
              <div className="section-header">
                <h2>🎵 Bạn có thể thích</h2>
                <p>Các thể loại tương tự</p>
              </div>
              
              <div className="related-genres-grid">
                {relatedGenres.map((genre, index) => (
                  <Link 
                    key={index}
                    to={`/genre/${genre.slug}`}
                    className="related-genre-card"
                    style={{ background: genre.color }}
                  >
                    <span className="related-genre-emoji">{genre.emoji}</span>
                    <span className="related-genre-name">{genre.name}</span>
                  </Link>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
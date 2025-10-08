import '../assets/PlaylistSection.css';
import PlaylistCard from './PlaylistCard';

export default function Playlist() {
  const playlists = [
    { id: 1, icon: '🎧', title: 'Chill Vibes', songCount: 50, duration: '3.2 giờ', gradient: 'gradient-1' },
    { id: 2, icon: '🎹', title: 'Top Hits 2024', songCount: 100, duration: '6.5 giờ', gradient: 'gradient-2' },
    { id: 3, icon: '🎤', title: 'Acoustic Cafe', songCount: 35, duration: '2.8 giờ', gradient: 'gradient-3' },
    { id: 4, icon: '🎼', title: 'Night Jazz', songCount: 45, duration: '4.1 giờ', gradient: 'gradient-4' },
  ];

  return (
    <section className="playlist-section">
      <h2>Playlist Nổi Bật</h2>
      <div className="songs-grid">
        {playlists.map((playlist) => (
          <PlaylistCard key={playlist.id} {...playlist} />
        ))}
      </div>
    </section>
  );
}
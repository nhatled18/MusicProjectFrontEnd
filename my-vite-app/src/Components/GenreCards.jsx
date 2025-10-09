import { Link } from 'react-router-dom';
import '../assets/GenreCards.css';

export default function GenreCards() {
  const genres = [
    { id: 'pop', name: 'Pop', emoji: '🎤', color: '#FF6B9D' },
    { id: 'rock', name: 'Rock', emoji: '🎸', color: '#C23B22' },
    { id: 'jazz', name: 'Jazz', emoji: '🎷', color: '#FFA500' },
    { id: 'classical', name: 'Classical', emoji: '🎻', color: '#9B59B6' },
    { id: 'hip-hop', name: 'Hip Hop', emoji: '🎧', color: '#3498DB' },
    { id: 'edm', name: 'EDM', emoji: '🎛️', color: '#E74C3C' },
    { id: 'rnb', name: 'R&B', emoji: '🎹', color: '#1ABC9C' },
    { id: 'country', name: 'Country', emoji: '🤠', color: '#F39C12' },
  ];

  return (
    <section className="genre-cards-section">
      <h2>Thể Loại</h2>
      <div className="genre-cards-grid">
        {genres.map(genre => (
          <Link
            key={genre.id}
            to={`/genre/${genre.id}`}
            className="genre-card"
            style={{ background: genre.color }}
          >
            <span className="genre-card-emoji">{genre.emoji}</span>
            <span className="genre-card-name">{genre.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
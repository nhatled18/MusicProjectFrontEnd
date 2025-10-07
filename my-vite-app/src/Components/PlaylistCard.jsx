import '../assets/PlaylistCard.css';
export default function PlaylistCard({ icon, title, songCount, duration, gradient }) {
  return (
    <div className="song-card">
      <div className={`song-card-img ${gradient}`}>
        {icon}
      </div>
      <h3>{title}</h3>
      <p>{songCount} bài hát • {duration}</p>
    </div>
  );
}
import '../assets/MusicPlayer.css';

export default function MusicPlayer() {
  return (
    <section className="player-section">
      <div className="player-container">
        <div className="now-playing">
          <div className="album-art">🎸</div>
          <div className="song-info">
            <h2>Summer Vibes</h2>
            <p>The Wave Band</p>
          </div>
          <div className="progress-bar">
            <div className="progress"></div>
          </div>
          <div className="controls">
            <button className="control-btn">⏮️</button>
            <button className="control-btn play-btn">▶️</button>
            <button className="control-btn">⏭️</button>
          </div>
        </div>
      </div>
    </section>
  );
}
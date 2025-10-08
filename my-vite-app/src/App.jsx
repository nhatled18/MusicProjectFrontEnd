import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Discover from './Pages/Discover'
import Artist from './Pages/Artist'
import PlaylistPage from './Pages/Playlist'

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/artist" element={<Artist />} />
          <Route path="/playlist" element={<PlaylistPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
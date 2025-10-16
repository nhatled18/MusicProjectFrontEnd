import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Discover from './Pages/Discover'
import Artist from './Pages/Artist'
import PlaylistPage from './Pages/Playlist'
import Login from './Pages/Login'
import Register from './Pages/Register'
import ForgotPassword from './Pages/ForgotPassword'
import ResetPassword from './Pages/ResetPassword'
import GenrePage from './Pages/GenrePage'
import Terms from './Pages/Terms'
import Privacy from './Pages/Privacy'
import FavoritePage from './Pages/FavoritePage';


function App() {
  return (
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/artist" element={<Artist />} />
            <Route path="/playlist" element={<PlaylistPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/genre/:genreName" element={<GenrePage />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/favorites" element={<FavoritePage />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App
import { useState } from 'react';
import BackgroundAnimation from '../Components/BackgroundAnimation';
import Header from '../Components/Header';
import Hero from '../Components/Hero';
import MusicPlayer from '../Components/MusicPlayer';
import Playlist from '../Components/PlaylistSection';
import Notification from '../Components/Notification';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notification, setNotification] = useState(null);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    showNotification('Đăng nhập thành công! 🎉');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    showNotification('Đã đăng xuất. Hẹn gặp lại! 👋');
  };

  return (
    <>
      <BackgroundAnimation />
      <Header 
        isLoggedIn={isLoggedIn} 
        onLogin={handleLogin} 
        onLogout={handleLogout} 
      />
      <Hero />
      <MusicPlayer />
      <Playlist />
      
      {notification && <Notification message={notification} />}
    </>
  );
}
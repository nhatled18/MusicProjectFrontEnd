// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { FavoriteProvider } from './context/FavoriteContext';
import { FollowProvider } from './context/FollowContext';
createRoot(document.getElementById('root')).render(
  <FollowProvider>
    <FavoriteProvider>
      <App />
    </FavoriteProvider>
  </FollowProvider>
)

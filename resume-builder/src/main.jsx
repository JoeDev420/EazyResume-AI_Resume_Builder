import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './components/AuthContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

// Fire before React mounts so the Render backend starts waking up immediately.
// If the backend takes > 3s (Render free-tier cold start), show a toast-style banner.
const warmupTimer = setTimeout(() => {
  const banner = document.createElement('div');
  banner.id = 'warmup-banner';
  banner.style.cssText = 'position:fixed;bottom:16px;left:50%;transform:translateX(-50%);background:#1e293b;color:#f1f5f9;padding:10px 18px;border-radius:999px;font-size:13px;font-family:sans-serif;z-index:9999;box-shadow:0 4px 12px rgba(0,0,0,0.2);white-space:nowrap;';
  banner.textContent = '⏳ Server is waking up — this takes about 30s on first visit';
  document.body.appendChild(banner);
}, 3000);

fetch(`${import.meta.env.VITE_API_URL}/user/verification`, { credentials: 'include' })
  .finally(() => {
    clearTimeout(warmupTimer);
    const banner = document.getElementById('warmup-banner');
    if (banner) banner.remove();
  });

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId="853140440626-3d274h34fhv882cm2ri8116g9gerioqf.apps.googleusercontent.com">
      <AuthProvider>
        <App />
      </AuthProvider>
    </GoogleOAuthProvider>
  </BrowserRouter>
);

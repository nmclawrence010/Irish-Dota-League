import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { SignupPage } from './pages/SignupPage';
import { RostersPage } from './pages/RostersPage';
import { JoinTeamPage } from './pages/JoinTeamPage';
import { MyTeamPage } from './pages/MyTeamPage';
import { useThemeStore } from './store/themeStore';
import { LFTPage } from './pages/LFTPage';
import { ImprintPage } from './pages/ImprintPage';

function App() {
  const isDark = useThemeStore((state) => state.isDark);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/join" element={<JoinTeamPage />} />
            <Route path="/rosters" element={<RostersPage />} />
            <Route path="/my-team" element={<MyTeamPage />} />
            <Route path="/lft" element={<LFTPage />} />
            <Route path="/imprint" element={<ImprintPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Auth0Provider>
  );
}

export default App;
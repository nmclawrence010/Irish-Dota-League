import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

createRoot(rootElement).render(
  <StrictMode>
    <Auth0Provider
    domain="YOUR_AUTH0_DOMAIN"
    clientId="YOUR_CLIENT_ID"
    authorizationParams={{
    redirect_uri: window.location.origin
    }}
    >
      <App />
    </Auth0Provider>
  </StrictMode>
);
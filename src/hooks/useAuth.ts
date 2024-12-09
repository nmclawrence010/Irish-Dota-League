import { useAuth0 } from '@auth0/auth0-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useEffect } from 'react';

export const useAuth = () => {
  const { isAuthenticated, user, setAuth, clearAuth } = useAuthStore();
  const auth0 = useAuth0();

  useEffect(() => {
    if (auth0.isAuthenticated && auth0.user) {
      setAuth(true, auth0.user);
    } else {
      clearAuth();
    }
  }, [auth0.isAuthenticated, auth0.user]);

  return {
    isAuthenticated,
    user,
    login: auth0.loginWithRedirect,
    logout: auth0.logout,
    // Add any other auth-related functions you need
  };
};
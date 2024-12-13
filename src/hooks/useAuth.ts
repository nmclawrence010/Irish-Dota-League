import { useAuth0 } from "@auth0/auth0-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";

export const useAuth = () => {
  const { isAuthenticated, user, setAuth, clearAuth } = useAuthStore();
  const auth0 = useAuth0();

  useEffect(() => {
    if (auth0.isAuthenticated && auth0.user) {
      setAuth(true, auth0.user);
    } else if (!auth0.isLoading) {
      clearAuth();
    }
  }, [auth0.isAuthenticated, auth0.user, auth0.isLoading]);

  return {
    isAuthenticated,
    user,
    isLoading: auth0.isLoading,
    login: auth0.loginWithRedirect,
    logout: auth0.logout,
  };
};

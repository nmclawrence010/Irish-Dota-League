import { useAuth0 } from "@auth0/auth0-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useState } from "react";
import { signSupabaseToken } from "@/lib/auth";

export const useAuth = () => {
  const { isAuthenticated, user, setAuth, clearAuth } = useAuthStore();
  const auth0 = useAuth0();
  const [supabaseToken, setSupabaseToken] = useState<string | null>(null);

  useEffect(() => {
    const setToken = async () => {
      if (auth0.isAuthenticated && auth0.user && auth0.user.sub) {
        const token = await signSupabaseToken({ sub: auth0.user.sub });
        setSupabaseToken(token);
        setAuth(true, auth0.user);
      } else if (!auth0.isLoading) {
        setSupabaseToken(null);
        clearAuth();
      }
    };
    
    setToken();
  }, [auth0.isAuthenticated, auth0.user, auth0.isLoading]);

  return {
    isAuthenticated,
    user,
    supabaseToken,
    isLoading: auth0.isLoading,
    login: auth0.loginWithRedirect,
    logout: auth0.logout,
  };
};

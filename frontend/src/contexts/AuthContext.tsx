import { createContext, useEffect, useState } from "react";
import supabase from "../utils/supabase";
import { Session, User } from "@supabase/supabase-js";
import axios from "../utils/axios";

const AuthContext = createContext<{
  session: Session | null;
  user: User | null;
}>({
  session: null,
  user: null,
});

const AuthProvider = ({
  children
} : {
  children: React.ReactNode
}) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session && session.user) {
        setUser(session.user);
      }
    })
    
    const authStateListener = supabase.auth.onAuthStateChange(
      async (_, session) => {
        setSession(session);
        if (session && session.user) {
          setUser(session.user);
        }
      }
    );

    return () => {
      authStateListener.data.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const interceptorId = axios.interceptors.request.use(
      function (config) {
        const accessToken = session?.access_token;
        const refreshToken = session?.refresh_token;

        config.headers = config.headers ?? {};
    
        if (accessToken && refreshToken) {
          config.headers.Authorization = 'Bearer ' + accessToken;
          config.headers.RefreshToken = refreshToken;
        }
    
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(interceptorId);
    };
  }, [session]);

  return (
    <AuthContext.Provider value={{ session, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
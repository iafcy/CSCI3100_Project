import { createContext, useEffect, useState } from "react";
import supabase from "../utils/supabase";
import { Session, User } from "@supabase/supabase-js";

const AuthContext = createContext<{
  session: Session | null;
  user: User | null;
  authenticated: boolean;
}>({
  session: null,
  user: null,
  authenticated: false,
});

const AuthProvider = ({
  children
} : {
  children: React.ReactNode
}) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      console.log(session)
      if (session && !authenticated) {
        setAuthenticated(true);
      } else if (!session && authenticated) {
        setAuthenticated(false);
      }
    })
    
    const authStateListener = supabase.auth.onAuthStateChange(
      async (_, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session && !authenticated) {
          setAuthenticated(true);
        } else if (!session && authenticated) {
          setAuthenticated(false);
        }
      }
    );

    return () => {
      authStateListener.data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, user, authenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
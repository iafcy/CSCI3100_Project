import { createContext, useEffect, useState } from "react";
import supabase from "../utils/supabase";
import { Session, User } from "@supabase/supabase-js";

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
      setUser(session?.user ?? null);
    })
    
    const authStateListener = supabase.auth.onAuthStateChange(
      async (_, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authStateListener.data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
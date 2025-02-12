
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  session: Session | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ session: null, loading: true });

// Define which routes require authentication
const protectedRoutes = ['/admin'];

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
      
      // Check if current route needs auth
      const needsAuth = protectedRoutes.some(route => location.pathname.startsWith(route));
      if (needsAuth && !session) {
        navigate('/auth', { state: { from: location.pathname } });
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      
      // Check if current route needs auth
      const needsAuth = protectedRoutes.some(route => location.pathname.startsWith(route));
      if (needsAuth && !session) {
        navigate('/auth', { state: { from: location.pathname } });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, location]);

  return (
    <AuthContext.Provider value={{ session, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

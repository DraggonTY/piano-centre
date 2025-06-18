
import { useState, useEffect } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { supabase } from "@/integrations/supabase/client";

export const useAdminStatus = () => {
  const { session } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      console.log("Checking admin status...");
      console.log("Session user ID:", session?.user?.id);
      setIsAdmin(false);
      if (!session?.user?.id) {
        console.log("No user session found");
        return;
      }
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .eq('role', 'admin')
        .single();
      console.log("Admin check response:", { data, error });
      if (!error && data) {
        console.log("User is admin");
        setIsAdmin(true);
      } else {
        console.log("User is not admin or error occurred");
      }
    };
    checkAdminStatus();
  }, [session?.user?.id]);

  return isAdmin;
};

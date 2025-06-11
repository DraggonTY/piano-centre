import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { PianosMenuItem, ServicesMenuItem, ContactMenuItem } from "./NavigationMenuItems";

interface DesktopHeaderProps {
  session: Session | null;
}

export const DesktopHeader = ({ session }: DesktopHeaderProps) => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <>
      {/* Desktop Layout: Keep existing layout */}
      <div className="flex-1">
        <NavigationMenu>
          <NavigationMenuList>
            <PianosMenuItem />
            <ServicesMenuItem />
            <ContactMenuItem />
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      
      <div className="flex-1 flex justify-center">
        <Link to="/" className="block">
          <img
            src="/lovable-uploads/eb5aeada-3cd1-446e-8bce-a0352f51efca.png"
            alt="Piano Centre Edmonton"
            className="h-24"
          />
        </Link>
      </div>
      
      <div className="flex-1 flex justify-end">
        {session && (
          <Button variant="outline" onClick={handleLogout}>
            Sign Out
          </Button>
        )}
      </div>
    </>
  );
};

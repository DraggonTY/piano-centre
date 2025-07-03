
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";

interface MobileHeaderProps {
  session: Session | null;
  onMenuToggle: () => void;
}

export const MobileHeader = ({ session, onMenuToggle }: MobileHeaderProps) => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <>
      {/* Mobile Layout: Hamburger menu on left, logo centered, sign out on right */}
      <div className="flex items-center w-16">
        <Button
          variant="ghost"
          size="sm"
          onClick={onMenuToggle}
          className="p-2 hover:bg-gray-100 transition-colors duration-200"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>
      
      <div className="flex justify-center flex-1">
        <Link to="/" className="block">
          <img
            src="/piano-uploads/96414221-6d22-4e38-bd12-abcb86467660.png"
            alt="Piano Centre Edmonton"
            className="h-28"
          />
        </Link>
      </div>
      
      <div className="flex items-center justify-end w-16">
        {session && (
          <Button variant="outline" onClick={handleLogout} size="sm">
            Sign Out
          </Button>
        )}
      </div>
    </>
  );
};


import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/AuthProvider";
import { useState, useEffect } from "react";
import { MobileHeader } from "./MobileHeader";
import { DesktopHeader } from "./DesktopHeader";
import { MobileMenu } from "./MobileMenu";

export const Header = () => {
  const isMobile = useIsMobile();
  const { session } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dispatch custom event when mobile menu state changes
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('mobileMenuToggle', { 
      detail: { isOpen: mobileMenuOpen } 
    }));
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white border-b border-gray-200 fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 py-2">
        <nav className={cn(
          "flex items-center",
          isMobile ? "justify-between" : "justify-between"
        )}>
          {isMobile ? (
            <MobileHeader 
              session={session} 
              onMenuToggle={toggleMobileMenu}
            />
          ) : (
            <DesktopHeader session={session} />
          )}
        </nav>
      </div>
      
      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={mobileMenuOpen}
        onClose={closeMobileMenu}
        session={session}
      />
    </header>
  );
};

import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, X } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const ListItem = ({ className, title, href, children }: {
  className?: string;
  title: string;
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};

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

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <nav className={cn(
          "flex items-center",
          isMobile ? "justify-between" : "justify-between"
        )}>
          {isMobile ? (
            <>
              {/* Mobile Layout: Hamburger menu on left, logo centered, sign out on right */}
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </div>
              
              <div className="flex justify-center">
                <Link to="/" className="block">
                  <img
                    src="/lovable-uploads/96414221-6d22-4e38-bd12-abcb86467660.png"
                    alt="Piano Centre Edmonton"
                    className="h-16"
                  />
                </Link>
              </div>
              
              <div className="flex items-center">
                {session && (
                  <Button variant="outline" onClick={handleLogout} size="sm">
                    Sign Out
                  </Button>
                )}
              </div>

              {/* Full Screen Mobile Menu */}
              {mobileMenuOpen && (
                <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
                  <div className="flex flex-col h-full">
                    {/* Header with close button on left and logo centered */}
                    <div className="flex items-center p-4 border-b border-gray-200">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={closeMobileMenu}
                        className="p-2"
                      >
                        <X className="h-6 w-6" />
                      </Button>
                      <div className="flex justify-center flex-1 -ml-12">
                        <Link to="/" onClick={closeMobileMenu} className="block">
                          <img
                            src="/lovable-uploads/96414221-6d22-4e38-bd12-abcb86467660.png"
                            alt="Piano Centre Edmonton"
                            className="h-16"
                          />
                        </Link>
                      </div>
                    </div>

                    {/* Navigation items */}
                    <div className="flex-1 p-6">
                      <div className="space-y-8">
                        {/* Pianos Section */}
                        <div>
                          <h3 className="text-xl font-semibold mb-4">Pianos</h3>
                          <div className="space-y-4">
                            <Link 
                              to="/pianos" 
                              onClick={closeMobileMenu}
                              className="block text-lg text-gray-700 hover:text-primary"
                            >
                              Browse Pianos
                            </Link>
                            <Link 
                              to="/pianos/new" 
                              onClick={closeMobileMenu}
                              className="block text-lg text-gray-700 hover:text-primary"
                            >
                              New Arrivals
                            </Link>
                            <Link 
                              to="/pianos/used" 
                              onClick={closeMobileMenu}
                              className="block text-lg text-gray-700 hover:text-primary"
                            >
                              Pre-owned
                            </Link>
                            <Link 
                              to="/pianos/digital" 
                              onClick={closeMobileMenu}
                              className="block text-lg text-gray-700 hover:text-primary"
                            >
                              Digital Pianos
                            </Link>
                          </div>
                        </div>

                        {/* Services Section */}
                        <div>
                          <h3 className="text-xl font-semibold mb-4">Services</h3>
                          <div className="space-y-4">
                            <Link 
                              to="/services/tuning" 
                              onClick={closeMobileMenu}
                              className="block text-lg text-gray-700 hover:text-primary"
                            >
                              Piano Tuning
                            </Link>
                            <Link 
                              to="/services/repair" 
                              onClick={closeMobileMenu}
                              className="block text-lg text-gray-700 hover:text-primary"
                            >
                              Repairs & Restoration
                            </Link>
                            <Link 
                              to="/services/moving" 
                              onClick={closeMobileMenu}
                              className="block text-lg text-gray-700 hover:text-primary"
                            >
                              Piano Moving
                            </Link>
                          </div>
                        </div>

                        {/* Contact */}
                        <div>
                          <Link 
                            to="/contact" 
                            onClick={closeMobileMenu}
                            className="block text-xl font-semibold text-gray-900 hover:text-primary"
                          >
                            Contact
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Sign out button at bottom if logged in */}
                    {session && (
                      <div className="p-6 border-t border-gray-200">
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            handleLogout();
                            closeMobileMenu();
                          }}
                          className="w-full"
                        >
                          Sign Out
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Desktop Layout: Keep existing layout */}
              <div className="flex-1">
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Pianos</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          <ListItem href="/pianos" title="Browse Pianos">
                            Explore our collection of quality pianos
                          </ListItem>
                          <ListItem href="/pianos/new" title="New Arrivals">
                            See our latest piano additions
                          </ListItem>
                          <ListItem href="/pianos/used" title="Pre-owned">
                            Quality pre-owned pianos
                          </ListItem>
                          <ListItem href="/pianos/digital" title="Digital Pianos">
                            Browse digital piano options
                          </ListItem>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
                          <ListItem href="/services/tuning" title="Piano Tuning">
                            Professional piano tuning services
                          </ListItem>
                          <ListItem href="/services/repair" title="Repairs & Restoration">
                            Expert piano repair and restoration
                          </ListItem>
                          <ListItem href="/services/moving" title="Piano Moving">
                            Safe and professional piano moving
                          </ListItem>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <Link to="/contact" className={navigationMenuTriggerStyle()}>
                        Contact
                      </Link>
                    </NavigationMenuItem>
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
          )}
        </nav>
      </div>
    </header>
  );
};

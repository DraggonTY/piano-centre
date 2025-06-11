import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="bg-white border-b border-gray-200 fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <nav className={cn(
          "flex items-center",
          isMobile ? "flex-col space-y-4" : "justify-between"
        )}>
          {isMobile ? (
            <>
              {/* Mobile Layout: Navigation stacked on left, logo centered */}
              <div className="w-full flex justify-between items-center">
                <div className="flex-1">
                  <NavigationMenu>
                    <NavigationMenuList className="flex-col space-y-2 space-x-0">
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
                      src="/lovable-uploads/96414221-6d22-4e38-bd12-abcb86467660.png"
                      alt="Piano Centre Edmonton"
                      className="h-16"
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
              </div>
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

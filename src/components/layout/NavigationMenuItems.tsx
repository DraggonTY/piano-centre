
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";

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

export const PianosMenuItem = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <HoverCard openDelay={100} closeDelay={300}>
      <HoverCardTrigger asChild>
        <NavigationMenuItem
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <NavigationMenuTrigger>
            Pianos
          </NavigationMenuTrigger>
        </NavigationMenuItem>
      </HoverCardTrigger>
      <HoverCardContent 
        className="w-[500px] p-4 bg-white border shadow-lg z-50"
        sideOffset={5}
      >
        <ul className="grid gap-3 md:grid-cols-2">
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
      </HoverCardContent>
    </HoverCard>
  );
};

export const ServicesMenuItem = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <HoverCard openDelay={100} closeDelay={300}>
      <HoverCardTrigger asChild>
        <NavigationMenuItem
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <NavigationMenuTrigger>
            Services
          </NavigationMenuTrigger>
        </NavigationMenuItem>
      </HoverCardTrigger>
      <HoverCardContent 
        className="w-[500px] p-4 bg-white border shadow-lg z-50"
        sideOffset={5}
      >
        <ul className="grid gap-3">
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
      </HoverCardContent>
    </HoverCard>
  );
};

export const ContactMenuItem = () => (
  <NavigationMenuItem>
    <Link to="/contact" className={navigationMenuTriggerStyle()}>
      Contact
    </Link>
  </NavigationMenuItem>
);

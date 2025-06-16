
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
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

export const PianosMenuItem = () => (
  <NavigationMenuItem>
    <NavigationMenuTrigger 
      className="group-hover/services:opacity-30 transition-opacity duration-200"
    >
      Pianos
    </NavigationMenuTrigger>
    <NavigationMenuContent className="group-hover/services:opacity-0 transition-opacity duration-200">
      <ul className="grid w-[500px] gap-3 p-4 md:grid-cols-2">
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
);

export const ServicesMenuItem = () => (
  <NavigationMenuItem className="group/services">
    <NavigationMenuTrigger 
      className="group-hover/pianos:opacity-30 transition-opacity duration-200"
    >
      Services
    </NavigationMenuTrigger>
    <NavigationMenuContent className="group-hover/pianos:opacity-0 transition-opacity duration-200">
      <ul className="grid w-[500px] gap-3 p-4">
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
);

export const ContactMenuItem = () => (
  <NavigationMenuItem>
    <Link to="/contact" className={navigationMenuTriggerStyle()}>
      Contact
    </Link>
  </NavigationMenuItem>
);

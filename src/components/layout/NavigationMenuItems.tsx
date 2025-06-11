
import { Link } from "react-router-dom";
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
);

export const ServicesMenuItem = () => (
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
);

export const ContactMenuItem = () => (
  <NavigationMenuItem>
    <Link to="/contact" className={navigationMenuTriggerStyle()}>
      Contact
    </Link>
  </NavigationMenuItem>
);

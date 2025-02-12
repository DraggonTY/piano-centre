
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

export const Header = () => {
  const isMobile = useIsMobile();

  return (
    <header className="bg-white border-b border-gray-200 fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex justify-between items-center">
          <div className="flex-1">
            {/* Left section - can be used for navigation items */}
          </div>
          
          <div className="flex-1 flex justify-center">
            <Link to="/" className="block">
              <img
                src={isMobile ? "/lovable-uploads/96414221-6d22-4e38-bd12-abcb86467660.png" : "/lovable-uploads/eb5aeada-3cd1-446e-8bce-a0352f51efca.png"}
                alt="Piano Centre Edmonton"
                className={isMobile ? "h-16" : "h-24"}
              />
            </Link>
          </div>
          
          <div className="flex-1 flex justify-end">
            {/* Right section - can be used for auth buttons */}
          </div>
        </nav>
      </div>
    </header>
  );
};

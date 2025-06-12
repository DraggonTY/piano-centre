
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HeroContent } from "./types";

interface HeroButtonsProps {
  heroContent: HeroContent;
}

export const HeroButtons = ({ heroContent }: HeroButtonsProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
      <Link to={heroContent.viewCollectionLink}>
        <Button 
          size="lg" 
          className="border-2 border-black bg-black text-white hover:bg-gray-800 hover:border-gray-800 transition-all duration-300 px-8 hover:scale-105"
        >
          {heroContent.viewCollectionText}
        </Button>
      </Link>
      <Link to={heroContent.scheduleVisitLink}>
        <Button 
          size="lg" 
          variant="outline" 
          className="border-2 border-white bg-white text-black hover:bg-gray-300 hover:border-gray-300 transition-all duration-300 hover:scale-105"
        >
          {heroContent.scheduleVisitText}
        </Button>
      </Link>
    </div>
  );
};


import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Piano } from "@/types/piano";

interface PianoCardContentProps {
  piano: Piano;
  onViewDetails: () => void;
}

export const PianoCardContent = ({ piano, onViewDetails }: PianoCardContentProps) => {
  const truncateDescription = (text: string | null, maxLength: number = 100) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <>
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold mb-2">{piano.name}</CardTitle>
        <CardDescription className="text-2xl font-bold text-black">
          ${piano.price.toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-4 flex-1">
        <div className="space-y-2">
          {piano.condition && (
            <p className="text-base">
              <span className="font-medium">Condition:</span> {piano.condition}
            </p>
          )}
          {piano.type && (
            <p className="text-base">
              <span className="font-medium">Type:</span> {piano.type}
            </p>
          )}
          {piano.description && (
            <p className="text-gray-600 mt-3 text-sm leading-relaxed">
              <span className="font-medium">Description:</span> {truncateDescription(piano.description)}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button className="w-full bg-black hover:bg-gray-800 text-white" size="lg">
          View Details
        </Button>
      </CardFooter>
    </>
  );
};

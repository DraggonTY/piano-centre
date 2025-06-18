
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Piano } from "@/types/piano";

interface PianoCardContentProps {
  piano: Piano;
  onViewDetails: () => void;
}

export const PianoCardContent = ({ piano, onViewDetails }: PianoCardContentProps) => {
  const truncateDescription = (text: string | null, maxLength: number = 200) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <>
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold">{piano.name}</CardTitle>
          <CardDescription className="text-xl font-bold text-black">
            ${piano.price.toLocaleString()}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pb-4 flex-1">
        <div className="space-y-2">
          {piano.condition && (
            <p className="text-sm">
              <span className="font-medium">Condition:</span> {piano.condition}
            </p>
          )}
          {piano.type && (
            <p className="text-sm">
              <span className="font-medium">Type:</span> {piano.type}
            </p>
          )}
          {piano.description && (
            <p className="text-gray-600 mt-3 text-sm leading-relaxed">
              {truncateDescription(piano.description)}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button className="w-full bg-black hover:bg-gray-800 text-white" size="lg" onClick={onViewDetails}>
          View Details
        </Button>
      </CardFooter>
    </>
  );
};

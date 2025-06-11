
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Piano } from "@/types/piano";

interface PianoCardContentProps {
  piano: Piano;
  onViewDetails: () => void;
}

export const PianoCardContent = ({ piano, onViewDetails }: PianoCardContentProps) => {
  return (
    <>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg leading-tight">{piano.name}</CardTitle>
        <CardDescription className="text-lg font-semibold text-primary">
          ${piano.price.toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-3 flex-1">
        <div className="space-y-1 text-sm">
          {piano.condition && (
            <p>
              <span className="font-medium">Condition:</span> {piano.condition}
            </p>
          )}
          {piano.type && (
            <p>
              <span className="font-medium">Type:</span> {piano.type}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button className="w-full" size="sm" onClick={onViewDetails}>
          View Details
        </Button>
      </CardFooter>
    </>
  );
};

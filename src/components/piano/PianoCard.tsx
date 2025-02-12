
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Piano {
  id: number;
  name: string;
  description: string | null;
  price: number;
  type: string | null;
  condition: string | null;
  image_url: string | null;
  created_at: string | null;
  manufacturer: string | null;
  model_year: string | null;
  serial_number: string | null;
  width_cm: number | null;
  height_cm: number | null;
  depth_cm: number | null;
  keyboard_keys: number | null;
  pedals: number | null;
  finish: string | null;
}

interface PianoCardProps {
  piano: Piano;
}

export const PianoCard = ({ piano }: PianoCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {piano.image_url && (
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={piano.image_url}
            alt={piano.name}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl">{piano.name}</CardTitle>
        <CardDescription className="text-lg font-semibold text-primary">
          ${piano.price.toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {piano.manufacturer && (
            <p className="text-sm">
              <span className="font-semibold">Manufacturer:</span> {piano.manufacturer}
            </p>
          )}
          {piano.model_year && (
            <p className="text-sm">
              <span className="font-semibold">Model Year:</span> {piano.model_year}
            </p>
          )}
          <p className="text-gray-600">{piano.description}</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {piano.type && (
              <p>
                <span className="font-semibold">Category:</span> {piano.type}
              </p>
            )}
            {piano.condition && (
              <p>
                <span className="font-semibold">Condition:</span> {piano.condition}
              </p>
            )}
            {piano.finish && (
              <p>
                <span className="font-semibold">Finish:</span> {piano.finish}
              </p>
            )}
            {piano.keyboard_keys && (
              <p>
                <span className="font-semibold">Keys:</span> {piano.keyboard_keys}
              </p>
            )}
            {piano.pedals && (
              <p>
                <span className="font-semibold">Pedals:</span> {piano.pedals}
              </p>
            )}
          </div>
          {(piano.width_cm || piano.height_cm || piano.depth_cm) && (
            <div className="text-sm">
              <p className="font-semibold mb-1">Dimensions:</p>
              <div className="grid grid-cols-3 gap-2">
                {piano.width_cm && (
                  <p>W: {piano.width_cm}cm</p>
                )}
                {piano.height_cm && (
                  <p>H: {piano.height_cm}cm</p>
                )}
                {piano.depth_cm && (
                  <p>D: {piano.depth_cm}cm</p>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Schedule a Viewing</Button>
      </CardFooter>
    </Card>
  );
};

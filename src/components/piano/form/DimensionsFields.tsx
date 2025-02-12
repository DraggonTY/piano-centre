
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DimensionsFieldsProps {
  width: string;
  setWidth: (value: string) => void;
  height: string;
  setHeight: (value: string) => void;
  depth: string;
  setDepth: (value: string) => void;
  keys: string;
  setKeys: (value: string) => void;
  pedals: string;
  setPedals: (value: string) => void;
}

export const DimensionsFields = ({
  width,
  setWidth,
  height,
  setHeight,
  depth,
  setDepth,
  keys,
  setKeys,
  pedals,
  setPedals,
}: DimensionsFieldsProps) => {
  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="width">Width (cm)</Label>
          <Input
            id="width"
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="height">Height (cm)</Label>
          <Input
            id="height"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="depth">Depth (cm)</Label>
          <Input
            id="depth"
            type="number"
            value={depth}
            onChange={(e) => setDepth(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="keys">Number of Keys</Label>
          <Input
            id="keys"
            type="number"
            value={keys}
            onChange={(e) => setKeys(e.target.value)}
            placeholder="e.g., 88"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pedals">Number of Pedals</Label>
          <Input
            id="pedals"
            type="number"
            value={pedals}
            onChange={(e) => setPedals(e.target.value)}
            placeholder="e.g., 3"
          />
        </div>
      </div>
    </>
  );
};

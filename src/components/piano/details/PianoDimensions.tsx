
import { Piano } from "@/types/piano";

interface PianoDimensionsProps {
  piano: Piano;
}

export const PianoDimensions = ({ piano }: PianoDimensionsProps) => {
  const hasDimensions = piano.width_cm || piano.height_cm || piano.depth_cm;

  if (!hasDimensions) return null;

  return (
    <div className="space-y-1">
      <h4 className="font-semibold text-sm sm:text-base">Dimensions</h4>
      <div className="grid grid-cols-3 gap-2 text-xs sm:text-sm">
        {piano.width_cm && (
          <div className="min-w-0">
            <span className="text-xs text-gray-500 block">Width</span>
            <p className="font-medium">{piano.width_cm}cm</p>
          </div>
        )}
        {piano.height_cm && (
          <div className="min-w-0">
            <span className="text-xs text-gray-500 block">Height</span>
            <p className="font-medium">{piano.height_cm}cm</p>
          </div>
        )}
        {piano.depth_cm && (
          <div className="min-w-0">
            <span className="text-xs text-gray-500 block">Depth</span>
            <p className="font-medium">{piano.depth_cm}cm</p>
          </div>
        )}
      </div>
    </div>
  );
};

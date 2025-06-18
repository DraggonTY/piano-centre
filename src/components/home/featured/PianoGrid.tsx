
import { Piano } from "@/types/piano";
import { PianoCard } from "./PianoCard";
import { EmptySlot } from "./EmptySlot";
import { useIsMobile } from "@/hooks/use-mobile";

interface PianoGridProps {
  pianos?: Piano[];
  isLoading: boolean;
  isAdmin: boolean;
  onEmptySlotClick: () => void;
}

export const PianoGrid = ({ pianos, isLoading, isAdmin, onEmptySlotClick }: PianoGridProps) => {
  const isMobile = useIsMobile();
  const emptySlots = 3 - (pianos?.length || 0);

  if (isLoading) {
    return (
      <div className={`grid gap-8 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-gray-50 rounded-lg p-6 animate-pulse">
            <div className="aspect-[4/3] mb-4 bg-gray-200 rounded-lg"></div>
            <div className="h-6 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`grid gap-8 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
      {pianos?.map(piano => (
        <PianoCard key={piano.id} piano={piano} />
      ))}
      {emptySlots > 0 && isAdmin && [...Array(emptySlots)].map((_, index) => (
        <EmptySlot
          key={`empty-${index}`}
          index={index}
          onClick={onEmptySlotClick}
        />
      ))}
    </div>
  );
};

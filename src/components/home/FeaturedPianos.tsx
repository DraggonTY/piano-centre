
import { Link } from "react-router-dom";
import { Piano } from "@/types/piano";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthProvider";
import { useState } from "react";
import { PianoGrid } from "./featured/PianoGrid";
import { AdminControls } from "./featured/AdminControls";
import { useAdminStatus } from "./featured/useAdminStatus";
import { useFeaturedPianos } from "./featured/useFeaturedPianos";

interface FeaturedPianosProps {
  pianos?: Piano[];
  isLoading: boolean;
  onFeaturedUpdate?: () => void;
}

export const FeaturedPianos = ({
  pianos,
  isLoading,
  onFeaturedUpdate
}: FeaturedPianosProps) => {
  const { session } = useAuth();
  const isAdmin = useAdminStatus();
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const {
    allPianos,
    selectedPianos,
    loadingPianos,
    updating,
    handleFeatureToggle,
    handlePianoSelect
  } = useFeaturedPianos(dialogOpen, onFeaturedUpdate);

  const handleSave = async () => {
    await handleFeatureToggle();
    setDialogOpen(false);
  };

  const emptySlots = 3 - (pianos?.length || 0);
  console.log("Current state:", { isAdmin, emptySlots, sessionExists: !!session, pianos: pianos?.length });

  return (
    <section className="py-24 bg-white">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl font-bold mb-4">Featured Pianos</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From classic grand pianos to modern digital instruments, discover our
            carefully selected collection.
          </p>
        </div>
        
        <PianoGrid
          pianos={pianos}
          isLoading={isLoading}
          isAdmin={isAdmin}
          onEmptySlotClick={() => setDialogOpen(true)}
        />
        
        <div className="text-center mt-12 space-y-4">
          <Link to="/pianos">
            <Button variant="outline" size="lg">
              View All Pianos
            </Button>
          </Link>
          
          <AdminControls
            isAdmin={isAdmin}
            hasSession={!!session?.user}
            dialogOpen={dialogOpen}
            onDialogOpenChange={setDialogOpen}
            allPianos={allPianos}
            selectedPianos={selectedPianos}
            onPianoSelect={handlePianoSelect}
            onSave={handleSave}
            loadingPianos={loadingPianos}
            updating={updating}
          />
        </div>
      </div>
    </section>
  );
};

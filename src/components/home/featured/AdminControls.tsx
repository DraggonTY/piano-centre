
import { Piano } from "@/types/piano";
import { FeaturedPianosDialog } from "./FeaturedPianosDialog";

interface AdminControlsProps {
  isAdmin: boolean;
  hasSession: boolean;
  dialogOpen: boolean;
  onDialogOpenChange: (open: boolean) => void;
  allPianos: Piano[];
  selectedPianos: number[];
  onPianoSelect: (pianoId: number, checked: boolean) => void;
  onSave: () => void;
  loadingPianos: boolean;
  updating: boolean;
}

export const AdminControls = ({
  isAdmin,
  hasSession,
  dialogOpen,
  onDialogOpenChange,
  allPianos,
  selectedPianos,
  onPianoSelect,
  onSave,
  loadingPianos,
  updating
}: AdminControlsProps) => {
  if (!isAdmin || !hasSession) {
    return null;
  }

  return (
    <div>
      <FeaturedPianosDialog
        open={dialogOpen}
        onOpenChange={onDialogOpenChange}
        allPianos={allPianos}
        selectedPianos={selectedPianos}
        onPianoSelect={onPianoSelect}
        onSave={onSave}
        loading={loadingPianos}
        updating={updating}
      />
    </div>
  );
};

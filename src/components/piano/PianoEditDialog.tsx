
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AddPianoForm } from "./AddPianoForm";
import { Piano } from "@/types/piano";

interface PianoEditDialogProps {
  piano: Piano;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export const PianoEditDialog = ({ piano, isOpen, onOpenChange, onSuccess }: PianoEditDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Piano Listing</DialogTitle>
        </DialogHeader>
        <AddPianoForm onSuccess={onSuccess} initialData={piano} />
      </DialogContent>
    </Dialog>
  );
};


import { Piano } from "@/types/piano";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

interface FeaturedPianosDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  allPianos: Piano[];
  selectedPianos: number[];
  onPianoSelect: (pianoId: number, checked: boolean) => void;
  onSave: () => void;
  loading: boolean;
  updating: boolean;
}

export const FeaturedPianosDialog = ({
  open,
  onOpenChange,
  allPianos,
  selectedPianos,
  onPianoSelect,
  onSave,
  loading,
  updating
}: FeaturedPianosDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="mx-auto block">
          Edit Featured Pianos
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Select Featured Pianos</DialogTitle>
          <DialogDescription>
            Choose up to 4 pianos to feature on the homepage. Selected pianos will be displayed in the order they are chosen.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : (
            <div className="space-y-4">
              {allPianos.map((piano) => (
                <div key={piano.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                  {piano.image_url && (
                    <img 
                      src={piano.image_url} 
                      alt={piano.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`piano-${piano.id}`}
                        checked={selectedPianos.includes(piano.id)}
                        onCheckedChange={(checked) => 
                          onPianoSelect(piano.id, checked as boolean)
                        }
                      />
                      <label 
                        htmlFor={`piano-${piano.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {piano.name}
                      </label>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">{piano.description}</p>
                    <p className="mt-1 text-sm font-medium">${piano.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={onSave}
            disabled={updating || loading}
          >
            {updating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

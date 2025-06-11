
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Piano } from "@/types/piano";
import { PianoCardImage } from "./PianoCardImage";
import { PianoCardContent } from "./PianoCardContent";
import { PianoDetailsDialog } from "./PianoDetailsDialog";
import { PianoEditDialog } from "./PianoEditDialog";

interface PianoCardProps {
  piano: Piano;
  onDelete?: () => void;
  onUpdate?: () => void;
}

export const PianoCard = ({ piano, onDelete, onUpdate }: PianoCardProps) => {
  const { toast } = useToast();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  // Use multiple images if available, fallback to single image_url, or empty array
  const images = piano.image_urls || (piano.image_url ? [piano.image_url] : []);

  const handleViewDetails = () => setIsViewDialogOpen(true);

  const handleDelete = async () => {
    try {
      console.log('Attempting to delete piano with ID:', piano.id);
      const { error } = await supabase
        .from("pianos")
        .delete()
        .eq('id', piano.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Piano listing deleted successfully",
      });

      if (onDelete) onDelete();
    } catch (error: any) {
      console.error('Delete error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete piano listing: " + error.message,
      });
    }
  };

  const handleEditSuccess = () => {
    setIsEditDialogOpen(false);
    if (onUpdate) onUpdate();
    toast({
      title: "Success",
      description: "Piano listing updated successfully",
    });
  };

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
        <PianoCardImage
          images={images}
          pianoName={piano.name}
          onEdit={() => setIsEditDialogOpen(true)}
          onDelete={handleDelete}
          onImageClick={handleViewDetails}
        />
        <PianoCardContent
          piano={piano}
          onViewDetails={handleViewDetails}
        />
      </Card>

      <PianoDetailsDialog
        piano={piano}
        isOpen={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
      />

      <PianoEditDialog
        piano={piano}
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSuccess={handleEditSuccess}
      />
    </>
  );
};

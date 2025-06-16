
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Piano } from "@/types/piano";
import { PianoImageGallery } from "./details/PianoImageGallery";
import { PianoSpecifications } from "./details/PianoSpecifications";
import { PianoDimensions } from "./details/PianoDimensions";
import { FullScreenImageViewer } from "./details/FullScreenImageViewer";

interface PianoDetailsDialogProps {
  piano: Piano;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PianoDetailsDialog = ({ piano, isOpen, onOpenChange }: PianoDetailsDialogProps) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  
  // Use multiple images if available, fallback to single image_url, or empty array
  const images = piano.image_urls || (piano.image_url ? [piano.image_url] : []);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[90vw] max-w-[95vw] max-h-[95vh] sm:max-h-[90vh] w-full p-3 sm:p-6 overflow-y-auto rounded-lg sm:rounded-lg">
          <DialogHeader className="pb-3 sm:pb-4">
            <DialogTitle className="sr-only">Piano Details</DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 sm:gap-6">
            <PianoImageGallery 
              images={images}
              pianoName={piano.name}
              onImageClick={openLightbox}
            />
            
            <div className="space-y-4 min-h-0 order-2 lg:order-none">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold">
                    {piano.name}
                  </h3>
                  <p className="text-xl sm:text-2xl font-bold text-primary">
                    ${piano.price.toLocaleString()}
                  </p>
                  {piano.condition && (
                    <p className="text-gray-600 text-sm sm:text-base">Condition: {piano.condition}</p>
                  )}
                </div>
              </div>

              {piano.description && (
                <div>
                  <h4 className="font-semibold mb-1 text-sm sm:text-base">Description</h4>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{piano.description}</p>
                </div>
              )}

              <PianoSpecifications piano={piano} />
              <PianoDimensions piano={piano} />

              <div className="pt-2 border-t">
                <Button className="w-full text-sm sm:text-base" size="lg">
                  Schedule a Viewing
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <FullScreenImageViewer 
        images={images}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        currentIndex={lightboxIndex}
        onIndexChange={setLightboxIndex}
      />
    </>
  );
};

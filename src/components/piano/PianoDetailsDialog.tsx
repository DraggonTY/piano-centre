
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

  // Hide the main dialog when lightbox is open to prevent overlay interference
  const isMainDialogOpen = isOpen && !lightboxOpen;

  return (
    <>
      <Dialog open={isMainDialogOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[90vw] max-w-[95vw] max-h-[90vh] sm:max-h-[85vh] w-full p-3 sm:p-4 overflow-y-auto rounded-lg [&>button]:top-3 [&>button]:right-3 sm:[&>button]:top-4 sm:[&>button]:right-4">
          <DialogHeader className="pb-2 sm:pb-3 pt-2">
            <DialogTitle className="sr-only">Piano Details</DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-3 sm:gap-4">
            <PianoImageGallery 
              images={images}
              pianoName={piano.name}
              onImageClick={openLightbox}
            />
            
            <div className="space-y-2 sm:space-y-3 min-h-0 order-2 lg:order-none">
              <div className="flex flex-col gap-1">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold leading-tight">
                  {piano.name}
                </h3>
                <p className="text-base sm:text-lg lg:text-xl font-bold text-primary">
                  ${piano.price.toLocaleString()}
                </p>
                {piano.condition && (
                  <p className="text-gray-600 text-xs sm:text-sm">Condition: {piano.condition}</p>
                )}
              </div>

              {piano.description && (
                <div className="space-y-1">
                  <h4 className="font-semibold text-sm sm:text-base">Description</h4>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-3 sm:line-clamp-none">{piano.description}</p>
                </div>
              )}

              <PianoSpecifications piano={piano} />
              <PianoDimensions piano={piano} />

              <div className="pt-2 border-t">
                <Button className="w-full text-sm" size="sm">
                  Schedule a Viewing
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Render lightbox outside of the main dialog to prevent interference */}
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
